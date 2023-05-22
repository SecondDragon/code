const path = require('path');
const qiniu = require('qiniu');
const md5 = require('md5');
const sha1 = require('sha1');
const Service = require('egg').Service;

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
    const options = {
      scope: app.config.bucket,
      expires: 7200,
      force: true,
      callbackBodyType: 'application/json',
    };

    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    const timestamp = new Date().getTime(); // 当前时间戳
    const randomNum = Math.ceil(Math.random() * 1000); // 取1000以下的随机数

    try {
      // const stream = await ctx.getFileStream(); // 上传单个文件 文件不存在将响应400错误
      const parts = this.ctx.multipart({ autoFields: true });
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
        if (result !== '') {
          const data = {
            ...result,
            url: app.config.cdn + result.key,
          };
          files.push(data);
        }
      }
      return files;
    } catch (err) {
      return false;
    }
  }

  // 生成随机字符串 nonceStr
  createNonceStr() {
    return Math.random().toString(36).substr(2, 15);
  }

  // 生成时间戳 timeStamp
  createTimeStamp() {
    return parseInt(new Date().getTime() / 1000) + '';
  }

  getKeyValueString(obj) {
    let keys = Object.keys(obj);
    keys = keys.sort(); // 1.字典排序
    let newObj = {};
    keys.forEach((item) => {
      newObj[item.toLowerCase()] = obj[item];
    });
    let str = ''; // 2.字符串拼接
    for (let i in newObj) {
      str += `&${i}=${newObj[i]}`;
    }
    str = str.substr(1);
    return str;
  }

  async getTicket() {
    const { ctx, app } = this;
    let access_token = '';
    let ticket = '';
    const ticket_data = await ctx.model.Ticket.findOne();

    const getTicketByWeiXin = async () => {
      const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${app.config.appId}&secret=${app.config.AppSecret}`;
      const res_token = await ctx.curl(url, { dataType: 'json' });
      access_token = res_token.data.access_token;
      const ticket_url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`;
      const res_ticket = await ctx.curl(ticket_url, { dataType: 'json' });
      ticket = res_ticket.data.ticket;
    };

    if (ticket_data) {
      // 判断数据库是否存储过
      let time = new Date().getTime() - ticket_data.accessTokenTime;
      if (time > 7000000) {
        // 是否过期
        // 重新获取并更新
        await getTicketByWeiXin();
        let time = new Date().getTime();
        await ctx.model.Ticket.updateOne(
          {
            _id: ticket_data._id,
          },
          {
            accessToken: access_token,
            accessTokenTime: time,
            jsApiTicket: ticket,
            jsApiTicketTime: time,
          }
        );
      } else {
        access_token = ticket_data.accessToken;
        ticket = ticket_data.jsApiTicket;
      }
    } else {
      await getTicketByWeiXin(); // 获取然后再存储
      let time = new Date().getTime();
      await ctx.model.Ticket.create({
        accessToken: access_token,
        accessTokenTime: time,
        jsApiTicket: ticket,
        jsApiTicketTime: time,
      });
    }
    return { access_token, ticket };
  }

  async sign(url) {
    const { ctx, app } = this;
    /**
      参与签名的字段包括noncestr（随机字符串）, 有效的jsapi_ticket, timestamp（时间戳）, url（当前网页的URL，不包含#及其后面部分） 。
      1.对所有待签名参数按照字段名的ASCII 码从小到大排序（字典序）后，
      2.使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串string1。
      3.这里需要注意的是所有参数名均为小写字符。
      4.对string1作sha1加密，字段名和字段值都采用原始值，不进行URL 转义。
     * 
     */

    const ticketData = await this.getTicket();
    const obj = {
      url,
      jsapi_ticket: ticketData.ticket,
      nonceStr: this.createNonceStr(),
      timestamp: this.createTimeStamp(),
    };

    const str = this.getKeyValueString(obj);
    const signature = sha1(str); // 4.sha1加密
    obj.signature = signature;
    obj.appId = app.config.appId;
    return obj;
  }
}

module.exports = UtilsService;
