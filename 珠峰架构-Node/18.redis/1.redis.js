const redis = require('redis');
// const {promisify} = require('util');
// promisify(redis.get).bind(redis)
const client = redis.createClient(6379, '127.0.0.1', {
    password: 'jw'
});

client.on('error', function(err) {
    console.log(err)
});
client.zrange('c',0,-1,function (err,data){
    console.log(data)
})
// 用户去处理基本的增删改查的功能
class RedisService { // 一般情况下 用redis ，我们存储完后 就不会关心他的返回值了
    setValue(key, value, time) { // expire
        if (typeof time !== 'undefined') {
            client.setex(key, time, value);
        }else{
            client.set(key,value);
        }
    }
    getValue(key){
       return new Promise((resolve,reject)=>{
           client.get(key,function (err,data) {
               if(err) return reject(err)
               resolve(data);
           })
       }) 
    }
    remove(key){
        return new Promise((resolve,reject)=>{
            client.del(key,function (err,data) {
                if(err) return reject(err)
                resolve(data);
            })
        }) 
    }
    getExp(key){
        return new Promise((resolve,reject)=>{
            client.ttl(key,function (err,data) {
                if(err) return reject(err)
                resolve(data);
            })
        }) 
    }
    // 发送验证码后，用户刷新页面，还能记住 多久能发短信
}
let service = new RedisService();
// service.setValue('zs','lisi',10)
service.getExp('zs').then(data=>{
    console.log(data)
});

// 字符串的基本操作