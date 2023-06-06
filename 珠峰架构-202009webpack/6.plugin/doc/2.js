let {SyncHook} = require('tapable');
class HookMap{
    constructor(factory){
        this._map = new Map();
        this._factory = factory;
    }
    get(key){
        return this._map.get(key);
    }
    for(key){
        const hook = this.get(key);
        if(!!hook)
            return hook;
        let newHook = this._factory(key);    
        this._map.set(key,newHook);
        return newHook;
    }
    tap(key,options,fn){
        return this.for(key).tap(options,fn);
    }
    tapAsync(key,options,fn){
        return this.for(key).tapAsync(options,fn);
    }
    tapPromise(key,options,fn){
        return this.for(key).tapPromise(options,fn);
    }
}
//参数是一个映射函数,把一个key映射为一个hook
const keyedHook = new HookMap(key=>new SyncHook(['name']));
//tap key 插件名字 函数
keyedHook.tap('key','plugin1',(name)=>{console.log(1,name);});
//for key 
keyedHook.for('key').tap('plugin2',(name)=>{console.log(2,name);});
const hook = keyedHook.get('key');
hook.call('zhufeng');