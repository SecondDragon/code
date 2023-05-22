// http是node内置模块 可以直接来使用

const http = require('http');
const url = require('url');
// request (获取请求的信息) -> response (给浏览器写数据使用response)
// 流：http 内部是基于tcp的(net模块，socket双向通信) http1.1 他是一个半双工的
// 内部基于socket 将其分割出了 request，response 底层实现还是要基于socket

// 底层基于发布订阅模式
// 底层用socket来通信，http会增加一些header信息，请求来了之后需要在socket中读取数据，并解析成请求头
// 学http就是学header， 还有解析请求 ，响应数据

// url 由多部分组成
// http://username:password@www.zhufeng.com:80/a?a=1#aaa
// console.log(url.parse('http://username:password@www.zhufeng.com:80/a?a=1#aaa',true))
const server = http.createServer((req,res) => {
    // 先获取请求行 请求方法 请求路径 版本号
    console.log('请求行-----start---------')
    console.log(req.method); // 请求方法是大写的
    console.log(req.url); // 请求路径是从 路径开始 到hash的前面，默认没写路径就是/，/代表的是服务端根路径
    const {pathname,query} = url.parse(req.url,true);
    console.log(pathname,query); // query就是get请求的参数
    console.log('请求行-----end---------')
    console.log('请求头-----start---------')
    console.log(req.headers); // 获取浏览器的请求头，node中所有的请求头都是小写的
    console.log('请求头-----end---------');

    // post请求和put请求有请求体  req是可读流
    // 大文件上传需要分片，或者用客户端上传
    let chunk = [];
    console.log('读取请求体-----start---------');
    req.on('data',function (data) { // 可读流读取的数据都是buffer类型
        chunk.push(data); // 因为服务端接受到的数据可能是分段传输的，我们需要自己将传输的数据拼接起来
    });
    req.on('end',function () { // 将浏览器发送的数据全部读取完毕
        console.log(Buffer.concat(chunk).toString())
        console.log('读取请求体-----end---------');
    })

    // 响应状态码 ，可以字节设定一般情况不设定
    // res.statusCode = 500;  // 更改浏览器响应的状态
    // res.statusMessage = 'my define';

    // 响应头  res就是一个可写流 
    res.setHeader('MyHeader',1);

    // 响应体 （如果是路径 那就把响应内容返回给页面，如果是ajax 则放到ajax中的向应力）
    res.write('hello'); // socket.write 
    res.write('world');
    res.end('ok'); // 写完了  end => write + close
});
// server.on('request',function (req,res) {
//     console.log('client come on')
// })
server.listen(4000,function () { // 监听成功后的回调
    console.log('server start 4000')
});
// 每次更新代码需要重新启动服务，才能运行最新代码
// nodemon 开发时可以使用nodemon 监控文件变化 重新启动
// npm install nodemon -g