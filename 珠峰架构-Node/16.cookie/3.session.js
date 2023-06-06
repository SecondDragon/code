const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
const querystring = require('querystring');
const crypto = require('crypto');
app.keys = ['zf']
// base64Url 需要特殊处理 + = /


// const sign = (value) => {
//     return crypto.createHmac('sha1', app.keys.join('')).update(value).digest('base64').replace(/\+/g,'-').replace(/\=/g,'').replace(/\//g,'_');
// }
// app.use(async (ctx, next) => {
//     let cookieArr = [];
//     ctx.req.getCookie = function(key, options = {}) {
//         let cookies = ctx.req.headers['cookie']; // name=zf; age=11   -> name=zf&age=11
//         let cookieObj = querystring.parse(cookies, '; ');

//         if (options.signed) {
//             // 如果这次传递过来的 签名，和 我最新算出出来的一样 说明用户没有更改
//             console.log(cookieObj[key + '.sig'],sign(`${key}=${cookieObj[key]}`))
//             if (cookieObj[key + '.sig'] === sign(`${key}=${cookieObj[key]}`)) {
//                 return cookieObj[key]
//             } else {
//                 return '';
//             }
//         }
//         return cookieObj[key] || ''
//     }
//     ctx.res.setCookie = function(key, value, options = {}) {
//         let args = [];
//         let keyValue = `${key}=${value}`
//         if (options.domain) {
//             args.push(`domain=${options.domain}`)
//         }
//         if (options.httpOnly) {
//             args.push(`httpOnly=${options.httpOnly}`)
//         }
//         if (options.maxAge) {
//             args.push(`max-age=${options.maxAge}`)
//         }
//         if (options.signed) {
//             cookieArr.push(`${key}.sig=${sign(keyValue)}`)
//         }
//         // ....
//         cookieArr.push(`${keyValue}; ${args.join('; ')}`);
//         ctx.res.setHeader('Set-Cookie', cookieArr)
//     }
//     await next(); // 继续往下走
// })

const session = {}; // 用来存储用户和信息的映射关系,浏览器拿不到
const cardName = 'connect.sid'; // 卡的名字
const uuid = require('uuid')
router.get('/wash', async (ctx, next) => {
    // 洗澡的例子 
    // 第一次来洗澡 需要办一张卡 冲上钱，把卡号告诉你
    // 下次你自动带上卡 就ok
    let id = ctx.cookies.get(cardName,{signed:true});
    if (id && session[id]) {
        session[id].mny -= 20;
        ctx.body = `mny ` + session[id].mny;

    } else {
        let cardId = uuid.v4();
        session[cardId] = { mny: 500 };
        ctx.cookies.set(cardName, cardId, { httpOnly: true, signed: true });
        ctx.body = `mny 500`;
    }
})
app.use(router.routes())
app.listen(3000);