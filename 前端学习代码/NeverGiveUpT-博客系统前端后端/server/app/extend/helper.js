const bcrypt = require("bcrypt");
const moment = require("moment");

module.exports = {
  moment,
  /**
   * 加盐加密
   * @param {*} password  用户输入的密码
   * @return  加密后的密码
   */
  genSaltPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        //加盐
        bcrypt.hash(password, salt, async (err, hash) => {
          //加密
          if (!err) resolve(hash);
          else reject(err);
        });
      });
    });
  },

  /**
   * 解密
   * @param {*} _password string 用户输入的密码
   * @param {*} password  string 数据库保存的加密后的密码
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

  /**
   * 统一返回客户端数据
   */
  success({ ctx, res = null }) {
    ctx.status = res.status ? res.status : 200;
    if (res.status) {
      delete res.status;
    }
    ctx.body = {
      ...res,
      data: res.data ? res.data : null,
      code: res.code ? res.code : 0, // 0代表成功 ，其他代表失败
      msg: res.msg ? res.msg : "请求成功",
    };
  },
  filterEmptyField(trans) {
    let pam = {};
    for (let i in trans) {
      if (trans[i]) {
        if (i !== "page" && i !== "pageSize") {
          pam[i] = trans[i];
        }
      }
    }
    return pam;
  },

  getTimeQueryCon(params) {
    let timeQuery = {};
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
