// 流的分类 1） 可读流  2） 可写流  3) 双工流  4） 转化流

const { Writable, Duplex, Transform } = require('stream');
// class xxx extends Readalbe   read ->  _read()

class MyWrite extends Writable { // writeable write -> _write
    _write(chunk, encoding, cb) {
        console.log(chunk);
        //cb(); // clearBuffer;
    }
}
let myWs = new MyWrite();

myWs.write('hello'); // 真正的调用_write
myWs.write('hello'); // 缓存里去了
myWs.write('ok');


// 我们可以继承一个类 
class MyDuplex extends Duplex { // 可以满足 读写的功能
    _read() {

    }
    _write() {

    }
}
// 转化流 压缩 、 转码

// 把输入 转化成大写在输出
// process.stdin.on('data',function (data) {// 标准输入
//     // console.log(data)
//     process.stdout.write(data) // 标准输出
// })

// 在对输入的过程 进行一个转化操作，将输入的值，转换成大写的

class MyTransform extends Transform {
    _transform(chunk, encoding, cb) { // 参数和可写流一样
        chunk = chunk.toString().toUpperCase();
        this.push(chunk); // this.emit('data')
        cb();
    }
}
let transform = new MyTransform();

process.stdin.pipe(transform).pipe(process.stdout);


// 二叉搜索树 树的概念