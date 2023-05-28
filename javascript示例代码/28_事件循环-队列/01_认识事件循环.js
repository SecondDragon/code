
// 进程（process）：计算机已经运行的程序，是操作系统管理程序的一种方式；
// 线程（thread）：操作系统能够运行运算调度的最小单位，通常情况下它被包含在进程中；

console.log("script start")

// 业务代码

// setTimeout这个函数本身并不是异步的操作
setTimeout(function() {

}, 1000)

console.log("后续代码~")


console.log("script end")

