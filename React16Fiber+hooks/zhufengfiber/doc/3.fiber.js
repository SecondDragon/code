/**
 * 1.从顶点开始遍历
 * 2.如果有大儿子，先遍历大儿子
 *
 */
function sleep(delay) { //d=50//
    //在JS里如何实现睡眠的功能 t=当前时间
    for (var start = Date.now(); Date.now() - start <= delay;) { }
}
let A1 = { type: 'div', key: 'A1' };
let B1 = { type: 'div', key: 'B1', return: A1 }
let B2 = { type: 'div', key: 'B2', return: A1 }
let C1 = { type: 'div', key: 'C1', return: B1 }
let C2 = { type: 'div', key: 'C2', return: B1 }
A1.child = B1;
B1.sibling = B2;
B1.child = C1;
C1.sibling = C2;

let nextUnitOfWork = null;//下一个执行单元
let startTime = Date.now();
function workLoop(deadline) {
    //while (nextUnitOfWork) {//如果有待执行的执行单元，就执行，然后会返回下一个执行单元
    while ((deadline.timeRemaining() > 1 || deadline.didTimeout) && nextUnitOfWork) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
    if (!nextUnitOfWork) {
        console.log('render阶段结束了');
        console.log(Date.now() - startTime);
    } else {//请求下次浏览器空闲的时候帮我调
        requestIdleCallback(workLoop, { timeout: 1000 });
    }
}
function performUnitOfWork(fiber) {//A1 B1 C1 C2
    beginWork(fiber);//处理此fiber
    if (fiber.child) {//如果有儿子，返回大儿子
        return fiber.child;
    }//如果没有儿子，说明此fiber已经完成了
    while (fiber) {
        completeUnitOfWork(fiber);
        if (fiber.sibling) {
            return fiber.sibling;//如果说有弟弟返回弟弟
        }
        fiber = fiber.return;
    }
}
function completeUnitOfWork(fiber) {
    console.log('结束', fiber.key);//A1 B1 C1 C2
}

function beginWork(fiber) {
    sleep(20);
    console.log('开始', fiber.key);//A1 B1 C1 C2  B2
}

nextUnitOfWork = A1;

requestIdleCallback(workLoop, { timeout: 1000 });