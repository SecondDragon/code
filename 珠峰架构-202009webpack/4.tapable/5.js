/**
 * 
 */
let {AsyncParallelHook} = require('tapable');
//异步 并行 
let hook = new  AsyncParallelHook(["name"]);
//如果是异步的话有三种方式进行函数注册
//tap
/* hook.tap('1',(name)=>{
    console.log(1,name);
});
hook.tap('2',(name)=>{
    console.log(2,name);
});
hook.tap('3',(name)=>{
    console.log(3,name);
});
//不能再call了
hook.callAsync('zhufeng',(err)=>{
    console.log(err);
}); */
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
//不能再call了
hook.callAsync('zhufeng',(err)=>{
    console.log(err);
    console.timeEnd('cost');
}); */


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
});