// 每次存储时一个对象
function Layer(path,handler){
    this.path = path;
    this.handler = handler;
}
Layer.prototype.match = function (pathname) { // /a/b
    if (this.path === pathname){
        return true
    }
    // 如果是中间件 要特殊处理 
    if(!this.route){
        // 说明是中间件 
        if(this.path === '/'){
            return true;
        }
        return pathname.startsWith(this.path+'/')
    }
}
Layer.prototype.handle_request = function (req,res,next) {
    this.handler(req,res,next);
}

module.exports = Layer;