let less = require('less');
function loader(source){
  let callback = this.async();
  //把less文本编译成css文本
  less.render(source,{filename:this.resource},(err,output)=>{
    let css = output.css;
    let code = `module.exports = ${JSON.stringify(css)}`
    console.log('css',css);
    console.log('code',code);
    callback(err,code);
  });
}
module.exports = loader;