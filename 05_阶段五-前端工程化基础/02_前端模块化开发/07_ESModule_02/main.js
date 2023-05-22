// 1.导入方式一: 
// import { name, age, sayHello } from "./foo.js"

// 2.导入方式二: 导入时给标识符起别名
// import { name as fname, age, sayHello } from "./foo.js"

// 3.导入时可以给整个模块起别名
import * as foo from "./foo.js"

const name = "main"

console.log(name)
console.log(foo.name)
console.log(foo.age)
foo.sayHello()
