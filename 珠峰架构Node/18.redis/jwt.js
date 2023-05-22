// jwt json web token


const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const jwt = require('jwt-simple')
const app = new Koa();
const router = new Router();
// cookie koa 的cookie  
// jsonwebtoken, jwt-simpile
// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMyI.Wsc0VW_YmYWwusCKpZnlWGmC_tsO1zckC0snp7O6iwc
const jw = {
    sign(str,secret){
        str = require('crypto').createHmac('sha256',secret).update(str).digest('base64');
        return this.toBase64Escape(str)
    },
    toBase64(content){ // buffer -> base64
       return  this.toBase64Escape(Buffer.from(JSON.stringify(content)).toString('base64'));
    },
    toBase64Escape(base64){
        return base64.replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'')
    },
    encode(content,secret){
        let line1 = this.toBase64( {typ:'JWT',alg:'HS256'})
        let line2 =  this.toBase64(content);
        let line3 = this.sign([line1,line2].join('.'),secret);
        return line1+'.' + line2 + '.' + line3
        //               内容base64， 过期时间
    },
    base64urlUnescape(str) {
        str += new Array(5 - str.length % 4).join('=');
        return str.replace(/\-/g, '+').replace(/_/g, '/');
    },
    // 内容 = 签名 
    decode(token,secret){
       let [line1,line2,line3] =  token.split('.');
       if(this.sign([line1,line2].join('.'),secret) === line3){
            // console.log(line2); // line2 内容就一定是可靠的  用户id -》 用户的信息 -> 数据库

            // if(line2.exp < Date.now(){

            // })else{

            // }
            const r = Buffer.from(this.base64urlUnescape(line2),'base64').toString();
            return r;
       }else{
            throw new Error('被修改过了')
       }
    }
}

app.use(bodyParser());
router.post('/login', async (ctx, next) => {
    let { username, password } = ctx.request.body;
    if (username == 123 && password == 123) {
        let token = jw.encode(username, 'zf'); // 放入用户id
        ctx.body = {
            err: 0,
            data: {
                token,
                username
            }
        }
    }
});

router.get('/validate', async (ctx) => {
    let authorization = ctx.get('authorization');
    if (authorization) {
        let [, token] = authorization.split(' ');
        try{
            let r = jw.decode(token, 'zf');
            ctx.body = {
                err: 0,
                data: {
                    username: r
                }
            }
        }catch{
            ctx.body = {
                err: 1,
                data: {
                    status:401
                }
            }
        }   
      
    }
})


app.use(router.routes());
app.listen(3000);