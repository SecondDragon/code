var name = 'zce'

function foo () {
  name = 'zce666'  // 这里的Name 是属于全局的
  function baz () {
    var age = 38
    console.log(age)
    console.log(name)
  }
  baz()
}

foo()


var name = 'zce'

function foo () {
  var name = 'zce666'  // 这里的Name 是属于全局的
  function baz () {
    var age = 38
    console.log(age)
    console.log(name)
  }
  baz()
}

foo()