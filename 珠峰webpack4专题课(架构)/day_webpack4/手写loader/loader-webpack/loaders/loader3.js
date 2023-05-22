function loader(source) { // loader的参数 就是源代码
  console.log('loader3~~~')
  return 'hello'
}
loader.pitch = function () {
  console.log('loader3-pitch')
}
module.exports = loader