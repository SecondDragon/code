const path = require("path")

const filepath = "C://abc/cba/nba.txt"

// 1.可以从一个路径中获取一些信息
console.log(path.extname(filepath))
console.log(path.basename(filepath))
console.log(path.dirname(filepath))


const path1 = "/abc/cba"
const path2 = "../why/kobe/james.txt"
// console.log(path1 + path2)

// 2.将多个路径拼接在一起: path.join
// console.log(path.join(path1, path2))

