const path = require('path');
const {Readable} = require('stream');
class MyReadStream extends Readable {
    constructor(){
        super();
        this.i = 1; // 读取次数做限制
    }
    _read(){ // 内部会不停的调用_read
        if(this.i === 5){
            return this.push(null);
        }
        this.push(this.i++  + ''); // 调用this.emit("data");
    }
}
let myStream = new MyReadStream(); // new 类的时候，内部会调用父类read方法，父类会调用子类_read
myStream.on('data',function (data) {
    console.log(data);
})
myStream.on('end',function () {
    console.log('end');
})

// fs.createWriteStream 内部是基于 stream -> writable

// const rs = fs.createReadStream(path.resolve(__dirname,'../a.txt'),{
//     highWaterMark: 4 // 字节为单位
// });


// rs.on('data',function (chunk) {
//     console.log(chunk)
// })

// 文件的可独流 基于 stream模块的 Readable这个类  ReadStream 继承于 Readable

//ReadStream.__proto__ = Readable 继承静态属性和方法
//ReadStream.prototype.__proto__ = Readable.prototype 继承原型方法
//Readable.call(this) 继承实例属性  

// 我们fs.createReadStream()  是有open方法的，但是可读流没有这个方法
// 父类 Readble会提供一个read方法 -> 会调用子类的_read方法 (不同的子类实现的_read不同)

// extends + super


// 1) 内部会先打开文件，并且直接进行读取操作 （默认是暂停模式） 2） 监控用户是否绑定了data事件 （resume） 开始读取数据 3) fs.read方法 将数据读取到  4） 调用push方法 （父类提供的）  5） 触发data事件