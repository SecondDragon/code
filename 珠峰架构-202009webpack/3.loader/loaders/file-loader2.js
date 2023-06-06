let path = require('path');
/**
 * 1.生成一个新的文件名
 * 2.向输出列表里添加一个输出文件
 * @param {*} content 
 */
let {getOptions,interpolateName} = require('loader-utils');
function loader(content){
    //1.选项
    let options = getOptions(this)||{};
    //2.得到文件名
    let filename = interpolateName(this,options.filename,{
        content
    });
    //3.向输出列表里添加一个输出的文件
    this.emitFile(filename,content);
    return `export default ${JSON.stringify(filename)}`;

}
//加载的二进制,所以需要让content是Buffer
loader.raw = true;
module.exports = loader;

/* 
function interpolateName(loaderContext,name,options){
    let filename = name||'[hash].[ext]';
    let ext = path.extname(loaderContext.resourcePath).slice(1);
    let hash = require('crypto').createHash('md5').update(options.content).digest('hex');
    filename= filename.replace(/\[hash\]/ig,hash).replace(/\[ext\]/ig,ext);
    return filename;
}
function getOptions(loaderContext) {
    const query = loaderContext.query;
    if (typeof query === 'string' && query !== '') {
      return parseQuery(loaderContext.query);
    }
    if (!query || typeof query !== 'object') {
      return null;
    }
    return query;
}
function parseQuery(query){//?name=zhufeng&age=10
    return query.split('&').reduce((memo,item)=>{
        let [key,value] = item.split('=');
        memo[key]= value;
        return memo;
    },{});
} */