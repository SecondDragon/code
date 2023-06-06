let {SyncLoopHook} = require('tapable');
//对于SyncLoopHook而言,如果返回是undefined则表示本函数结束了,会执行下一个钩子
//如果返回值不是undefined,则会继续从最开头执行
let hook = new  SyncLoopHook(["name","age"]);
let counter1=0;
let counter2=0;
let counter3=0;
let total=0;
hook.tap('A',(name,age)=>{
  console.log('A','counter1',counter1);total++;
  if(++counter1 == 1){
    counter1 = 0;
    return;//返回一个undefined
  }
  return 'A';
});
hook.tap('B',(name,age)=>{
    console.log('B','counter2',counter2);total++;
    if(++counter2 == 2){
      counter2 = 0;
      return;//返回一个undefined
    }
    return 'B';
});
hook.tap('C',(name,age)=>{
    console.log('C','counter3',counter3);total++;
    if(++counter3 == 3){
      counter3 = 0;
      return;//返回一个undefined
    }
    return 'C';
});
//这个call跟调用函数的那个call没有关系
hook.call('zhufeng',10);
console.log(total);