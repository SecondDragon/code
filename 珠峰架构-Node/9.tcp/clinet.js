const net = require('net'); // tcp这一层
const socket = new net.Socket(); // 套接字
socket.connect(8080, 'localhost'); // 表示连接服务本地8080端口
socket.on('connect', function(data) {// 和服务器建立连接后
    socket.write('connect server'); // 我就和服务器说句话 我链接服务了
});
socket.on('data', function(data) { // 监听数据，读取服务器传递来的数据
    console.log(data.toString())
    socket.destroy()
})
socket.on('error', function(error) {
    console.log(error);
});