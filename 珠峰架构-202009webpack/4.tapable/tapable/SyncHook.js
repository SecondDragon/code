let Hook = require('./Hook');
let HookCodeFactory = require('./HookCodeFactory');
let factory = new HookCodeFactory();
class SyncHook extends Hook{
    compile(options){
        debugger
        //this syncHook实例 options  ={taps,args}
        factory.setup(this,options);
        return factory.create(options);
    }
}
module.exports = SyncHook;