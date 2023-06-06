let fileName = './title.js';
//commons属于运行时加载,里面加载的模 块名可是变量
//无法实现静态分析
let content = require(this.xxx);
console.log(content);

//es module
//可以实现静态分析
//只能作业顶层语句出现
//导入的模块必须是常量
//import只能出现在顶层