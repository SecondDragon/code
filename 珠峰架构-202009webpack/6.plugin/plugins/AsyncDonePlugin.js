
class AsyncDonePlugin{
  apply(compiler){
    //done: new AsyncSeriesHook(["stats"]),
    compiler.hooks.done.tapAsync('AsyncDonePlugin',(stats,callback)=>{
        console.log('tapAsync AsyncDonePlugin');
        callback();//调用callback代表此钩子函数已经执行完毕了
    });
  }
}
module.exports = AsyncDonePlugin;