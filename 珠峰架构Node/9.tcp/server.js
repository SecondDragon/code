const net = require('net');

// socket就是一个双工流  http 源码就是用net模块来实现的 就是基于tcp的
const server = net.createServer(function(socket){
    socket.on('data',function (data) { // 监听客户端发来的消息
        console.log(data.toString());
        socket.write('server:hello'); // 写入 server:hello
    });
    socket.on('end',function () {
        console.log('客户端关闭')
    })
})
server.on('error',function(err){
    console.log(err);
})
server.listen(8080); // 服务端监听8080端口