const info = {
  name: "why",
  age: 18,
  foo: function() {
    console.log("foo函数~")
  }
}

setTimeout(() => {
  // info.name = "kobe"
  console.log(info)
}, 4000)

module.exports = info
