// 内部会将module.exports 直接导出

/** 
console.log(module.exports === exports, this === module.exports); // this指代的是当前模块的导出对象
module.exports = {c:'hello'}; // 更改module.exports 优先级是最高的，因为最终会将module.exports 直接导出
exports.a = 'hello';
this.b = 'world';
*/
/**
 * function(){
 *  let exports = module.exports = {}
 *  module.exports = {c:'hello'}
 *  exports.a = 'hello';
 *  exports.b = 'world';
 *  return module.exports
 * }
 */

// exports 就是module.exports 一个别名起到了简化的作用
// 如果有多个方法 需要一个个导出可以采用exports
exports.a = 1;
module.exports.b = 2;
global.a = 100; // 这种方式不建议使用，非常重要的东西，你还懒得导入 可以使用在global上赋值