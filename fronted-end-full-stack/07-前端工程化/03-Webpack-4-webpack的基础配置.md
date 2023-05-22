# 03-Webpack-4-webpack 的基础配置

## 一 mode 模式

Mode 配置会设定 webpack 的环境：

- development：开发环境。会将 process.env.NODE_ENV 的值设定为 development，启用 NamedChunksPlugin、NameMoulesPlugin，支持代码本地调试
- production：生产环境。会将 process.env.NODE_ENV 的值设定为 production，支持代码压缩等等功能，优化上线配置。

## 二 entry、output

入口与出口可以分别配置：

```js
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    //多个 entry
    main1: path.resolve(__dirname, './src/index.js'),
    main2: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    //name 变成了上述的入口名
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:10].js',
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
    }),
  ],
}
```

注意：此时 html-webpack-plugin 会将多个入口都注入到 html 中。

output 的其他配置：

- publicPath: 会给注入到 html 中的 JS 的 src 添加该前缀

## 三 webpack-dev-server

### 3.1 -watch 参数

webpack 的打包命令如果添加了`watch`参数，则可以监听源码文件，当源码文件有改动时，则自动重新打包。

### 3.2 webpack-dev-server

如果我们要实现 watch 的效果，且能自动打开浏览器，刷新浏览器，那么需要使用 webpack-dev-server，该工具会使 contentBase 配置中的目录成为服务器静态文件目录。

第一步：安装

```txt
npm i -D webpack-dev-server
```

第二步：脚本修改

```js
# webpack-dev-server 命令直接替代了 webpack 命令
"dev": "webpack-dev-server"
```

第三步：修改 webpack 配置

```js
    devServer: {
        contentBase:  path.join(__dirname, "dist"),
        open: true,                 //启动时，会打开浏览器并渲染页面
        port: 3000,                 //默认是 3000
        hot: true,                   //开启 hotModule 功能
        hotOnly: true,               //html 生效，则浏览器不刷新
        historyApiFallback:true      //单页面应用启用路由时候需要该设置
    },
```

注意：webpack-dev-server 打包的 dist 目录内是没有文件的，文件位于内存中。

## 四 webpack 打包模式

webpack 在打包时有开发模式（development）和生产模式（prodction）两种，在 mode 中配置中。那么为了对应不同的环境就需要不同的配置。

npm 脚本配置：

```json
    "dev": "webpack-dev-server --config webpack.config.dev.js",
    "build": "webpack --config webpack.config.prod.js"
```

由于 dev 与 prod 的配置有很多相同的地方，推荐将共同部分抽离。

首先：安装 webpack 配置合并插件

```js
npm install -D webpack-merge
```

然后将通用配置移动到到 webpack 基础配置文件：webpack.config.base.js

```js
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
    }),
  ],
}
```

开发配置：webpack.config.dev.js

```js
const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')

const baseConfig = require('./webpack.config.base')

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    //name 变成了上述的入口名
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    open: true, //启动时，会打开浏览器并渲染页面
    port: 3000, //默认是 3000
    hot: true, //开启 hotModule 功能
    hotOnly: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
}

module.exports = merge(baseConfig, devConfig)
```

生产配置：webpack.config.prod.js

```js
const path = require('path')
const merge = require('webpack-merge')

const baseConfig = require('./webpack.config.base')

const prodConfig = {
  mode: 'production',
  output: {
    //name 变成了上述的入口名
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
}

module.exports = merge(baseConfig, prodConfig)
```

贴士：在开发时，使用 webpack-dev-server 往往不能查看打包后的代码了，也可以在 npm 脚本内再建一个`"dev-build": "webpack --config webpack.config.dev.js"`。

## 五 webpack 配置本地代理

使用 webpack-dev-server 也可以实现跨域问题解决，但是如果我们要自己为自己设置一定的接口，则需要手动创建一个本地服务器：

```js
// server.js
const webpakc = require('webpack')
const middle = require('webpack-dev-middleware')
const webpackCfg = require('./webpack.config.js')

const compiler = webpack(webpackCfg)

app.use(middle(compiler))

app.get('/foo', (req, res) => {
  res.json({
    data: 'bar',
  })
})

app.listen(3000)
```

当使用 `node server.js` 启动时，会同时启动 webpack。

## 六 resolve

resolve 用于配置解析模块的规则，比如配合路径别名等需求：

```js
module.exports = {
  resolve: {
    alias: {
      @: path.resolve(__dirname, 'src ') // 别名
    },
    extensions: ['.js', '.json', 'jsx'],  // 引入文件无需后缀名
    modules: ['node_modules'] // 告诉 webpack 解析模块是去哪个目录查找
  },
}
```
