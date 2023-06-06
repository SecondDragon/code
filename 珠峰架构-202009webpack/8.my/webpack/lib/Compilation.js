let { Tapable, SyncHook } = require('tapable');
let async = require('neo-async');
const NormalModuleFactory = require('./NormalModuleFactory');
const normalModuleFactory = new NormalModuleFactory();
const Parser = require('./Parser');
const parser = new Parser();
const path = require('path');
const Chunk = require('./Chunk');
const ejs = require('ejs');
const fs = require('fs');
const mainTemplate = fs.readFileSync(path.join(__dirname,'templates','deferMain.ejs'),'utf8');
const mainRender = ejs.compile(mainTemplate);
const chunkTemplate = fs.readFileSync(path.join(__dirname,'templates','chunk.ejs'),'utf8');
const chunkRender = ejs.compile(chunkTemplate);
class Compilation extends Tapable {
  constructor(compiler) {
    super();
    this.compiler = compiler;//编译器对象 
    this.options = compiler.options;// 选项一样
    this.context = compiler.context;//根目录
    this.inputFileSystem = compiler.inputFileSystem;//读取文件模块fs
    this.outputFileSystem = compiler.outputFileSystem;//写入文件的模块fs
    this.entries = [];//入口模块的数组,这里放着所有的入口模块
    this.modules = [];//模块的数组,这里放着所有的模块
    this._modules = {};//key是模块ID ,值是模块对象
    this.chunks = [];//这里放着所有代码块
    this.files = [];//这里放着本次编译所有的产出的文件名
    this.assets = {};//存放 着生成资源 key是文件名 值是文件的内容
    this.vendors = [];//放着所有的第三方模块 isarray
    this.commons = [];//这里放着同时被多个代码块加载的模块  title.js
    this.moduleCount= {};//可以记录每个模块被代码块引用的次数,如果大于等于2,就分离出到commons里
    this.hooks = {
      //当你成功构建完成一个模块后就会触发此钩子执行
      succeedModule: new SyncHook(['module']),
      seal:new SyncHook(),
      beforeChunks:new SyncHook(),
      afterChunks:new SyncHook()
    }
  }

  /**
   * 开始编译一个新的入口
   * @param {*} context  根目录 
   * @param {*} entry 入口模块的相对路径 ./src/index.js
   * @param {*} name 入口的名字 main
   * @param {*} callback 编译完成的回调
   */
  addEntry(context, entry, name, finalCallback) {
    this._addModuleChain(context, entry, name,false, (err, module) => {
      finalCallback(err, module);
    });
  }
  _addModuleChain(context, rawRequest, name,async, callback) {
    this.createModule({
      name,context,rawRequest,parser,
      resource:path.posix.join(context,rawRequest),
      moduleId:'./'+path.posix.relative(context,path.posix.join(context,rawRequest)),
      async
    },entryModule=>this.entries.push(entryModule),callback);
  }
  /**
   * 创建并编译一个模块
   * @param {*} data 要编译的模块信息
   * @param {*} addEntry  可选的增加入口的方法 如果这个模块是入口模块,如果不是的话,就什么不做
   * @param {*} callback 编译完成后可以调用callback回调
   */
  createModule(data, addEntry, callback) {
    //通过模块工厂创建一个模块
    let module = normalModuleFactory.create(data);
    addEntry&&addEntry(module);//如果是入口模块,则添加入口里去
    //if(!this._modules[module.moduleId]){//如果_modules里有模块了,不要再放了.
      this.modules.push(module);//给普通模块数组添加一个模块
      this._modules[module.moduleId]=module;
    //}
    const afterBuild = (err, module) => {
      //如果大于0,说明有依赖
      if (module.dependencies.length > 0) {
        this.processModuleDependencies(module, err => {
          callback(err, module);
        });
      } else {
        callback(err, module);
      }
    }
    this.buildModule(module, afterBuild);
  }
  /**
   * 处理编译模块依赖
   * @param {*} module ./src/index.js
   * @param {*} callback 
   */
  processModuleDependencies(module, callback) {
    //1.获取当前模块的依赖模块
    let dependencies = module.dependencies;
    //遍历依赖模块,全部开始编译,当所有的依赖模块全部编译完成后才调用callback
    async.forEach(dependencies, (dependency, done) => {
      let { name, context, rawRequest, resource, moduleId } = dependency;
      this.createModule({
        name,context,rawRequest,parser,
        resource,moduleId
      },null,done);
    }, callback);
  }
  /**
   * 编译模块
   * @param {*} module 要编译的模块
   * @param {*} afterBuild 编译完成后的后的回调
   */
  buildModule(module, afterBuild) {
    //模块的真正的编译逻辑其实是放在module内部完成
    module.build(this, (err) => {
      //走到这里意味着一个module模块已经编译完成了
      this.hooks.succeedModule.call(module);
      afterBuild(err, module);
    });
  }
  /**
   * 把模块封装成代码块Chunk
   * @param {*} callback 
   */
  seal(callback){
    this.hooks.seal.call();
    this.hooks.beforeChunks.call();// 开始准备生成代码块
    //循环所有的modules数组
    for(const module of this.modules){
      //如果模块ID中有node_modules内容,说明是一个第三方模块
      if(/node_modules/.test(module.moduleId)){
        module.name = 'vendors';
        if(!this.vendors.find(item=>item.moduleId===module.moduleId))
           this.vendors.push(module);
      }else{
        let count = this.moduleCount[module.moduleId];
        if(count){
          this.moduleCount[module.moduleId].count++;
        }else{
          //如果没有,则给它赋初始值 {module,count} count是模块的引用次数
          this.moduleCount[module.moduleId]={module,count:1};
        }
      }
    }
    for(let moduleId in this.moduleCount){
      const {module,count} = this.moduleCount[moduleId];
      if(count>=2){
        module.name = 'commons';
        this.commons.push(module);
      }
    }
    let deferredModuleIds  = [...this.vendors,...this.commons].map(module=>module.moduleId);
    this.modules = this.modules.filter(module=>!deferredModuleIds.includes(module.moduleId));

    //一般来说,默认情况下,每一个入口会生成一个代码块
    for(const entryModule of this.entries){
      const chunk = new Chunk(entryModule);//根据入口模块得到一个代码块
      this.chunks.push(chunk);
      //对所有模块进行过滤,找出来那些名称跟这个chunk一样的模块,组成一个数组赋给chunk.modules
      chunk.modules = this.modules.filter(module=>module.name === chunk.name);
    }
    if(this.vendors.length>0){
      const chunk = new Chunk(this.vendors[0]);//根据入口模块得到一个代码块
      chunk.async = true;
      this.chunks.push(chunk);
      //对所有模块进行过滤,找出来那些名称跟这个chunk一样的模块,组成一个数组赋给chunk.modules
      chunk.modules = this.vendors;
    }
    if(this.commons.length>0){
      const chunk = new Chunk(this.commons[0]);//根据入口模块得到一个代码块
      chunk.async = true;
      this.chunks.push(chunk);
      //对所有模块进行过滤,找出来那些名称跟这个chunk一样的模块,组成一个数组赋给chunk.modules
      chunk.modules = this.commons;
    }
    this.hooks.afterChunks.call(this.chunks);
    //生成代码块之后,要生成代码块对应资源
    this.createChunkAssets();
    callback();
  }
  createChunkAssets(){
    for(let i=0;i<this.chunks.length;i++){
      const chunk = this.chunks[i];
      const file = chunk.name + '.js';//只是拿到了文件名
      chunk.files.push(file);
      let source;
      if(chunk.async){
        source = chunkRender({
          chunkName:chunk.name,  // ./src/index.js
          modules:chunk.modules//此代码块对应的模块数组[{moduleId:'./src/index.js'},{moduleId:'./src/title.js'}]
        });
      }else{
        let deferredChunks = [];
        if(this.vendors.length>0)deferredChunks.push('vendors'); 
        if(this.commons.length>0)deferredChunks.push('commons'); 
        source = mainRender({
          entryModuleId:chunk.entryModule.moduleId,  // ./src/index.js
          deferredChunks,
          modules:chunk.modules//此代码块对应的模块数组[{moduleId:'./src/index.js'},{moduleId:'./src/title.js'}]
        });
      }
      
      this.emitAssets(file,source);
    }
  }
  emitAssets(file,source){
    this.assets[file]=source;
    this.files.push(file);
  }

}
module.exports = Compilation;