function loader(source){
   console.log('inline-loader2');
   return source+"//inline-loader2";
}
loader.pitch  = function(){
   console.log('inline-pitch2');
}
module.exports = loader;