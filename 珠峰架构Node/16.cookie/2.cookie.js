const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
const querystring = require('querystring');
const crypto = require('crypto');
app.keys = ['zf']
// base64Url 需要特殊处理 + = /

// bcc-fL_ffXD73R6yvCc6JwM4nXM
// bcc-fL_ffXD73R6yvCc6JwM4nXM
const sign = (value) => {
    return crypto.createHmac('sha1', app.keys.join('')).update(value).digest('base64').replace(/\+/g,'-').replace(/\=/g,'').replace(/\//g,'_');
}
app.use(async (ctx, next) => {
    let cookieArr = [];
    ctx.req.getCookie = function(key, options = {}) {
        let cookies = ctx.req.headers['cookie']; // name=zf; age=11   -> name=zf&age=11
        let cookieObj = querystring.parse(cookies, '; ');

        if (options.signed) {
            // 如果这次传递过来的 签名，和 我最新算出出来的一样 说明用户没有更改
            console.log(cookieObj[key + '.sig'],sign(`${key}=${cookieObj[key]}`))
            if (cookieObj[key + '.sig'] === sign(`${key}=${cookieObj[key]}`)) {
                return cookieObj[key]
            } else {
                return '';
            }
        }
        return cookieObj[key] || ''
    }
    ctx.res.setCookie = function(key, value, options = {}) {
        let args = [];
        let keyValue = `${key}=${value}`
        if (options.domain) {
            args.push(`domain=${options.domain}`)
        }
        if (options.httpOnly) {
            args.push(`httpOnly=${options.httpOnly}`)
        }
        if (options.maxAge) {
            args.push(`max-age=${options.maxAge}`)
        }
        if (options.signed) {
            cookieArr.push(`${key}.sig=${sign(keyValue)}`)
        }
        // ....
        cookieArr.push(`${keyValue}; ${args.join('; ')}`);
        ctx.res.setHeader('Set-Cookie', cookieArr)
    }
    await next(); // 继续往下走
})

// 我们可以给cookie签名， 根据cookie的内容产生一个标识， 我期望给内容进行签名 (原来内容还是正常的)
router.get('/visit', async (ctx, next) => {
    let count = ctx.cookies.get('visit',{signed:true}) || 0;
    let visitCount = Number(count) + 1;
    ctx.cookies.set('visit',visitCount,{signed:true});
    ctx.body = `you visit:` + visitCount


    // let count = ctx.req.getCookie('visit',{signed:true}) || 0;
    // let visitCount = Number(count) + 1;
    // ctx.res.setCookie('visit', visitCount, { signed: true });
    // ctx.body = `you visit:` + visitCount
})
app.use(router.routes())
app.listen(3000);