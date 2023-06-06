/**
 * Assets资产 资源 代表打包后的内容 输出的文件
 * 
 */
class AssetsPlugin{
    constructor(options){
        this.options = options;
    }
    apply(compiler){
        //通过监控compilation钩子可以拿 到最新的compilation
        compiler.hooks.compilation.tap('AssetsPlugin',(compilation,params)=>{
           
            //通过监听chunkAsset钩子可以拿到每个被添加的chunk和它对应的文件名
            compilation.hooks.chunkAsset.tap('AssetsPlugin',(chunk,filename)=>{
                console.log('chunk=',chunk);
                console.log('filename=',filename);
                console.log(compilation.assets);
            });
        });
    }
}
module.exports = AssetsPlugin;