const redis = require('redis');
// oconst {promisify} = require('util');
// promisify(redis.get).bind(redis)
const client = redis.createClient(6379, '127.0.0.1', {
    password: 'jw'
});


// client.hset('obj','name','zf');
// client.hset('obj','age',18);

// client.hkeys('obj',function (err,keys) {
//     keys.forEach(key=>{
//         console.lg(key);
//         client.hget('obj',key,redis.print)
//     })
// })