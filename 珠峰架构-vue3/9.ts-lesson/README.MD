## 安装ts
- npm install typescript -g
- tsc --init 生成配置文件

- 希望可以直接运行ts （测试）
- code runner + npm install ts-node -g


> 全局编译 , code runner 用node环境来执行ts



## 构建工具来处理ts
- webpack × 、 rollup √
- 解析ts的方式 有两种 ts插件来解析 ，可以通过babel来解析
- rollup 一般情况下会采用 rollup-plugin-typescript2
- webpack ts-loader / babel-plugin-typescript