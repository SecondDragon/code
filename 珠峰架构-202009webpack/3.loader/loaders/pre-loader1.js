function loader(source){
   console.log('pre-loader1');
   return source+"//pre-loader1";
}
loader.pitch  = function(){
   console.log('pre-pitch1');
}
module.exports = loader;