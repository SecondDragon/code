
class SyncDonePlugin{
  apply(compiler){
    //done: new AsyncSeriesHook(["stats"]),
    compiler.hooks.done.tap('SyncDonePlugin',()=>{
        console.log('tap SyncDonePlugin');
    });
  }
}
module.exports = SyncDonePlugin;