let why = require("./why.js")

console.log(why)
// why = {name:22222}

setTimeout(() => {
  // console.log(why.name)
  why.name = "james"
}, 1000)

setTimeout(() => {
  // console.log(why.name)
  console.log(why);
}, 2000);
let foo = require("./foo.js");