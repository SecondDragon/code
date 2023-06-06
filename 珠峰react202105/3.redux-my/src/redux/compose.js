

function compose(...funcs) {
    return funcs.reduce((a,b)=>(...args)=>a(b(...args)));
}



// 
export default compose;


// function f(x) {
//   return x + 1;
// }

// function g(x) {
//   return x * 2;
// }

// function h(x) {
//   return x - 3;
// }

// const composed = compose(f, g, h);
// console.log(composed(2)); 



// 第一次 返回函数 (...args)=>func1(func2(...args))

// 第二次 返回函数 

// 函数执行按照传入的顺序执行


// function hyCompose(...fns) {
//     var length = fns.length
//     for (var i = 0; i < length; i++) {
//       if (typeof fns[i] !== 'function') {
//         throw new TypeError("Expected arguments are functions type")
//       }
//     }
//     //闭包，保存了调用hyCompose时的 fns，以及fns.length
//     function compose(...args) { 
//       debugger
//       var index = 0
//       //此处的result 就是说如果 hyCompose传入了参数，那么就立即执行第一个函数，得到结果 result
//       //卧槽，这步用三目有个屌用
//       // apply
//       var result = length ? fns[index].apply(this, args): args
//       while(++index < length) {
//         // ++index先改变了index的值，再比较，index是数组的下标,length是数组的长度，所以使用<
//         result = fns[index].call(this, result)
//       }
//       return result
//     }
//     return compose
//   }

// function double(num) {
//     return num * 2
//   }
  
//   function square(num) {
//     return num ** 2
//   }
  
//   var count = 10
//   var result = square(double(count))
//   console.log(result)
  
//   // 实现最简单的组合函数
//   function composeFn(m, n) {
//     return function(count) {
//       return n(m(count))
//     }
//   }
  
//   var newFn = composeFn(double, square)
//   console.log(newFn(10))



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
  var newFn = compose(double, square,square2)
  var newFn2 = compose( square,square2,double)
  
  console.log(newFn(10))//160000 10*2=20 20**2=400 400**2=160000
  console.log(newFn(10))
  console.log(newFn2(10))//20000 10**2=100 100**2 =10000 10000 * 2 =20000