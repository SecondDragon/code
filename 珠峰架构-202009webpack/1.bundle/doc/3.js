//common.js 规范规定的
console.log(this===module.exports);

(function fn(){})(
    {}
);
// 自执行函数的语法
(function fn(){})(a,b);

function fn1(){//index.js
    fn2();//title.js
}
fn1();