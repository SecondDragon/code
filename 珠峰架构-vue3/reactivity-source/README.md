git clone https://github.com/vuejs/vue-next.git --depth 1
cd vue-next && yarn install

> 查看package.json 
npm run dev  开发可以方便调试 实时监控源码的变化
npm run build 把packages所有的包都进行打包 

> monorepo 一个项目下 管理多个包 element-plus

> 改写打包的入口文件 默认是vue -> reactivity


- reactive
- effect  track / trigger
- ref