const fs = require('fs');
const ReadStream = require('./ReadStream');
const WriteStream = require('./WriteStream')
const rs = fs.createReadStream('./a.txt',{highWaterMark:4});
const ws = new WriteStream('./b.txt',{highWaterMark:1});
// 对 on('data') write() end() close 的封装
rs.pipe(ws); // 这个方法是同步还是异步？ 异步， 缺陷无法看到具体的过程


// pipe的目的是可以 读取一点写入一点 监听可读流的触发事件，将获取到的数据写入到可写流中，如果返回false，则暂停读取，读取完毕后触发drain事件，在继续读取，直到最终完毕，我们无法去对读取的数据进行操作；如果需要操作读取到的数据 需要使用on('data')


