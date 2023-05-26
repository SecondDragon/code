const url = require('url');
const Route = require('./route');
const Layer = require('./layer');
const methods = require('methods');
function Router(){
    this.stack = [];
}
Router.prototype.route = function (path) {
    let route = new Route();
    let layer = new Layer(path,route.dispatch.bind(route)); // 给当前调用get方法 放入一层
    layer.route = route; // 每个层都有一个route属性 标识他是一个路由
    this.stack.push(layer);
    return route;
}
Router.prototype.use = function (path,handler) { // 中间件 会放到当前的路由系统中
    if(typeof path === 'function'){
        handler = path; // 给path默认值
        path = '/'
    }
    let layer = new Layer(path,handler); // 产生一层 
    layer.route = undefined; // 如果route是undefind 说明他是中间件
    this.stack.push(layer);
}


methods.forEach(method=>{
    Router.prototype[method] = function (path, handlers) { // 用户调用get方法时 传递了多个处理函数
        let route = this.route(path); // 构建一个route的
        route[method](handlers);  // 交给route 来存储用户的真正的handler
    }
})

Router.prototype.handle = function (req,res,out) {
    // 请求到来时 开始出路请求
    let {pathname} = url.parse(req.url); // 获取请求来的路径
    let idx = 0;
    let dispatch =() => { // express 需要通过next函数来迭代
        if (idx === this.stack.length) return out(); // 如果路由处理不了 交给application处理
        let layer = this.stack[idx++];

        // 路由 、 中间件 必须要求 路径匹配才ok
        if (layer.match(pathname)) { // layer有可能是中间 还有可能是路由
            if(!layer.route){ // 如果是中间件 直接执行 对应的方法即可
                layer.handle_request(req, res, dispatch);
            }else{
                if (layer.route.methods[req.method.toLowerCase()]){
                    layer.handle_request(req, res, dispatch);
                }else{
                    dispatch();
                }
            }
        }else{
            dispatch();
        }
    }
    dispatch();
}
module.exports = Router; 