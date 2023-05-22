import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
    /* 基础配置 */
    // 关闭sourceMap文件的生成
    devtool: false,
    // 打包后的文件名带哈希值「处理缓存」
    hash: true,
    // 多大(10KB)以内的图片，自动BASE64
    inlineLimit: 10000,
    // 设置JS压缩的方式「默认是esbuild」
    jsMinifier: 'terser',
    jsMinifierOptions: {},
    // 设置umi的插件
    plugins: [],
    // 设置打包后资源导入的路径「默认是“/”」,可以设置CDN
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

    /* 有关于路由的处理 */
    history: {
        type: 'hash'
    },
    historyWithQuery: {},
    routes, //使用约定式路由「路由表模式」

    /* 跨域代理 */
    proxy: {
        '/api': {
            target: '',
            changeOrigin: true,
            pathRewrite: { '^/api': '' }
        }
    },

    /* 基于链式写法，修改webpack配置项 */
    chainWebpack(memo, { env, webpack }) {
        // memo:现有的webpack配置项
        // env:环境变量 webpack:webpack对象
    },

    /* 配合headScripts可以把项目中一些第三方模块，单独在html中进行导入「导入的可以是CDN地址」，以此减少打包后主JS的大小！！ */
    externals: {},
    headScripts: [],
    links: [],
    metas: [],
    title: "珠峰培训UMI的处理",

    /* 额外的扩展项 */
    extraBabelPlugins: [],
    extraBabelPresets: [],
    extraPostCSSPlugins: [],

    /* 浏览器兼容处理 */
    // 默认全量导入polyfill来处理ES6 API的兼容，也可以手动按需导入
    // polyfill: {},
    // 设置需要兼容的最低版本浏览器
    targets: {
        ie: 11
    }
});