function loader(source){
    debugger
   //调用async方法,可以把loader执行从同步改成异步
   //改成异步之后,当前的loader执行结束后并不会立刻向下执行下一个loader
   //需要你手工的在代码调用callback方法
   /*  let callback = this.async();
   console.log(new Date());
   setTimeout(()=>{
       callback(null,source+"//async2");
   },3000); */
   return source+"//async2";
}
loader.pitch = function loaderPitch2(remainingRequest,previousRequest,data){
    console.log('async2-pitch');
    return 'async2-pitch';
}
module.exports = loader;