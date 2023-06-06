
class InfoPlugin{
    apply(compiler){
       compiler.hooks.emit.tap('InfoPlugin',(assets)=>{
        assets['info.json']= `{"id":"webpack"}`;
       });
    }
}
module.exports = InfoPlugin;