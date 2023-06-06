let {SyncBailHook} = require('tapable');
/**
 * 同步保险钩子
 * 参数列表要给全,因为当触发事件的时候,取实参的时候数量就是按照这个数组的数量来取的
 * 数组里的字符串名称有要求?没有
 * tap第一个参数其实没有用,只是给开发人员看的
 * 
 */
//创建钩子
const hook = new SyncBailHook(["name","age"]);
//注册事件
hook.tap('1',(name,age)=>{
 console.log(1,name,age);
});
hook.tap('2',(name,age)=>{
    console.log(2,name,age);
    return "2";//如果任意一个事件函数有返回值,返回值不为undefined,则直接结束,不再执行后续的事件函数
});
hook.tap('3',(name,age)=>{
    console.log(3,name,age);
});
//触发事件
hook.call("zhufeng",10);