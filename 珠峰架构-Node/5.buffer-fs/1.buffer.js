// 前端是无法直接读取文件 操作文件 （node是使用在服务端的）
// 对文件和前端传递的数据进行处理
// 进制数据 所有内容都是以2进制来存储的, 数据都是以2进制形式来表现的 

// 最终数据都是以2进制来存储的 所以会出现不精准的情况 

// 二进制  十进制的区别 10进制中最大的是9  2进制中最大的时候 1
// 我们以字节为单位来存储数据  8位 -> 1个字节  1024个字节 -> 1k   1024k -> 1m

// 其他进制中如何转化成10进制  当前位的值  * 进制^当前所在位 ， 把每一位进行相加
let sum = 0;
for (let i = 0; i < 8; i++) { // 2^8 - 1
    sum += Math.pow(2, i)
}
// 每个字节最大时255， 16进制  8进制
console.log(sum);

// 将一个10进制 转化成2进制 ？ 取余数倒着读 就可以获取对应的进制

console.log(parseInt('101', 2)) // 把任意进制转化成10进制
// 0b 二进制 0x 16进制
console.log((0x64).toString(2)); // 将任何进制转化成任意进制  （字符串）

// 小数也要转化成2进制

// 10进制中的 0.5 是2进制中的多少？  10 -》 0.5   2 =》 0.1

// 10进制中的 0.5 就是 2进制中0.1   乘2取整法可以将一个小数 转化成2进制数

// 0.1 * 2 = 0.2  0
// 0.2 * 2 = 0.4  0
// 0.4 * 2 = 0.8  0
// 0.8 * 2 = 1.6  1
// 0.6 * 2 = 1.2  1
console.log(0.1 + 0.2);
// 进制转化的问题？  0.2 + 0.2  那如果出现了精度问题你要如何解决？  
// js是没有 把小数转化成2进制的方法

// 在服务端，我们需要一个东西可以来标识内存 。但是不能是字符串，因为字符串无法标识图片
// node中用Buffer来标识内存的数据 他把内容转换成了16进制来显示 （16进制比较短）


// 10进制 -> 255  0b11111111 2进制  0xff  16进制    buffer每个字节的取值范围就是 0 - 0xff

// node中buffer可以和字符串任意的转换 （可能会出现乱码）

// 编码规范 ASCII (美国人) -> GB18030/GBK -> unicode -> UTF8  编码的发展史 
// http://www.zhufengpeixun.com/grow/html/8.Encoding.html

// 单字节（因为字母，符号.. 都是一个字节）
// 中国为了能标识自己  （gb2312/GB18030/GBK） 对于文字来说是由2个字节组成的
// unicode 希望统一所有编码 -> 可变字节长度交 没有统一成功
// utf组织解决了这个问题 （utf8编码 一个汉字有3个字节组成）
// http://www.zhufengpeixun.com/grow/html/8.Encoding.html#t101.8%20Unicode

// 全部统一成utf8, node 不支持gbk 只支持utf8
// Buffer代表的是内存，内存是一段“固定空间”， 产生的内存是固定大小，不能随意添加
// 扩容的概念，需要动态创建一个新的内容，把内容迁移过去

// npm install @types/node 可以支持node提示 (仅仅是安装了ts的提示而已，为了方便)
let buffer1 = Buffer.alloc(5);
console.log(buffer1[0]); // 像数组（但是和数组有区别），数组可以扩展，buffer不能扩展，可以用索引取值,取出来的内容是10进制

// 此方法用的非常少，我们不会直接填16进制
let buffer2 = Buffer.from([0x25, 0x26, 300]); // 超过255 会取余
console.log(buffer2[0])

let buffer3 = Buffer.from('珠峰'); //6个字节
console.log(buffer3)

// 一般情况下，我们会alloc来声明一个buffer，或者把字符串转换成buffer使用
// 后台获取的数据都是buffer，包括后面的文件操作也都是buffer形式

// buffer的使用。  无论是2进制还是16进制他们表现的东西都是一样的

// base64“编码”，在后期使用的过程中用的非常多 （base64 没有加密功能）  所有人都知道这个规范
// 加密 -》 解密 
// base64 可以字符串可以放到任何路径的链接里 （可以减少请求的发送） 文件大小会变大（如果采用base64 他的缓存会依赖文件）， base64转化完毕后会比之前的文件大1/3

const r = Buffer.from('珠'); // 可以调用toString转化成指定的编码

// base64 的来源就是将每个字节多转化成 小于64的值
console.log(0xe7.toString(2));
console.log(0x8f.toString(2));
console.log(0xa0.toString(2));

// 11100111 10001111 10100000  3 x 8 =>  6 * 4
// 111001  111000 111110  100000
console.log(parseInt('111001', 2))
console.log(parseInt('111000', 2))
console.log(parseInt('111110', 2))
console.log(parseInt('100000', 2))

// 0-63 取值范围是 64
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
str += str.toLocaleLowerCase();
str += '0123456789+/';
// 57 56  62 32
console.log(str[57] + str[56] + str[62] + str[32]); // 54+g 没有加密功能



// 回到buffer toString('utf8'/'base64');

// alloc from 

// slice 
/*
let buffer4 = Buffer.from([1,2,3,4,5]); // 内部存的是引用地址
let slicBuffer = buffer4.slice(0,1);
slicBuffer[0] = 100;
console.log(buffer4)

---------------

let arr = [[1],2,3,4];
let newArr = arr.slice(0,1); // 二维数组的slice 相当于buffer，数组中存的是引用地址slice是浅拷贝
newArr[0][0] = 100;
console.log(arr);
*/
// 实现非递归版本的深拷贝。

// copy 可以将buffer的数据拷贝到另一个buffer上 （一般用不到，concat是基于copy的）
/*
let buf0 = Buffer.from('架构')
let buf1 = Buffer.from('珠');
let buf2 = Buffer.from('峰');

Buffer.prototype.copy = function(targetBuffer, targetStart, sourceStart = 0, sourceEnd = this.length) {
    for (let i = sourceStart; i < sourceEnd; i++) {
        targetBuffer[targetStart++] = this[i];
    }
}
let bigBuffer = Buffer.alloc(12); // == new Buffer(12)
buf0.copy(bigBuffer, 6, 0, 6);
buf1.copy(bigBuffer, 0, 0, 3);
buf2.copy(bigBuffer, 3); // 默认后两个参数不用传递

console.log(bigBuffer.toString())
*/

// concat
let buf0 = Buffer.from('架构')
let buf1 = Buffer.from('珠');
let buf2 = Buffer.from('峰');
Buffer.concat = function(bufferList, length = bufferList.reduce((a, b) => a + b.length, 0)) {
    let bigBuffer = Buffer.alloc(length);
    let offset = 0;
    bufferList.forEach(buf=>{
        buf.copy(bigBuffer,offset)
        offset += buf.length
    })
    return bigBuffer
}
// http 数据是分包传递的，把每断数据进行拼接
let bigBuf = Buffer.concat([buf1, buf2, buf0],100)


//  isBuffer   
console.log(Buffer.isBuffer(bigBuf));
// buffer.length 
console.log(bigBuf.byteLength,bigBuf.length,Buffer.from('珠峰').length);