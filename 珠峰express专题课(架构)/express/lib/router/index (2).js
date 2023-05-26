const url = require('url');
const Route = require('./route');
const Layer = require('./layer');
const methods = require('methods');
function Router() { // express.Router 返回的结果会放到use上 app.use( express.Router() )
    let router = (req,res,next)=>{ // 当中间件匹配到后会执行此方法，需要去当前stack中依次取出来执行，如果处理不了调用next 会继续找一个中间件
        router.handle(req,res,next)
    }
    router.stack = [];
    router.__proto__ = proto;
    router.paramsCallback = {}; // {key:[fn,fn]}
    return router; // 通过原型链来查找
}
let proto = {};
proto.param = function (key,handler) { // 
    if (this.paramsCallback[key]){
        // {id:[fn,fn]}
        this.paramsCallback[key].push(handler)
    }else{
        // {id:[fn]}
        // {id:[fn,fn],name:[fn]}
        this.paramsCallback[key] = [handler]
    }
}
proto.route = function (path) {
    let route = new Route();
    let layer = new Layer(path,route.dispatch.bind(route)); // 给当前调用get方法 放入一层
    layer.route = route; // 每个层都有一个route属性 标识他是一个路由
    this.stack.push(layer);
    return route;
}
proto.use = function (path,handler) { // 中间件 会放到当前的路由系统中
    if(typeof path === 'function'){
        handler = path; // 给path默认值
        path = '/'
    }
    let layer = new Layer(path,handler); // 产生一层 
    layer.route = undefined; // 如果route是undefind 说明他是中间件
    this.stack.push(layer);
}


methods.forEach(method=>{
    proto[method] = function (path, handlers) { // 用户调用get方法时 传递了多个处理函数
        let route = this.route(path); // 构建一个route的
        route[method](handlers);  // 交给route 来存储用户的真正的handler
    }
})
proto.process_params = function (layer,req,res,done) {
    // 当没有匹配出来key的时候 
    if(!layer.keys || layer.keys.length === 0){
        return done();
    }
    // 获取所有的key [id,name]
    let keys = layer.keys.map(item=>item.name); //[id,name];
    // params => {id:[fn,fn],name:[fn]}
    let params = this.paramsCallback;
    let idx = 0;
    function next(){
        if (keys.length === idx) return done();
        let key = keys[idx++]; // id 
        processCallback(key, next);
    }
    next();
    function processCallback(key,out) { // id
        let fns = params[key]; // [fn,fn]
        if(!fns){
            return out();
        }
        let idx = 0;
        let value = req.params[key]; // 用的是老值 不是最新更改的值
        function next(){ //依次执行fn对应的回调
            if (fns.length === idx) return out();
            let fn = fns[idx++];
            fn(req, res, next, value,key);
        }
        next();
    }
}
proto.handle = function (req,res,out) {
    // 请求到来时 开始出路请求
    let {pathname} = url.parse(req.url); // 获取请求来的路径
    let idx = 0;
    let removed = '';
    let dispatch =(err) => { // express 需要通过next函数来迭代
        if (idx === this.stack.length) return out(); // 如果路由处理不了 交给application处理
        if(removed){ // 把刚才中间件删除的部分在追加回来
            req.url = removed + req.url;
            removed = ''; // 每次 增加空 移除掉removed
        }
        let layer = this.stack[idx++];
        if(err){ // 用户传入了错误属性
            // 如果有错误 我需要往下一直查找 错误处理中间件
            if (!layer.route){ // 2种可能  错误中间  普通中间件
                // 必须中间件处理函数的参数 必须要有4个
                layer.handle_error(err, req, res, dispatch);
            }else{
                dispatch(err); // 是路由直接忽略s
            }
        }else{
            // 路由 、 中间件 必须要求 路径匹配才ok
            if (layer.match(pathname)) { // layer有可能是中间 还有可能是路由
                // 如果是正常时不能执行错误中间件
                if (!layer.route && layer.handler.length !== 4) { // 如果是中间件 直接执行 对应的方法即可
                    // 在这里把中间件的路径 删除掉
                    // /user/add   /
                    if(layer.path !== '/'){ // 如果中间件就是/
                        removed = layer.path;
                        req.url = req.url.slice(removed.length)
                    }
                    layer.handle_request(req, res, dispatch);
                } else {
                    // 路由
                    if (layer.route.methods[req.method.toLowerCase()]) {
                        req.params = layer.params
                        // todo ... 去将订阅好的事件 去执行以下
                        this.process_params(layer,req,res,()=>{
                            layer.handle_request(req, res, dispatch);
                        })
                    } else {
                        dispatch();
                    }
                }
            } else {
                dispatch();
            }
        }
    }
    dispatch();
}
module.exports = Router; 