//中间带*就是生成器
function* gen() {
    let a = yield 1;
    console.log(a);
    let b = yield 2;
    console.log(b);
    let c = yield 3;
    console.log(c);
}

function runSaga(generator){
    let it = generator();
    function next(val){
        let {done,value} = it.next(val);
        if(!done){//done为false,也就是没有完成
            next(value);
        }
    }
    next();
}
//runSaga(gen);


//生成器可以执行返回一个迭代器
let it = gen();
let val1 = it.next();
console.log(val1);//{done:false,value:1}
let val2 = it.next(val1.value);
console.log(val2);//{done:false,value:2}
it.return('正常结束');//让saga 的执行直接结束了 saga=generator
let val3 = it.next(val2.value);
console.log(val3);//{done:false,value:3}
let val4 = it.next(val3.value);
console.log(val4);//{done:true,value:undefined}