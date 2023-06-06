

function* gen(){
    //因 遇到yield,放弃 执行权。不会阻塞主进程
    while(true){
        yield 1;
        yield 2;
    }
}
setInterval(() => {
    console.log(new Date());
}, 1000);
let it = gen();
it.next();
it.next();
it.next();