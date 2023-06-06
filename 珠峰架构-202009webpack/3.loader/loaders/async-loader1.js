function loader(source){
   //调用async方法,可以把loader执行从同步改成异步
   //改成异步之后,当前的loader执行结束后并不会立刻向下执行下一个loader
   //需要你手工的在代码调用callback方法
    let callback = this.async();
   console.log(new Date());
   setTimeout(()=>{
       callback(null,source+"//async1");
   },3000);
   return source;
}
loader.pitch = function  loaderPitch1(remainingRequest,previousRequest,data){
    let asyncCallback = this.async();
    //console.log(this);//loaderContext
    console.log('async1-pitch');
    asyncCallback(null);
}
module.exports = loader;