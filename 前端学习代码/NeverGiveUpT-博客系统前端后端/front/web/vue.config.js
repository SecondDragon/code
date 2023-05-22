const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  css: {
    extract: true,
  },
  configureWebpack: {
    plugins: [
      // ...
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "node_modules/mavon-editor/dist/highlightjs",
            to: path.resolve(__dirname, "./dist/highlightjs"), // 插件将会把文件导出于/dist/highlightjs之下
          },
          {
            from: "node_modules/mavon-editor/dist/markdown",
            to: path.resolve(__dirname, "./dist/markdown"), // 插件将会把文件导出于/dist/markdown之下
          },
          {
            from: "node_modules/mavon-editor/dist/katex", // 插件将会把文件导出
            to: path.resolve(__dirname, "./dist/katex"),
          },
          {
            from: "src/MP_verify_rSYP52iYaMJYj6av.txt", // 插件将会把文件导出
            to: path.resolve(
              __dirname,
              "./dist/MP_verify_rSYP52iYaMJYj6av.txt"
            ),
          },
        ],
      }),
    ],
  },
  devServer: {
    port: 8090,
    proxy: {
      "/api/v1/web": {
        // target: "http://nevergiveupt.top", // 代理到线上
        target: "http://127.0.0.1:7002", // 代理到后台本地启动
        ws: false,
        changeOrigin: true, //是否跨域
      },
    },
    disableHostCheck: true,
  },
};
