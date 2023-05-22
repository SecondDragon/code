// 将多个路径拼接一起, 最终一定返回一个绝对路径: path.resolve
console.log("-------resolve---------")
console.log(path.resolve("./abc/cba", "../why/kobe", "./abc.txt"))

console.log(path.resolve())
