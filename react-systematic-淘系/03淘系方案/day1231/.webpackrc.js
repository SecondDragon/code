/* https://github.com/sorrycc/roadhog */

export default {
    /* 基本配置 */
    hash: true,
    html: {
        template: './public/index.ejs'
    },
    /* 对CSS的处理 */
    disableCSSModules: true,
    disableCSSSourceMap: true,
    /* 对BABEL扩展应用插件 */
    extraBabelPlugins: [
        // antd按需导入
        [
            "import",
            { libraryName: "antd", libraryDirectory: "es", style: "css" }
        ]
    ],
    /* 开发环境下的跨域代理 */
    proxy: {
        "/api": {
            target: "https://news-at.zhihu.com/api/4",
            changeOrigin: true,
            pathRewrite: { "^/api": "" }
        }
    },
    /* 配置浏览器兼容列表「区分环境」 */
    env: {
        development: {
            // 开启热更新
            extraBabelPlugins: ["dva-hmr"],
            browserslist: [
                "last 1 chrome version",
                "last 1 firefox version",
                "last 1 safari version"
            ]
        },
        production: {
            browserslist: [
                ">0.2%",
                "not dead",
                "not op_mini all"
            ]
        }
    }
};