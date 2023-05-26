// const methods = require('methods');
// console.log(methods)

// [id,name]
// let pathToRegExp = require('path-to-regexp');
// // 它的包
// let configUrl = '/zf/:id/:name';
// let requestUrl = '/zf/1/2';
// let keys = []
// let reg = pathToRegExp(configUrl, keys);
// console.log(requestUrl.match(reg))

//  /^\/zf\/(?:([^\/]+?))\/(?:([^\/]+?))\/?$/i


// 自己写的
// let keys = []
// let configUrl = '/zf/:id/:name';  // /\/zf\/(\.+)\/(\.+)/
// // [1,2]
// // 核心思路 就是将用户的配置 转化成 正则 和当前请求的路径 匹配拿到结果
// configUrl = configUrl.replace(/:([^\/]+)/g,function () {
//     keys.push(arguments[1]);
//     return '([^\/]+)'
// }); // /zf/([^/]+)/([^/]+) [ 'id', 'name' ]
// console.log(configUrl,keys);

// let reg = new RegExp(configUrl)
// let requestUrl = '/zf/1/2';
// let [,...args] = requestUrl.match(reg);

// console.log(args)
