/*
 * 基于Promise.all实现Ajax的串行和并行 
 */
// 串行：请求是异步的，需要等待上一个请求成功，才能执行下一个请求
// 并行：同时发送多个请求「HTTP请求可以同时进行，但是JS的操作都是一步步的来的，因为JS是单线程」,等待所有请求都成功，我们再去做什么事情?
Promise.all([
    axios.get('/user/list'),
    axios.get('/user/list'),
    axios.get('/user/list')
]).then(results => {
    console.log(results);
}).catch(reason => {

});