module.exports = {
  userName: "NeverGiveUpT",
  myAppName: "blog-server-egg",
  baseRouter: "/api/v1", // 基本路由
  PAGE: 1,
  PAGE_SIZE: 10,
  defaultUserAvatar: "http://www.nevergiveupt.top/user_avatar.png",
  // 七牛云配置
  bucket: "nevergiveupt-blog", //要上传的空间名
  cdn: "http://img.nevergiveupt.top/", // 空间绑定的域名
  accessKey: "Cv8Md9JfU_8oQiH2mIGEhWvNP7ubQRPvGLaL49Co", //Access Key
  secretKey: "X0Dpo53BBtsip4rFgUyq1Nb_AQl7xjIIro77B8ti", //Secret Key

  // 微信公众号-前端小客栈配置参数
  token: "testauth",
  // appId: "wxd73a250032bb07e9",
  // AppSecret: "574da49c62c5fa9a9870390868f1a612",
  // encodingAESKey: "DZf1hByJaIuxd50h2BUPjesNNFjL5cuUaFSsjMq97Eq", //消息加解密密钥
  // 测试账号
  appId: "wx1bd84655acaf0a1d",
  AppSecret: "3561d879a1e0495f47401fb45ea9dac4",
  tkbApi: "https://api.tkbrer.life",
  tkbOrigin: "https://www.tkbrer.vip",
  tkbStatic: "https://static.tkbrer.vip",
  tkbResources: "https://resources.tkbrer.vip",
  tkbCryptoKey: "UhEUgAAARIA", // crypto md5 秘钥
  tkbSlat: "4qHK04", //   "4qHK04/3b223cf5a19c39a06baf2f17359bbe60/360p_0068/output_sd.m3u81622987620";
};
