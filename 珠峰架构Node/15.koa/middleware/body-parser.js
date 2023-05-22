function bodyParser(){
    return async (ctx,next)=>{
        // 自己定义一个请求体
        ctx.request.body = await new Promise((resolve,reject)=>{
            let arr = [];
            ctx.req.on('data', function(chunk) {
                arr.push(chunk);
            });
            ctx.req.on('end', function() { // get 请求没有请求体 会直接触发end事件
                resolve(Buffer.concat(arr));
            });
        })
        await next();
    }
}
module.exports = bodyParser