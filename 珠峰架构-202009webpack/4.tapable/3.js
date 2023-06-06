let {SyncWaterfallHook} = require('tapable');
let hook = new SyncWaterfallHook(["name","age"]);
//上一个函数的结果如果不为undefined,则可以作为下一个函数的第一个参数.,如果是undefined则会用上一个不为undefined的值
hook.tap('1',(name,age)=>{
    console.log(1,name,age);
    return "A";
});
hook.tap('2',(name,age)=>{
     console.log(2,name,age);
     return "B";
});
hook.tap('3',(name,age)=>{
     console.log(3,name,age);
});
 //触发事件
hook.call("zhufeng",10);