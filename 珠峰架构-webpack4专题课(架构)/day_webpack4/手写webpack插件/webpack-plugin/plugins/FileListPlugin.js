class FileListPlugin{
  constructor({ filename}){
    this.filename = filename;
  }
  apply(compiler){
    // 文件已经准备好了 要进行发射
    // emit
    compiler.hooks.emit.tap('FileListPlugin', (compilation)=>{
      let assets = compilation.assets;
      let content = `## 文件名    资源大小\r\n`
      //[ [bundle.js,{}],[index.html,{}]]
      Object.entries(assets).forEach(([filename,statObj]) => {
        content += `- ${filename}    ${statObj.size()}\r\n`
      });
      // 资源对象
      assets[this.filename] = {
        source(){
          return content;
        },
        size(){
          return content.length;
        }
      };
    })
  }
}
module.exports = FileListPlugin