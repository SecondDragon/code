
const Application = require('./application');
// createApplication 就是express 对象
const Router = require('./router/index')
// 1) 实现当前的应用 和创建应用的分离
function createApplication(){ // express
    // 我需要将 get listn方法 都放到当前应用的实例上
    return new Application() // 类的好处 方便扩展 继承 可以高内聚 
}
createApplication.Router = Router;
module.exports = createApplication