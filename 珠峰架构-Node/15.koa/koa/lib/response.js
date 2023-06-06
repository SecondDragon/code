const response = {
    _body:undefined, // ctx.body 仅仅是做一个保存变量
    get body(){ // ctx.response.body => this = ctx.response  this.res
        return this._body;
    },
    set body(value){
        this.res.statusCode = 200; // 如果用户调用了 ctx.body = 'xxx'此时为成功状态码
        this._body = value;
    }
}
module.exports = response