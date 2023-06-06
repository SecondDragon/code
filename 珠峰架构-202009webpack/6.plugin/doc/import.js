import {a1} from './export';
a1();
/**
 * tree shaking
 * 1.只能使用import export ,require不行
 * 2.配合JS代码压缩插件 uglifyJS terserPlugin
 * 3.不让babel-loader进行转换,babel转换的保留 export和import关键字,然后让webpack来进行转换
 * 写的是前端代码 es module 尽量减少文件体积
 * 写的node代码 后台代码不太关心文件大小,可以使用 common.js
 */