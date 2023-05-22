class DonePlugin {
  apply(compiler){ // compiler.hooks
    console.log(1)
    compiler.hooks.done.tap('DonePlugin',(stats)=>{
      console.log('编译完成~~~')
    })
  }
}
module.exports = DonePlugin