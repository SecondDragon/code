/**
 * AsyncSeriesHook 异步串行钩子
 */
let  {AsyncSeriesHook} = require('tapable');
let hook = new AsyncSeriesHook(['name']);
/* console.time('cost');
hook.tapAsync('1',(name,callback)=>{
    setTimeout(()=>{
        console.log(1,name);
        callback();
    },1000);
});
hook.tapAsync('2',(name,callback)=>{
    setTimeout(()=>{
        console.log(2,name);
        callback();
    },2000);
});
hook.tapAsync('3',(name,callback)=>{
    setTimeout(()=>{
        console.log(3,name);
        callback();
    },3000);
});
hook.callAsync('zhufeng',(err)=>{
    console.log(err);
    console.timeEnd('cost');
});  */


console.time('cost');
hook.tapPromise('1',(name)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(1,name);
            resolve();
        },1000);
    });
});
hook.tapPromise('2',(name,callback)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(2,name);
            //不管resolve还是 reject,只会传了不为null的值,则都会让整个任务直接结束 
            //resolve();
            reject();
        },2000);
    });
});
hook.tapPromise('3',(name,callback)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(3,name);
            resolve();
        },3000);
    });
});
//不能再call了
hook.promise('zhufeng').then((data)=>{
    console.log(data);
    console.timeEnd('cost');
},(error)=>{
    console.log(error);
    console.timeEnd('cost');
});