// 每个层 都有一个route属性
const Layer = require('./layer');
const methods = require('methods');
function Route(){
    this.stack = [];
    // 用于 匹配路径的时候 加速匹配，如果没有此方法的处理 直接跳过即可
    this.methods = {}; // 他表示当前route中有哪些方法  {get:true,post:true}
}
Route.prototype.dispatch = function (req,res,out) {
    let idx = 0;
    let method = req.method.toLowerCase(); // 获取请求的方法
    let dispatch = (err)=>{
        if(err) return out(err);
        if (idx === this.stack.length) return out();
        let layer = this.stack[idx++];
        if (layer.method === method){ // 获取内部的第一层 看下是否方法匹配
            layer.handle_request(req, res, dispatch)
        }else{
            dispatch();
        }
    }
    dispatch();
}
methods.forEach(method => {
    Route.prototype[method] = function (handlers) {
        handlers.forEach(handler => {
            let layer = new Layer('/', handler);
            layer.method = method; // 用户调用什么方法 存入method就是什么
            this.methods[method] = true; // 如果用户绑定方法 我就记录一下
            this.stack.push(layer);
        });
    }
});
module.exports = Route;