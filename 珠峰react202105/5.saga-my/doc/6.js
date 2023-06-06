

function* gen() {
    let a = yield 1;
    console.log(a);
   
    let d = yield 4;
    console.log(d);
    return 'ok'
}

let it  = gen();
it.next();
it.next();
console.log(it.next());

