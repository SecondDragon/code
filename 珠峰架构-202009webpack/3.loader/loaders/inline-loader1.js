function loader(source){
   console.log('this.context',this.context);
   console.log('inline-loader1');
   return source+"//inline-loader1";
}
loader.pitch  = function(){
   console.log('inline-pitch1');
}
//loader.raw=true的话就表示这个source是一个Buffer
//loader.raw = true; raw meat
module.exports = loader;