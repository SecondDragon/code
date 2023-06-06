let path = require('path');
let mime = require('mime');
let {getOptions} = require('loader-utils');
function loader(content){
    let options = getOptions(this)||{};
    let {limit,fallback='file-loader'} = options;
    if(limit){
        limit = parseInt(limit,10);
    }
    const mimeType = mime.getType(this.resourcePath);//.jpg=>image/jpeg
    //阈值 yu
    if(!limit || content.length<limit){
        let base64String = `data:${mimeType};base64,${content.toString("base64")}`;
        return `export default ${JSON.stringify(base64String)}`;
        //return `module.exports= ${JSON.stringify(base64String)}`;
    }else{
        let fileLoader = require(fallback||'file-loader');
        return fileLoader.call(this,content);
    }
}
/**
source 里本身就有export default  return 的时候， 又包了export default   不会冲突吗?会
一般来说如果 返回的代码里有export default module.exports 
它就是最左边的loader最后的loader,不会再传的loader ,直接给webpack进行后续处理
 */

loader.raw = true;
module.exports = loader;
