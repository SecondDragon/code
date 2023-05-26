// 提供了一些扩展属性和方法 
const express = require('./express');
const app = express();
app.use(function (req, res, next) { // 优先级内部已经订好了
    let url = require('url');
    let path = require('path');
    let fs = require('fs');
    let mime = require('mime');
    let { query, path: p } = url.parse(req.url, true);
    req.query = query;
    req.path = p;
    res.send = function (value) {
        if (Buffer.isBuffer(value) || typeof value === 'string') {
            res.end(value);
        } else if (typeof value == 'object') {
            res.end(JSON.stringify(value));
        }
    }
    res.sendFile = function (filename, { root } = {}) {
        let filePath = ''
        if (typeof root === 'undefined') {
            filePath = filename
        } else {
            filePath = path.resolve(root, filename);
        }
        res.setHeader('Content-Type', mime.lookup(filePath) + ';charset=utf-8')
        fs.createReadStream(filePath).pipe(res);
    }
    next();
})
express.static = function (dirname) {
    return (req, res, next) => {
        let path = require('path');
        let fs = require('fs');
        let absPath = path.join(dirname, req.path);
        console.log(absPath)
        fs.stat(absPath, function (err, statObj) {
            if (err) {
                return next();
            }
            if (statObj.isFile()) {
                res.sendFile(absPath);
            }else{
                // 找index.html ...
            }
        })
    }
}



app.use(express.static(__dirname)); // 默认用当前目录作为静态服务中间件

// koa-static
// 主要内部 维护了一些新的req和res的方法  返回一个文件
app.get('/', function (req, res, next) {
    console.log(req.path);
    console.log(req.query);
    // res.send({name:'zf'}); // ctx.body
    res.sendFile('test.js', { root: __dirname })
});


app.listen(3000);