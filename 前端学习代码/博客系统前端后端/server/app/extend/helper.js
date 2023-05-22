const moment = require("moment");
const bcrypt = require("bcrypt");

module.exports = {
  moment,
  // 加密
  genSaltPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (!err) {
            resolve(hash);
          } else {
            reject(err);
          }
        });
      });
    });
  },
  // 解密
  /**
   *
   * @param {未加密的密码} _password
   * @param {数据库保存的已经加密的密码} password
   * @return boolean 是否匹配
   */
  comparePassword(_password, password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch);
        else reject(err);
      });
    });
  },

  success({ ctx, res = null }) {
    ctx.status = res.status ? res.status : 200;
    if (res.status) {
      delete res.status;
    }
    ctx.body = {
      ...res,
      data: res.data ? res.data : null,
      code: res.code ? res.code : 0, // 0代表成功，其他代表失败
      msg: res.msg ? res.msg : "请求成功",
    };
  },

  filterEmptyField(params) {
    let pam = {};
    for (let i in params) {
      if (params[i]) {
        if (i !== "page" && i !== "pageSize") {
          pam[i] = params[i];
        }
      }
    }
    return pam;
  },

  getTimeQueryCon(params) {
    let timeQuery = {};

    //     createStartTime		否	number	10位时间戳  2022-1-26 2022-1-27
    // createEndTime		否	number	10位时间戳   2022-1-27
    // updateStartTime		否	number	10位时间戳
    // updateEndTime

    if (params.createStartTime) {
      timeQuery.createTime = { $gte: params.createStartTime };
    }
    if (params.createEndTime) {
      timeQuery.createTime = { $lte: params.createEndTime };
    }
    if (params.createStartTime && params.createEndTime) {
      timeQuery.createTime = {
        $gte: params.createStartTime,
        $lte: params.createEndTime,
      };
    }

    if (params.updateStartTime) {
      timeQuery.updateTime = { $gte: params.updateStartTime };
    }
    if (params.updateEndTime) {
      timeQuery.updateTime = { $lte: params.updateEndTime };
    }
    if (params.updateStartTime && params.updateEndTime) {
      timeQuery.updateTime = {
        $gte: params.updateStartTime,
        $lte: params.updateEndTime,
      };
    }

    return timeQuery;
  },
};
