const webpack = require("webpack");
const webpackOptions = require("./webpack.config");
debugger
const compiler = webpack(webpackOptions);
compiler.run((err, stats) => {
  console.log(err);
  console.log(
    stats.toJson({
      entries: true,//entrypoints入口
      chunks: false,//代码块
      modules: false,//打包的模块的数组
      assets: false,//本次产出的文件
    })
  );
});