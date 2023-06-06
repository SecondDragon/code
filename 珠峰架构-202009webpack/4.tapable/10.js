const { SyncHook } = require("./tapable");
debugger
let syncHook = new SyncHook(["x", "y"]);
let fn1 = (name, age) => {
    console.log(1, name, age);
}
syncHook.tap({name:'1'},fn1 );
let fn2 =  (name, age) => {
    console.log(2, name, age);
}
syncHook.tap("2",fn2);
debugger
syncHook.call("zhufeng", 10);
/* 
function anonymous(name, age) {
    var _x = [fn1, fn2];
    var _fn0 = _x[0];
    _fn0(name, age);
    var _fn1 = _x[1];
    _fn1(name, age);
}
debugger
anonymous("zhufeng", 10); */