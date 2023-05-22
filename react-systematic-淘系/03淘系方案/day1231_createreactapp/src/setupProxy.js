const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api", {
            target: "https://news-at.zhihu.com/api/4",
            changeOrigin: true,
            ws: true,
            pathRewrite: { "^/api": "" }
        })
    );
    /* 
    https://news-at.zhihu.com/api/4/news/latest
    https://news-at.zhihu.com/api/4/news/before/20221221
    https://news-at.zhihu.com/api/4/news/100
    */
};