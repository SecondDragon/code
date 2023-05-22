const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const mime = require('mime');
const crpto = require('crypto');

// 只要协商缓存 有一点不一样都要重新的对比 
const server = http.createServer((req, res) => {
    let { pathname, query } = url.parse(req.url, true);
    let filePath = path.join(__dirname, 'public', pathname);
    res.setHeader('Cache-Control', 'no-cache');
    // 可用采用指纹的方式： 但是对于大文件，我们不会直接全量比对
    // 用文件的大小生成一个指纹，文件的开头等  koa 的时候 
    // 此案例我们就采取全量比对
    fs.stat(filePath, function(err, statObj) {
        if (err) {
            res.statusCode = 404;
            res.end('NOT FOUND')
        } else {
            if (statObj.isFile()) {
                let content = fs.readFileSync(filePath)
                let etag = crpto.createHash('md5').update(content).digest('base64')
                if(req.headers['if-none-match'] === etag) {
                    res.statusCode = 304;
                    res.end();
                }else{
                    res.setHeader('Etag', etag)
                    res.setHeader('Content-Type', mime.getType(filePath) + ';charset=utf-8')
                    fs.createReadStream(filePath).pipe(res);
                }
            } else {
                let htmlPath = path.join(filePath, 'index.html');
                fs.access(htmlPath, function(err) {
                    if (err) {
                        res.statusCode = 404;
                        res.end('NOT FOUND')
                    } else {
                        res.setHeader('Content-Type', 'text/html;charset=utf-8')
                        fs.createReadStream(htmlPath).pipe(res);
                    }
                })
            }
        }
    })
});

server.listen(3000, () => {
    console.log(`server start 3000`)
})