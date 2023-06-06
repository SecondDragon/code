//let {SyncHook}  = require('tapable');
class SyncHook{
    constructor(){
        this.taps = [];
    }
    tap(name,callback){
        this.taps.push(callback);
    }
    call(...args){
        this.taps.forEach(tap=>tap(...args));
    }
}
let hook = new SyncHook(['name']);
hook.tap('1',(name)=>{
 console.log('name',name);
});
hook.call('zhufeng');