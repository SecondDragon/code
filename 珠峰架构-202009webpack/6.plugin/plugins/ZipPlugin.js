/**
 * 此插件用来把所有打包产出的文件压缩到一个压缩包里,供上线或者发给别人
 * 1.我得知道本次编译产出了哪些文件,以及这些文件内容是什么?
 * 2.我得生成一个新的文件,并且添加到输出列表里,以便也写入dist目录
 */
const {RawSource} = require('webpack-sources');
const JSZip = require('jszip');
class ZipPlugin{
  constructor(options){
    this.options = options;
  }
  apply(compiler){
      //emit钩子会在生成资源到output目录之前触发,它是修改输出文件最后机会
    compiler.hooks.emit.tapAsync('ZipPlugin',(compilation,callback)=>{
        //compilation.assets是一个对象,key是文件名,值是源代码
        let zip = new JSZip();//先创建一个压缩包
        for(let filename in compilation.assets){
            const source = compilation.assets[filename].source();//调用它的 source方法可以获取源代码
            //向压缩里面添加一个文件,文件名叫filename,文件内容source
            zip.file(filename,source);
        }
        //生成压缩包
        zip.generateAsync({type:'nodebuffer'}).then(content=>{
            //还要把这个压缩包也添加到输出列表里去
            compilation.assets[this.options.filename || 'assets.zip'] = new RawSource(content);
           /*  compilation.assets['assets.zip'] = {
                source(){
                    return content;
                }
            } */
            callback();
        });
    });

  }
}
module.exports = ZipPlugin;