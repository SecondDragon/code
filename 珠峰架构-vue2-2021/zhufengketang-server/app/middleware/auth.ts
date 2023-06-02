const jwt = require('jsonwebtoken');
export default options => { // token 转化
    return async function (ctx, next) {
        const token = ctx.headers.authorization;
        ctx.user = {}
        if (token) {
            try{
                var decoded = jwt.verify(token, options.privateKey);
                ctx.user = decoded
            }catch(e){}
        }
        await next()
    };
};