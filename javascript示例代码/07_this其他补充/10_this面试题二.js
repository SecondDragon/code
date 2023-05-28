var name = 'window'

//如下定义对象，在定义obj对象时是没有产生作用域的，因此obj2的上级作用域不是obj，而是全局，obj只是一个对象
// var obj={
//   foo:function (){
//     console.log(this.name);
//   }
// }


var person1 = {
  name: 'person1',
  foo1: function () {
    console.log(this.name)
  },
  //箭头函数的this在声明时就已经确定，它不再绑定this，因此，无论使用 apply还是call,他的作用域都是window
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name)
    }
  },
  foo4: function () {
    //同理，foo4()()的作用域就是调用foo4的对象，
    return () => {
      console.log(this.name)
    }
  }
}

var person2 = { name: 'person2' }

person1.foo1(); //
person1.foo1.call(person2); // 显式绑定生效 打印person2 (显示绑定优先级大于隐式绑定)

person1.foo2(); //window  箭头函数的this在声明时就已经确定,就是他的上层作用域的this,就是window
person1.foo2.call(person2); //window 箭头函数的this在声明时就已经确定,就是他的上层作用域的this,就是window

person1.foo3()(); //window 独立调用
person1.foo3.call(person2)(); // foo3的this指向改了，和我foo3内部的匿名函数有个皮的关系，你返回了匿名函数进行了独立调用，打印的当然是window
person1.foo3().call(person2); // foo3把内部匿名函数抛了出来，进行了独立调用，同时又显式绑定了this(person2)  依据优先级 打印 person2

person1.foo4()(); // 箭头函数的this在声明时就已经确定,就是他的上层作用域的this，person1.foo4 表明执行时 foo4的this是person1，所以 被抛出来的箭头函数的额this 指向 person1
person1.foo4.call(person2)(); // person2
person1.foo4().call(person2); // person1

















// person1.foo1(); // person1(隐式绑定)
// person1.foo1.call(person2); // person2(显示绑定优先级大于隐式绑定)

// person1.foo2(); // window(不绑定作用域,上层作用域是全局)
// person1.foo2.call(person2); // window

// person1.foo3()(); // window(独立函数调用)
// person1.foo3.call(person2)(); // window(独立函数调用)
// person1.foo3().call(person2); // person2(最终调用返回函数式, 使用的是显示绑定)

// person1.foo4()(); // person1(箭头函数不绑定this, 上层作用域this是person1)
// person1.foo4.call(person2)(); // person2(上层作用域被显示的绑定了一个person2)
// person1.foo4().call(person2); // person1(上层找到person1)
