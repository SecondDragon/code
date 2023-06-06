// fs.readFile (需要将文件读取到磁盘中，占用内存) -> fs.writeFile

// fs.read()  -> fs.write();

const fs = require('fs');

function copy(source, target, cb) { // 使用3个字节来实现一个拷贝功能
    const BUFFER_SIZE = 3;
    const buffer = Buffer.alloc(BUFFER_SIZE); 
    let r_offset = 0;
    let w_offset = 0;
    //  读取一部分数据 就 写入一部分数据
    // w 写入操作 r  读取操作 a 追加操作 r+ 以读取为准可以写入操作  w+ 以写入为准可以执行读取操作
    // 权限  3组 rwx组合  421 = 777(八进制 )  （当前用户的权限 用户所在的组的权限 其他人权限  ）
    // 0o666 = 438
    // exe 文件 bat 文件能执行的文件  
    // 读取的文件必须要存在，否则会报异常，读取出来的结果都是buffer类型
    // 写入文件的时候文件不存在会创建，如果文件有内容会被清空
    fs.open(source, 'r', function(err, rfd) {
        fs.open(target, 'w', function(err, wfd) {
            // 回调的方式实现功能 需要用递归
            // 同步代码 可以采用while循环
            function next(){
                fs.read(rfd, buffer, 0, BUFFER_SIZE, r_offset, function(err, bytesRead) { // bytesRead真正读取到的个数
                    if (err) return cb(err)
                    if (bytesRead) {
                        fs.write(wfd, buffer, 0, bytesRead, w_offset, function(err, written) {
                            r_offset += bytesRead;
                            w_offset += written;
                            next();
                        })
                    }else{
                        fs.close(rfd,()=>{});
                        fs.close(wfd,()=>{})
                        cb();
                    }
                })
            }
            next();
        })
    })
}
// 发布订阅可以实现解耦

copy('./a.txt', './b.txt', function(err) {
    if (err) return console.log(err);
    console.log('copy success')
});