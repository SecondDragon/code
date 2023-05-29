

// function info(name: string, age: number) {
//   console.log("name:", name, " age:", age);
//   return 3
// }

// info("wangwu",23)



// let info = function (name: string, age: number) {
//   console.log("name:", name, " age:", age);
//   return 3
// }

// info("wangwu", 23)



// let info: (name: string, age: number) => number =
//   function (name, age) {
//     console.log("name:", name, " age:", age);
//     return 3
//   }

// info("wangwu", 23)
// type TypInfoFun = (name: string, age: number) => number
// let info: TypInfoFun =
//   function (name, age) {
//     console.log("name:", name, " age:", age);
//     return 3
//   }

//info("wangwu", 23)

// rest参数

// function info(name: string, age: number, ...rest: any) {
//   console.log("name:", name, " age:", age, " rest:", rest);
//   return rest
// }

// info("wangwu",23,"1111","beijing",23,)