const redis = require('redis');
const client1 = redis.createClient(6379, '127.0.0.1', {
    password: 'jw'
});
// const client2 = redis.createClient(6379, '127.0.0.1', {
//     password: 'jw'
// });
// client1.subscribe('A');
// client1.subscribe('B');
// client1.on('message',function (name,message) {
//     console.log('client1',name,message)
// })

// setTimeout(() => {
//     client2.publish('A','hello world');
//     client2.publish('B','hello ');
// }, 1000);

// redis 其实就是一个数据结构 支持发布订阅

// 批量操作  如果中间某个失败了， 还会继续
client1.multi().set('a',1,redis.print).set('b',1,redis.print).exec(redis.print)
