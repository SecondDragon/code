function loader(source){
   console.log('normal-loader2');
   return source+"//normal-loader2";
}
loader.pitch  = function(){
   console.log('normal-pitch2');
   return 'normal-pitch2';
}
module.exports = loader;