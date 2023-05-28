// 1.setTimeout
// function hySetTimeout(fn, duration) {
//   fn.call("abc")
// }

// hySetTimeout(function() {
//   console.log(this) // window
// }, 3000)

setTimeout(function() {
  console.log(this) // window
}, 2000)




// 2.监听点击
const boxDiv = document.querySelector('.box')
// boxDiv.onclick = function() {
//   console.log(this); //打印的是 <div class="box"></div>
//    //就是说，this绑定的是元素对象
//    //在函数的内部应当是拿到了函数对象赋给了box.onclick,并在点击时进行了box.onclick() 的调用
//    //这就相当于一个隐式绑定
// }

// 这种添加监听的方法，应该是在调用时使用了apply,将this绑定为 boxDiv所指向的元素对象
boxDiv.addEventListener('click', function() {
  console.log(this)
})
boxDiv.addEventListener('click', function() {
  console.log(this)
})
boxDiv.addEventListener('click', function() {
  console.log(this)
})





// ********************************************************************************

// 3.数组.forEach/map/filter/find

var names = ["abc", "cba", "nba"]
names.forEach(function (item) {
  console.log(item, this);
  // 这种调用方式，其内部应该是使用的是独立调用，this 绑定了window 对象
  // 注意，严格模式下 this绑定的是undefined

});

names.forEach(function(item) {
  console.log(item, this);
  // 这种调用方式，，this 绑定了“abc”
}, "abc")

names.map(function (item) {
  console.log(item, this);
  // 这种调用方式，其内部应该是使用的是独立调用，this 绑定了window 对象
});

names.map(function(item) {
  console.log(item, this);
  // 这种调用方式，，this 绑定了“cba”
}, "cba")
