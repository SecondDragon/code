let {AsyncParallelBailHook} = require('tapable');
//异步 并行 
let hook = new  AsyncParallelBailHook(["name"]);
//如果是异步的话有三种方式进行函数注册
//tap
/* hook.tap('1',(name)=>{
    console.log(1,name);
});
hook.tap('2',(name)=>{
    console.log(2,name);
    return '2';//如果返回值不为undefined,则停止后续
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
        callback('2');
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
});  */


console.time('cost');
hook.tapPromise('1',(name)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(1,name);
            resolve('over');
        },1000);
    });
});
hook.tapPromise('2',(name,callback)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(2,name);
            //不管resolve还是 reject,只会传了不为null的值,则都会让整个任务直接结束 
            reject('over');
        },2000);
    });
});
hook.tapPromise('3',(name,callback)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(3,name);
            resolve();
        },500);
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