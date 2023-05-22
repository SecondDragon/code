/*
 * Promise.all并发限制及async-pool的应用 
 *   + 并发限制指的是，每个时刻并发执行的promise数量是固定的，最终的执行结果还是保持与原来的
 */
const delay = function delay(interval) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // if (interval === 1003) reject('xxx');
            resolve(interval);
        }, interval);
    });
};
let tasks = [() => {
    return delay(1000);
}, () => {
    return delay(1003);
}, () => {
    return delay(1005);
}, () => {
    return delay(1002);
}, () => {
    return delay(1004);
}, () => {
    return delay(1006);
}];

/* Promise.all(tasks.map(task => task())).then(results => {
    console.log(results);
}); */

let results = [];
asyncPool(2, tasks, (task, next) => {
    task().then(result => {
        results.push(result);
        next();
    });
}, () => {
    console.log(results);
});