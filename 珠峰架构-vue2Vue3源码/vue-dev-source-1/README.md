- 默认下载好后 先`npm install ` 安装依赖
- 代码的目录结构
- bechmarks 目录是做性能测试的
- dist 最终打包出的结果都放到了dist下
- examples 官方的例子
- flow 类型检测 （没人用了  和 ts功能类似）
- packages  一些写好的包  (vue源码中包含了weex)
- scripts 所有打包的脚本都放在这里
- src 源代码目录 
  - compiler专门用作模板编译的
  - core vue2的核心代码
  - platform
  - server 服务端渲染相关的
  - sfc 解析单文件组件的
  - shared 就是模块之间的共享属性和方法



- 通过package.json 找到打包入口
- scripts/config.js  (web-full-dev, web-runtime-cjs-dev,web-runtime-esm....)
- 打包的入口
  - src/platforms/web/entry-runtime.js
  - src/platforms/web/entry-runtime-with-compiler.js  （两个入口的区别是带有compiler的会重写$mount,将template变成render函数）
  - runtime/index.js  （所谓的运行时 会提供一些dom操作的api 属性操作、元素操作， 提供一些组件和指令）
  - core/index  initGlobalAPI 初始化全局api
  - /instance/index  Vue的构造函数


> 指定sourcemap参数 可以开启代码调试