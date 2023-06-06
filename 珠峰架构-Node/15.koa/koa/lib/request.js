const url = require('url');
const request = {
    // req.url
    get url(){ 
        return this.req.url // = defineProperty的简写，属性访问器
    },
    get path(){ //ctx.request = this / ctx.request.path  = >  ctx.request.req = req;
        return url.parse(this.req.url).pathname;
    },
    get query(){
        return url.parse(this.req.url).query;
    }
}

module.exports = request