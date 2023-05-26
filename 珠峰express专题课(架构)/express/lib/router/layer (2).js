// 每次存储时一个对象
const pathToRegExp = require('path-to-regexp')
function Layer(path,handler){ // reg 当前路径转化成了正则  keys 匹配出来的:后面的结果
    this.path = path;
    this.handler = handler;
    // 把路径 转化成正则

    this.reg = pathToRegExp(this.path,this.keys=[]);
    console.log(this.reg,this.keys);

}
Layer.prototype.match = function (pathname) { // /a/b
    let match = pathname.match(this.reg);
    if(match){
        // 两个数组合并成对象 [xxx,1,2]  [{name:id},{name:name}]  =>{id:1,name:2}
        this.params = this.keys.reduce((memo,current,index)=>( memo[current.name] = match[index+1],memo),{})
        return true;
    }
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
    return false;
}
Layer.prototype.handle_error = function (err,req,res,next) {
    if(this.handler.length === 4){ // 如果参数的个数是4个 说明找到了错误处理中间件
        return this.handler(err,req,res,next);
    }else{ // 没找到继续向下找
        next(err);
    }
}
Layer.prototype.handle_request = function (req,res,next) {
    this.handler(req,res,next);
}

module.exports = Layer;