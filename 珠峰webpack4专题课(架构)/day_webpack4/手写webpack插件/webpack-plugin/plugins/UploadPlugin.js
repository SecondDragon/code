let path = require('path');
let qiniu = require('qiniu');
class UploadPlugin{
  constructor(options){
    let { bucket = '', domain = "", accessKey = '', secretKey = '' } = options;
    let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    let putPolicy = new qiniu.rs.PutPolicy({ scope: bucket });
    this.uploadToken = putPolicy.uploadToken(mac);
    let config = new qiniu.conf.Config();
    this.formUploader = new qiniu.form_up.FormUploader(config);
    this.putExtra = new qiniu.form_up.PutExtra();
  }
  apply(compiler){
    compiler.hooks.afterEmit.tapPromise('UploadPlugin',(compliation)=>{
      let assets = compliation.assets;
      let promises = [];
      Object.keys(assets).forEach(filename=>{
        promises.push(this.upload(filename));
      })
      return Promise.all(promises);
    })
  }
  upload(filename){
    return new Promise((resolve,reject)=>{
      let localFile = path.resolve(__dirname, '../dist', filename)
      this.formUploader.putFile(this.uploadToken, filename, localFile, this.putExtra, function (respErr,
        respBody, respInfo) {
        if (respErr) {
          reject(respErr);
        }
        if (respInfo.statusCode == 200) {
          resolve(respBody);
        }
      });
    })
  }
}
module.exports = UploadPlugin