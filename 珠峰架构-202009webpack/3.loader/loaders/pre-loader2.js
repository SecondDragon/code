function loader(source){
   console.log('pre-loader2');
   return source+"//pre-loader2";
}
loader.pitch  = function(){
   console.log('pre-pitch2');
}
module.exports = loader;