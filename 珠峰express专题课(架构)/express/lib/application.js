const http = require('http');
const url = require('url');
const path = require('path');
const Router = require('./router');
const methods = require('methods');
function Application() { // 路由的配置 应该归属 应用来管理
 
}
Application.prototype.lazy_route = function () {
    if(!this._router){
        // 把应用和路由分离
        this._router = new Router(); // 默认一调用express()
    }
}
Application.prototype.use = function (path,handler) {
    this.lazy_route();
    this._router.use(path, handler)
}
// get post delete
methods.forEach(method=>{
    Application.prototype[method] = function (path, ...handlers) {
        this.lazy_route();
        this._router[method](path, handlers)
    }
})
Application.prototype.listen = function () {
    let server = http.createServer( (req, res) => {
        // 获取请求的方法 
        // 应用提供一个找不到的方法 如果路由内部无法匹配 调用此方法即可
        function done(){
            res.end(`Cannot ${req.method} ${req.url}`)
        }
        this.lazy_route();
        this._router.handle(req,res,done)
    });
    server.listen(...arguments)
}

module.exports = Application;