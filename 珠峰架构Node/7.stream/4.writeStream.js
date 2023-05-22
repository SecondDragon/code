const fs = require('fs');
const path = require('path');
const WriteStream = require('./WriteStream')
const ws = new WriteStream(path.resolve(__dirname, '../a.txt'), {
    highWaterMark:6
});

// 10个数 希望使用3个字节内存来处理 
let i = 0; // 写入0-9个
function write() {
    let flag = true;
    while (i < 10 && flag) {
        flag = ws.write(i++ + '');
    }
}
ws.on('drain',function () { // 只有当我们写入的数据达到了预期，并且数据被清空后才会触发drain时间
    console.log('写完了')
    write();
})

write(); // 执行写入操作


// 1. new WriteStream()
// 2.内部要继承自 writable接口
// 3.调用父类的write ，父类的read 调用子类的_write