const zlib = require('zlib');
const fs = require('fs');
const path = require('path')
let content = fs.readFileSync(path.resolve(__dirname,'1.txt'))

// 读一点文件 就gzip一下 在把内容写回去 
// webpack来做   服务端可以来做gzip ?   在哪做好？

// gzip 不适合重复率低的内容 ，gzip核心就是相同替换的方案

// 根据后缀做gzip处理
zlib.gzip(content,function (err,data) {
    console.log(data);
})