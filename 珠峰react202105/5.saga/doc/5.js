

function*  gen2(){
    let b = yield 2;
    console.log(b);
    let c = yield 3;
    console.log(c);
}
function* gen() {
    yield gen2();
    let a = yield 1;
    console.log(a);
   
    let d = yield 4;
    console.log(d);
}
//开启子进程
/**
 * 1.从头开始完整执行saga
 * 2. 不会阻塞 当前的saga继续
 */
function runSaga(saga){
    let it =  typeof saga[Symbol.iterator] === 'function'?saga:saga();
    function next(val){
        let {done,value} = it.next(val);
        if(!done){//done为false,也就是没有完成
            if(typeof value[Symbol.iterator] === 'function'){
                runSaga(value);
            }
            next(value);
        }
    }
    next();
}
runSaga(gen);