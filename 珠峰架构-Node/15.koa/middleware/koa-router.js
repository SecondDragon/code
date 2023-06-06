class Layer {
    constructor(method, pathname, callback) {
        this.method = method;
        this.pathname = pathname;
        this.callback = callback
    }
    match(requestPath, requestMethod) {
        return this.pathname === requestPath && requestMethod == this.method
    }
}
class Router {
    constructor() {
        this.stack = [];
    }
    get(pathname, callback) {
        // 调用get 就是来维护映射关系的 
        let layer = new Layer('GET', pathname, callback);
        this.stack.push(layer);
    }
    compose(matchLayers, ctx, next) {
        function dispatch(index) {
            if (index === matchLayers.length) return next(); // 如果走到最后就从路由中间件出去，或者一个没有匹配到也出去
            return Promise.resolve(matchLayers[index].callback(ctx, () => dispatch(index + 1)));
        }
        return dispatch(0);
    }
    routes() { // 中间件
        return async (ctx, next) => {
            // 请求到来时会调用此方法
            let requestPath = ctx.path;
            let requestMethod = ctx.method;

            let matchLayers = this.stack.filter(layer => layer.match(requestPath, requestMethod))
            this.compose(matchLayers, ctx, next);
        }
    }
}

module.exports = Router;