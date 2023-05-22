// 安装插件
// 方式一: 传入对象的情况
app.use({
  install: function(app) {
    console.log("传入对象的install被执行:", app)
  }
})


// 方式二: 传入函数的情况
app.use(function(app) {
  console.log("传入函数被执行:", app)
})
