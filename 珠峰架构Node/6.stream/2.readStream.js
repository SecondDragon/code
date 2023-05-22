// 可读流， 不是一下子把文件都读取完毕，而是可以控制读取的个数和读取的速率
// 流他的概念和fs没关系 
const fs = require('fs'); // fs基于stream模块底层扩展了一个文件读写方法
const ReadStream = require('./ReadStream')
// fs.open fs.read fs.close
let rs = new ReadStream('./a.txt',{ // 创建可读流一般情况下不用自己传递参数
    flags:'r',
    encoding:null, // 编码就是buffer
    autoClose:true, // 相当于需要调用close方法
    // emitClose:true, // 触发一个close时间
    // start:1,
    //end:4,// end 是包后的
    highWaterMark: 3// 每次读取的数据个数 默认是64 * 1024 字节
});
// 他会监听用户 ，绑定了data事件，就会触发对应的回调，不停的触发
// 非流动模式 -》 流动模式
rs.on('open',function (fd) { // this.emit('newListener')
   console.log('open',fd)
})
rs.on('data',function (chunk) {
    console.log(chunk.toString());
    rs.pause(); // 不在触发data事件
});
// 30 -> 48 -> 1个字节  -》 ascii -> 0
rs.on('end',function () { // 当文件读取完毕后会触发end事件
    console.log('end'); 
})
rs.on('close',function () {
    console.log('close')
});
rs.on('error',function (err) {
    console.log(err,'err')
})
setInterval(() => {
    rs.resume(); // 再次触发data事件
}, 1000);

// open 和 close 是文件流独有的
// 我们的可读流 都具备 （on('data'),on('end'),on('error'),resume pause)）
