// 在大多数情况下, this都是出现在函数中
// 在全局作用域下
// 浏览器: window(globalObject)


//在 Node环境: {}，绑定的是一个空对象
// 因为，当js文件在node 环境执行的时候，他会把这个js文件当作一个模块（moudle）
// 当成模块就会去加载模块，编译，并把js文件中的所有代码放进一个函数里--》执行这个函数.apply({})
// 所以，this在node的全局环境上绑定的是空对象


console.log(this)
// console.log(window)
