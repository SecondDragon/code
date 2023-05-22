class AsyncPlugin {
  apply(compiler){
    console.log(2);
    compiler.hooks.emit.tapAsync('AsyncPlugin',(compliation,cb)=>{
      setTimeout(() => {
        console.log('文件发射出来 等一下');
        cb();
      }, 1000);
    });
    compiler.hooks.emit.tapPromise('AsyncPlugin', (compliation) => {
      return new Promise((resolve,reject)=>{
        setTimeout(() => {
          console.log('在等一秒')
          resolve();
        }, 1000);
      })
    });
  }
}
module.exports = AsyncPlugin;