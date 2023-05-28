function hyCompose(...fns) {
  var length = fns.length
  for (var i = 0; i < length; i++) {
    if (typeof fns[i] !== 'function') {
      throw new TypeError("Expected arguments are functions type")
    }
  }
  //闭包，保存了调用hyCompose时的 fns，以及fns.length
  function compose(...args) { 
    debugger
    var index = 0
    //此处的result 就是说如果 hyCompose传入了参数，那么就立即执行第一个函数，得到结果 result
    //卧槽，这步用三目有个屌用
    // apply
    var result = length ? fns[index].apply(this, args): args
    while(++index < length) {
      // ++index先改变了index的值，再比较，index是数组的下标,length是数组的长度，所以使用<
      result = fns[index].call(this, result)
    }
    return result
  }
  return compose
}
// 通用的组合函数的要求，
// 1：必须保存传进来的函数，并依次调用
// 2:必须
function double(m) {
  return m * 2
}

function square(n) {
  return n ** 2
}
function square2(n) {
  return n ** 2
}
var newFn = hyCompose(double, square,square2)
var newFn2 = hyCompose( square,square2,double)

console.log(newFn(10))
console.log(newFn(10))
console.log(newFn2(10))

