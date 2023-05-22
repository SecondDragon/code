const fs = require('fs'); // fs 是node的核心模块 安装node版本要求 14+ 别安15

// let arr = [];
// function out(){
//     if(arr.length == 2){
//         console.log(arr)
//     }
// }

function after(times,callback){
    let arr = []; // 目前我们不关心顺序
    return (data,index)=>{
        arr[index] = data; // 保证顺序 采用索引
        if(--times === 0){ // 多个请求并发 需要靠计数器来实现
            callback(arr);
        }
    }
}
let out = after(2,(arr)=>{
    console.log(arr)
})
fs.readFile('./a.txt','UTF8',function (err,data) {
    out(data,0)
})
fs.readFile('./b.txt','UTF8',function (err,data) {
   out(data,1)
})

// 发布订阅模式  订阅 -> 在发布