var name = "window";

var person = {
  name: "person",
  sayName: function () {
    console.log(this.name);
  }
};

function sayName() {
  var sss = person.sayName;
  sss(); // window: 独立函数调用
  person.sayName(); // person: 隐式调用
  (person.sayName)(); // person: 隐式调用 这里加不加括号是一样的 
  (b = person.sayName)(); // window: 赋值表达式(独立函数调用)
}

sayName();

