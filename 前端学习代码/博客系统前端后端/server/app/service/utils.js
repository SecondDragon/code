const path = require("path");
const qiniu = require("qiniu");
const md5 = require("md5");
const Service = require("egg").Service;

class UtilsService extends Service {
 constructor(ctx) {
   super(ctx);
 }
 async uploadFiles() {
   const { ctx, app } = this;

   const mac = new qiniu.auth.digest.Mac(
     app.config.accessKey,
     app.config.secretKey
   );
   const config = new qiniu.conf.Config();
   config.zone = qiniu.zone.Zone_z2;
   // 参数解释： https://developer.qiniu.com/kodo/1206/put-policy
   const options = {
     scope: app.config.bucket,
     expires: 7200,
     force: true,
     callbackBodyType: "application/json",
   };

   const putPolicy = new qiniu.rs.PutPolicy(options);
   const uploadToken = putPolicy.uploadToken(mac);
   const timestamp = new Date().getTime(); // 当前时间戳
   const randomNum = Math.ceil(Math.random() * 1000); // 取1000以下的随机数

   try {
     // const stream = await ctx.getFileStream(); // 上传单个文件 文件不存在将响应400错误
     const parts = ctx.multipart();
     let stream;
     const files = [];
     while ((stream = await parts()) != null) {
       const extname = path.extname(stream.filename).toLocaleLowerCase();
       const filename =
         md5(path.basename(stream.filename, extname) + timestamp + randomNum) +
         extname;
       const formUploader = new qiniu.form_up.FormUploader(config);
       const putExtra = new qiniu.form_up.PutExtra();
       const result = await new Promise((resolve, reject) => {
         formUploader.putStream(
           uploadToken,
           filename,
           stream,
           putExtra,
           (respErr, respBody, respInfo) => {
             if (respErr) {
               throw respErr;
             }
             if (respInfo.statusCode == 200) {
               resolve(respBody);
             } else {
               reject(respBody);
             }
           }
         );
       });
       if (result !== "") {
         const data = {
           ...result,
           url: app.config.cdn + result.key,
         };
         files.push(data);
       }
     }
     console.log('---',files);
     return files;
   } catch (err) {
     console.log(err);
     return false;
   }
 }
}

module.exports = UtilsService;