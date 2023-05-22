const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const mime = require('mime');

// 缓存指代的是静态文件的缓存
// 缓存：强制缓存 （不会再次向服务器发起请求）， 对比缓存、协商缓存
const server = http.createServer((req,res)=>{
    let {pathname,query} = url.parse(req.url,true);

    // 如果返回的是一个html ，html引用了其他的资源，会在像服务器发送请求
    // 强制缓存 针对浏览器直接访问时不走强制缓存的
    // 缓存类型 disk cache  memory cache 代码无法控制
    let filePath = path.join(__dirname,'public',pathname); 

    // 服务器要和客户端说，下次别找了
    // 强制缓存，不对首次访问的路径做处理，后续的资源10s内不会在请求服务器

    // Cache-Control no-cache 每次都像服务器发送请求,会存到浏览器的缓存中
    // Cache-Control no-store 每次都像服务器要，但是不会缓存到浏览器里
    // 如果服务器每次都返回最新的那么 还是会用最新的内容

    // 强制缓存 需要根据不同的类型设置缓存时间
    res.setHeader('Cache-Control','max-age=10'); // 设置缓存的时长 相对时间
    res.setHeader('Expires',new Date(Date.now() + 10 * 1000).toGMTString()) // 绝对时间
    fs.stat(filePath,function (err,statObj) {
        if(err){
            res.statusCode = 404;
            res.end('NOT FOUND')
        }else{
            if(statObj.isFile()){
                res.setHeader('Content-Type',mime.getType(filePath)+';charset=utf-8')
                fs.createReadStream(filePath).pipe(res);
            }else{
                // 如果是目录 需要找目录下的index.html
                let htmlPath = path.join( filePath,'index.html');
                fs.access(htmlPath,function (err) {
                    if(err){
                        res.statusCode = 404;
                        res.end('NOT FOUND')
                    }else{
                        res.setHeader('Content-Type','text/html;charset=utf-8')
                        fs.createReadStream(htmlPath).pipe(res);
                    }
                })
            }
        }
    })
});

server.listen(3000,()=>{
    console.log(`server start 3000`)
})