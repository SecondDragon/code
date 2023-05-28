var obj = {
  name: "why",
  age: 18
}

Object.defineProperty(obj, "address", {
  value: "北京市"
})

// 理论上我们通过属性描述符直接value添加的属性应该是不可枚举的，但是浏览器依然会让我们看见，只不过颜色淡一些

console.log(obj)
