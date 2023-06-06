const fs = require('fs');
const path = require('path')
// fs模块中基本上 有两种api （同步、异步）


// i/o  input output  读文件 （以内存为参照物） 写操作

// 读取的时候默认不写编码是buffer类型，如果文件不存在则报错
// 写入的时候默认会将内容以utf8格式写入，如果文件不存在会创建
// 如果采用嵌套的写法，就只能读取完毕后在次写入.能不能边读取 边写入

// 大文件用此方法会导致淹没可用内存 （例如内存8个 文件3个g， 淹没了3个g）
// fs.readFile(path.resolve(__dirname,'package.json'),function(err,data){
//     if(err) return console.log(err);
//     fs.writeFile(path.resolve(__dirname,'./test.js'),data,function (err,data) {
//         console.log(data);
//     })
// });

// 此方式适合小的文件 （这种读某段内容的方法 fs.read 这种api很少用 ， pipe原理）

let buf = Buffer.alloc(3); // [0,0,0]
fs.open(path.resolve(__dirname, 'a.txt'), 'r', function(err, fd) {
    // fd file descriptor 是一个number类型
    // 读取a.txt 将读取到的内容写入到buffer的第0个位置写3个，从文件的第六个位置开始写入
    fs.read(fd, buf, 0, 3, 0, function(err, bytesRead) { // bytesRead 读取到的真实个数
        fs.open(path.resolve(__dirname, 'b.txt'), 'w', function(err, wfd) {
            // 将buffe的数据从0开始读取3个 写入到文件的第0个位置
            fs.write(wfd, buf, 0, 3, 0, function(err, written) {
                console.log(written)
                fs.close(fd,()=>{})
                fs.close(wfd,()=>{})
            })
        })
    })
})
// 1.大家尝试一下 先把功能实现了 每次读取三个, 实现读一点写一点
// 2.如何将读写操作进行分离 -》 流