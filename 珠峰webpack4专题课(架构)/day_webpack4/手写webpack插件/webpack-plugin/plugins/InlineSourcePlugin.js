// 把外链的标签 变成内联的标签
const HtmlWebpackPlugin = require('html-webpack-plugin');
class InlineSourePlugin{
  constructor({match}){
    this.reg = match; // 正则
  }
  processTag(tag, compilation){ // 处理某一个标签的
    let newTag,url;
    if (tag.tagName === 'link' && this.reg.test(tag.attributes.href)){
      newTag = {
        tagName:'style',
        attributes:{type:'text/css'}
      }
      url = tag.attributes.href;
    }
    if (tag.tagName === 'script' && this.reg.test(tag.attributes.src)) {
      newTag = {
        tagName: 'script',
        attributes: { type: 'application/javascrpt' }
      }
      url = tag.attributes.src;
    }
    if(url){
      newTag.innerHTML = compilation.assets[url].source(); // 文件的内容放到innerHTML属性上
      delete compilation.assets[url]; // 删除掉 原有应该生成的资源
      return newTag
    }
    return tag;
  }
  processTags(data,compilation){ // 处理引入标签的数据  
    let headTags = [];
    let bodyTags = [];
    data.headTags.forEach(headTag => {
      headTags.push(this.processTag(headTag,compilation));
    });
    data.bodyTags.forEach(bodyTag => {
      bodyTags.push(this.processTag(bodyTag, compilation));
    });
    console.log({ ...data, headTags, bodyTags })
    return { ...data, headTags, bodyTags}
  }
  apply(compiler){
    // 要通过webpackPlugin来是实现这个功能
    compiler.hooks.compilation.tap('InlineSourePlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('alterPlugin',(data,cb)=>{
        data = this.processTags(data, compilation); // compilation.assets
        cb(null, data);
      })
    });
  }
}
module.exports = InlineSourePlugin;