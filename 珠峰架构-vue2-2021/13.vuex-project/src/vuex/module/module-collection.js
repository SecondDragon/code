import { forEach } from '../util'
import Module from './module';
class ModuleCollection {
    constructor(options) {
        // 对数据进行格式化操作
        this.root = null;
        this.register([],options); // 为了记录父子关系 
    }
    getNamespace(path){ // [a,b,c]
        // 返回一个字符串 a/b/c   ''
        let root = this.root
        let ns =  path.reduce((ns,key)=>{ // this.root.c.namespace
           let module =  root.getChild(key); 
           root = module;
           return module.namespaced ? ns + key + '/'   :ns
        },'');
        return ns;
    }
    register(path,rawModule){ 
        let newModule = new Module(rawModule)
        rawModule.newModule = newModule;// 自定义属性
        if(path.length == 0){
            this.root = newModule
        }else{
            // [a] // [a,c]  => [a]
            // 找父亲
            let parent = path.slice(0,-1).reduce((memo,current)=>{
                return memo.getChild(current)
            }, this.root);
            parent.addChild(path[path.length-1],newModule);
            // 根据当前注册的key ，将他注册到对应的模块的儿子处
        }
        // 注册完毕当前模块，在进行注册根模块 
        if(rawModule.modules){
            forEach(rawModule.modules,(module,key)=>{
               this.register(path.concat(key),module);
            })
        }
    }
}

export default ModuleCollection


// this.root = {
//     _raw: 用户定义的模块,
//     state: 当前模块自己的状态,
//     _children: { // 孩子列表
//         a: {
//             _raw: 用户定义的模块,
//             state: 当前模块自己的状态,
//             _children: { // 孩子列表
//                 e: {}
//             }
//         },
//         c: {

//         }
//     }

// }