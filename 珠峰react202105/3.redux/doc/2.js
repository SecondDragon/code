
function add1(str) {
    return '1' + str;
}
function add2(str) {
    return '2' + str;
}
function add3(str) {
    return '3' + str;
}
/* 
let result = add3(add2(add1('zhufeng')));
console.log(result);
funcs=[add3, add2, add1]
*/
function compose(...funcs) {
    return funcs.reduce((a,b)=>(...args)=>a(b(...args)));
}
/**
 *第一次 a=add3 b=add2 => (...args)=>add3(add2(...args))
 *第二次 a=(...args)=>add3(add2(...args)) b=add1 => (...args)=>add3(add2((add1(...args)))))
 */
let fn = compose(add3, add2, add1);
let result = fn('zhufeng');
console.log(result);//321zhufeng
