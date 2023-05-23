var http = require("http");                       // 用于web服务器
var path = require('path');                       // 用于路径操作
var fs = require('fs');                           // 用于文件操作
var static = require('node-static');              // 用于提供静态资源

var staticServer = new static.Server('./public'); // 将public目录作为静态资源目录

function handleStaticRequest(req, res) {          // 处理静态资源请求
  req.addListener('end', function () {            // 监听HTTP请求结束事件
      staticServer.serve(req, res);               // 提供静态资源服务
  }).resume();
}

var app = http.createServer(function(req, res) {  // 创建WEB服务器
  handleStaticRequest(req, res);                  // 处理静态资源请求
});
app.listen(8080, function(){                      // 监听8080端口
	console.log("listen at port http://localhost:8080");
});