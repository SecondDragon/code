const http = require('http');
const url = require('url');
const path = require('path');
const util = require('./util');
const fs = require('fs').promises
const chalk = require('chalk'); // 第三方模块 颜色模块;
const mime = require('mime');
const crypto = require('crypto');
const { createReadStream, readFileSync } = require('fs');
const ejs = require('ejs');
const zlib = require('zlib');
const template = readFileSync(path.resolve(__dirname, 'template.html'), 'utf8');
class Server {
    constructor(serverOptions) {
        this.port = serverOptions.port;
        this.directory = serverOptions.directory;
        this.cache = serverOptions.cache;
        this.gzip = serverOptions.gzip
        this.handleRequest = this.handleRequest.bind(this);
        this.template = template;
    }
    async handleRequest(req, res) {
        // 1.获取请求路径 以当前目录为基准查找文件，如果文件存在不是文件夹则直接返回
        let { pathname } = url.parse(req.url); // 获取解析的路径
        pathname = decodeURIComponent(pathname)
        let requestFile = path.join(this.directory, pathname);
        try {
            let statObj = await fs.stat(requestFile);
            if (statObj.isDirectory()) {
                const dirs = await fs.readdir(requestFile);
                // 根据数据和模板 渲染内容
                let fileContent = await ejs.render(this.template, {
                    dirs: dirs.map((dir) => ({
                        name: dir,
                        url: path.join(pathname, dir)
                    }))
                });
                res.setHeader('Content-Type', 'text/html;charset=utf-8');
                res.end(fileContent)
            } else {
                this.sendFile(req, res, requestFile, statObj)
            }
        } catch (e) {
            console.log(e)
            this.sendError(req, res, e);
        }
    }
    cacheFile(req, res, requestFile, statObj) {
        // 先设置强制缓存 ，在执行强制缓存的时候 默认是不会执行对比的缓存的
        res.setHeader('Cache-Control', 'max-age=10');
        res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toGMTString());

        const lastMidfied = statObj.ctime.toGMTString();
        const etag = crypto.createHash('md5').update(readFileSync(requestFile)).digest('base64');

        res.setHeader('Last-Modified', lastMidfied);
        res.setHeader('Etag', etag);

        let ifModifiedSince = req.headers['if-modified-since'];
        let ifNoneMatch = req.headers['if-none-match'];
        // 如果文件 修改时间都不一样了，那就直接走新的就好了
        if (lastMidfied !== ifModifiedSince) { // 有可能时间一样但是 内容不一样
            return false;
        }
        if (ifNoneMatch !== etag) { // 一般情况 指纹的生成不会全量根据文件生成
            return false;
        }
        return true;

    }
    gzipFile(req, res, requestFile, statObj) { // 浏览器会给我发一个 accpet-encoding的字段 我要看一下浏览器支持什么压缩
        let encodings = req.headers['accept-encoding'];
        if (encodings) { // 浏览器支持压缩
            if (encodings.includes('gzip')) {
                res.setHeader('Content-Encoding','gzip'); // 浏览器要知道服务器的压缩类型
                return zlib.createGzip();
            } else if (encodings.includes('deflate')) {
                res.setHeader('Content-Encoding','deflate');
                return zlib.createDeflate();
            }
        }
        return false; // 浏览器不支持压缩
    }
    sendFile(req, res, requestFile, statObj) {

        // 判断有没有缓存 如果有缓存，就使用对比缓存处理

        if (this.cacheFile(req, res, requestFile, statObj)) {
            res.statusCode = 304;
            return res.end();
        }
        res.setHeader('Content-Type', mime.getType(requestFile) + ';charset=utf-8');
        let createGzip;
        if (createGzip = this.gzipFile(req, res, requestFile, statObj)) { // 看一下支不支持压缩 如果支持 就返回一个压缩流
            return createReadStream(requestFile).pipe(createGzip).pipe(res); 
        }

        // 我们返回文件 需要给浏览器提供内容类型 和 内容的编码格式
        
        // 需要将文件读取出来并且返回

        // 如果你不结束，浏览器相当于没有接受完毕，
        createReadStream(requestFile).pipe(res); // 流. ws.write() ws.write() ws.end()
    }
    sendError(req, res, e) {
        res.statusCode = 404;
        res.end(`Not Found`)
    }
    start() {
        // 启动服务监听错误信息，如果端口占用 累加1
        const server = http.createServer(this.handleRequest);
        server.listen(this.port, () => { // 订阅方法 监听成功后会触发
            console.log(chalk.yellow('Starting up http-server, serving ./'))
            console.log(chalk.yellow('Available on:'));
            console.log(`http://` + util.getIp().address + `:${chalk.green(this.port)}`);
            console.log(`http://127.0.0.1:${chalk.green(this.port)}`);
        });
        server.on('error', (err) => {
            if (err.errno === 'EADDRINUSE') {
                server.listen(++this.port)
            }
        })
    }
}


module.exports = Server


// 范围请求
// 文件格式处理 图片 字符串 json...
// 跨域的header
// 多语言实现，防盗链
// 反向代理
// 重定向 
// cookie session (header) 

// header ~~~~