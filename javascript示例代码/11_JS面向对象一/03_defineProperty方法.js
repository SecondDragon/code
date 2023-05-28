var obj = {
  name: "why",
  age: 18
}
// Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象

// 可接收三个参数：
// obj要定义属性的对象；
// prop要定义或修改的属性的名称或 Symbol；
// descriptor要定义或修改的属性描述符；

// 属性描述符是一个对象
Object.defineProperty(obj, "height", {

  //属性描述符的类型有两种：
  // 数据属性（Data Properties）描述符（Descriptor）；
  // 存取属性（Accessor访问器 Properties）描述符（Descriptor）；


  // 很多的配置
  value: 1.88
})
//刚刚添加的属性是不可枚举的（不可遍历的）


console.log(obj)
console.log(obj.height)

for (var key in obj){
  console.log(key)
}
