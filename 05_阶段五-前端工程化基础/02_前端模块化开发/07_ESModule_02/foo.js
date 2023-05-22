// 3.导出方式三:
export const name = "why"
export const age = 18

export function sayHello() {
  console.log("sayHello")
}

export class Person {}

// console.log(name)

// 1.导出方式一: 
// export {
//   name,
//   age,
//   sayHello
// }

// 2.导出方式二: 导出时给标识符起一个别名
// export {
//   name as fname,
//   age,
//   sayHello
// }

