function loader(source){
   console.log('post-loader2');
   return source+"//post-loader2";
}
loader.pitch  = function(){
   console.log('post-pitch2');
}
module.exports = loader;