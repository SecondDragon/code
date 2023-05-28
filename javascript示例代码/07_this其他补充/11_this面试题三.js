var name = 'window'

function Person (name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
  },
  this.foo2 = () => console.log(this.name),
  this.foo3 = function () {
    return function () {
      console.log(this.name)
    }
  },
  this.foo4 = function () {
    return () => {
      console.log(this.name)
    }
  }
}

var person1 = new Person('person1')
var person2 = new Person('person2')


person1.foo1() // person1
person1.foo1.call(person2) //person2

person1.foo2() // window  window不对，因为Person是个函数，它是有作用域的，他不是一个对象 
person1.foo2.call(person2) //window window不对，因为Person是个函数，它是有作用域的，他不是一个对象 person1

person1.foo3()() //window
person1.foo3.call(person2)() //window
person1.foo3().call(person2) //person2

person1.foo4()() // person1
person1.foo4.call(person2)() //person2
person1.foo4().call(person2) //person1





































person1.foo1() // person1
person1.foo1.call(person2) // person2(显示高于隐式绑定)

person1.foo2() // person1 (上层作用域中的this是person1)
person1.foo2.call(person2) // person1 (上层作用域中的this是person1)

person1.foo3()() // window(独立函数调用)   person1.foo3()实际上是把堆内存中的 foo3內部声明的函数的函数对象的地址拿了出来，随后进行了独立调用
person1.foo3.call(person2)() // window    person1.foo3.call(person2) 也是把堆内存中的 foo3 內部声明的函数的函数 对象的地址拿了出来 之后进行了独立调用  父级函数的this改了和我没有关系
person1.foo3().call(person2) // person2   person1.foo3().call(person2) 是把堆内存中的 foo3 內部声明的函数的函数 对象的地址拿了出来,在用这个内部声明的函数 进行了绑定，所以打印person2

person1.foo4()() // person1
person1.foo4.call(person2)() // person2   父级函数的this改了，内部的箭头函数的上级作用域就改了（指向父级） 所以 this指向也就是父级的this
person1.foo4().call(person2) // person1   父级函数的this没改哦 ，依然是person1对象， 而被返回出来的箭头函数的this无法再次绑定，一直都绑定的是父级的this,所以依然打印person2



//对象是没有作用域的
var obj = {
  name: "obj",
  foo: function() {

  }
}
// obj2的上层作用域就是全局了
function obj2 () {
  var foo= function() {
      // 此处foo的上层作用域是obj2函数的作用域
  }
}

