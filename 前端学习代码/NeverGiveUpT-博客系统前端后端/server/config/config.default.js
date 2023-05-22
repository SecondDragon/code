/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const userConfig = require("./config.user");

module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1592223477170_7907";

  // add your middleware config here
  config.middleware = ["errorHandler", "log", "auth"];

  config.cluster = {
    listen: {
      path: "",
      port: 7002,
      hostname: "127.0.0.1",
    },
  };

  config.errorHandler = {
    match: "/api/v1",
  };

  config.auth = {
    whiteList: [userConfig.userName],
  };

  // post请求忽略csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // config.bcrypt = {
  //   saltRounds: 10, // default 10
  // };

  config.mongoose = {
    // url: "mongodb://47.93.186.128:27017/blog", // 阿里云
    url: "mongodb://127.0.0.1:27017/blog", // 腾讯云
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  };

  config.jwt = {
    secret: userConfig.userName,
  };

  // github 登录配置
  config.passportGithub = {
    key: "bd7e5f72e4af0d117892",
    secret: "2906a61065549951da6cd297b67e916a42bedf7c",
    callbackURL: "/api/v1/web/github/callback",
    proxy: true,
  };

  // 配置github登录成功后的跳转地址
  config.passportGithubPassword = "123456";
  return {
    ...config,
    ...userConfig,
  };
};
