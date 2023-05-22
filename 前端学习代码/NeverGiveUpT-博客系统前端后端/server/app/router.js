/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, jwt } = app;

  // 后台接口
  const baseRouter = app.config.baseRouter; // /api/v1

  router.get(baseRouter + "/wedding", controller.wedding.index); // 祝福语-列表获取
  router.post(baseRouter + "/admin/login", controller.admin.adminLogin); // 管理员登录
  router.post(baseRouter + "/admin/logout", controller.admin.adminLogout); // 管理员退出登录

  router.post(baseRouter + "/upload", jwt, controller.utils.uploadFiles); //上传文件到七牛云

  router.resources(
    "articles",
    baseRouter + "/articles",
    jwt,
    controller.articles
  ); // 文章
  router.put(
    baseRouter + "/articles/status/:id",
    jwt,
    controller.articles.changeStatus
  ); // 文章-启用、停用
  router.put(
    baseRouter + "/articles/publishStatus/:id",
    jwt,
    controller.articles.changePublishStatus
  ); // 文章-更改发布状态

  router.post(
    baseRouter + "/articles/collectStatus",
    jwt,
    controller.articles.changeCollectStatus
  ); // 文章-一键开启关闭收藏

  router.put(
    baseRouter + "/articles/sort/:id",
    jwt,
    controller.articles.changeSort
  ); // 文章-排序和置顶

  router.resources(
    "categories",
    baseRouter + "/categories",
    jwt,
    controller.categories
  ); // 分类

  router.resources("tags", baseRouter + "/tags", jwt, controller.tags); // 标签
  router.put(
    baseRouter + "/tags/status/:id",
    jwt,
    controller.tags.updateStatus
  ); // 标签-修改状态

  router.resources("about", baseRouter + "/about", jwt, controller.about); // 关于
  router.resources("user", baseRouter + "/user", jwt, controller.user); // 用户
  router.resources("comment", baseRouter + "/comment", jwt, controller.comment); // 评论

  router.resources(
    "config",
    baseRouter + "/config/home",
    jwt,
    controller.config.home
  ); // 首页配置
  router.resources(
    "config",
    baseRouter + "/config/hf",
    jwt,
    controller.config.hf
  ); // header/footer配置
  router.resources(
    "config",
    baseRouter + "/config/right/introduction",
    jwt,
    controller.config.right.introduction
  ); // 右侧配置-个人简介
  router.resources(
    "config",
    baseRouter + "/config/right/ad",
    jwt,
    controller.config.right.ad
  ); // 右侧配置-广告设置
  router.resources(
    "config",
    baseRouter + "/config/right/recommend",
    jwt,
    controller.config.right.recommend
  ); // 右侧配置-推荐设置

  router.resources("resume", baseRouter + "/resume", jwt, controller.resume); // 简历
  router.put(
    baseRouter + "/resume/status/:id",
    jwt,
    controller.resume.updateStatus
  ); // 简历-修改状态

  router.resources("order", baseRouter + "/order", jwt, controller.order); // 订单管理

  // 前台接口
  const webRouter = baseRouter + "/web";

  router.post(webRouter + "/wedding", controller.wedding.create); // 提交祝福语

  router.get(webRouter + "/auth", controller.auth.index); // 微信公众号验证token
  router.post(webRouter + "/auth", controller.auth.replay); // 微信公众号-自动回复消息-自己处理
  // router.post(webRouter + "/auth", controller.auth.weChat); // 微信公众号-自动回复消息-co-wechat库来处理

  router.post(webRouter + "/weChat/createMenu", controller.auth.createMenu); // 微信公众号-创建自定义菜单
  router.get(webRouter + "/weChat/removeMenu", controller.auth.removeMenu); // 微信公众号-删除自定义菜单

  router.post(webRouter + "/weChat/uploadMedia", controller.auth.uploadMedia); // 微信公众号-上传临时素材
  router.get(webRouter + "/weChat/getMedia", controller.auth.getMedia); // 微信公众号-获取临时素材

  router.post(
    webRouter + "/weChat/uploadMaterial",
    controller.auth.uploadMaterial
  ); // 微信公众号-上传永久素材-图片，语音，缩略图
  router.post(
    webRouter + "/weChat/uploadVideoMaterial",
    controller.auth.uploadVideoMaterial
  ); // 微信公众号-上传永久素材-视频
  router.post(
    webRouter + "/weChat/uploadNewsMaterial",
    controller.auth.uploadNewsMaterial
  ); // 微信公众号-上传永久素材-图文

  router.post(
    webRouter + "/weChat/uploadPermanentMaterial",
    controller.auth.uploadPermanentMaterial
  ); // 微信公众号-上传永久素材-上面三个的合体

  router.post(
    webRouter + "/weChat/updateNewsMaterial",
    controller.auth.updateNewsMaterial
  ); // 微信公众号-上传永久素材-图文修改
  router.get(webRouter + "/weChat/getMaterial", controller.auth.getMaterial); // 微信公众号-获取永久素材

  router.get(webRouter + "/signature", controller.auth.signature); // 微信公众号获取signature

  router.get(webRouter + "/home", controller.web.home.index); //首页信息获取
  router.get(webRouter + "/header", controller.web.header.index); //导航栏信息获取

  router.get(webRouter + "/categories", controller.web.categories.index); //分类信息获取
  router.get(
    webRouter + "/categories/details",
    controller.web.categories.details
  ); //分类下的文章列表信息获取

  router.get(webRouter + "/tags", controller.web.tags.index); //标签信息获取
  router.get(webRouter + "/tags/details", controller.web.tags.details); //标签下的文章列表信息获取

  router.get(webRouter + "/about", controller.web.about.index); //关于信息获取
  router.get(webRouter + "/archives", controller.web.archives.index); //归档信息获取

  router.get(webRouter + "/articles", controller.web.articles.index); //文章列表获取
  router.get(webRouter + "/articles/details", controller.web.articles.details); //文章详情获取
  router.post(webRouter + "/articles/keyword", controller.web.articles.keyword); //搜索文章

  router.get(webRouter + "/rightConfig", controller.web.rightConfig.index); //右侧广告，推荐获取

  router.post(webRouter + "/register", controller.web.user.register); //注册
  router.post(webRouter + "/login", controller.web.user.login); //登录
  router.post(webRouter + "/logout", controller.web.user.logout); //退出登录
  router.get(webRouter + "/user", jwt, controller.web.user.info); //获取用户资料
  router.post(webRouter + "/user/update", jwt, controller.web.user.update); //用户资料-修改
  router.get(webRouter + "/captcha", controller.web.user.captcha); // 生成验证码
  router.post(webRouter + "/comment", jwt, controller.web.comment.submit); //提交评论
  router.get(webRouter + "/comment/list", controller.web.comment.list); //评论列表

  router.post(webRouter + "/like", jwt, controller.web.like.submit); //点赞
  router.post(webRouter + "/collect", jwt, controller.web.like.collect); //用户-收藏
  router.get(webRouter + "/collect", jwt, controller.web.like.collectList); //用户-收藏列表
  router.post(
    webRouter + "/collect/cancel",
    jwt,
    controller.web.like.cancelCollect
  ); //用户-取消收藏

  router.post(webRouter + "/upload", jwt, controller.utils.uploadFiles); //pc端文件上传-头像

  router.get(webRouter + "/resume", controller.web.resume.index); //简历列表获取

  router.get(webRouter + "/tkb/category", controller.web.tkb.category); //分类
  router.get(webRouter + "/tkb/image/albums", controller.web.tkb.imageAlbums); //图片种类列表
  router.get(webRouter + "/tkb/image/list", controller.web.tkb.imageList); //图片列表
  router.get(webRouter + "/tkb/image/album", controller.web.tkb.imageAlbum); //图片种类详情

  router.get(webRouter + "/tkb/novel/list", controller.web.tkb.novelList); //小说列表
  router.get(
    webRouter + "/tkb/novel/chapters",
    controller.web.tkb.novelChapters
  ); //小说种类类别
  router.get(webRouter + "/tkb/novel", controller.web.tkb.novel); //小说内容

  router.get(webRouter + "/tkb/star/list", controller.web.tkb.starList); //明星分类列表
  router.get(webRouter + "/tkb/star/get", controller.web.tkb.starGet); //明星简介
  router.get(webRouter + "/tkb/v/list", controller.web.tkb.vList); //明星作品列表
  router.get(webRouter + "/tkb/v/get", controller.web.tkb.vGet); //明星作品详情
  router.get(
    webRouter + "/tkb/v/list/similar",
    controller.web.tkb.vListSimilar
  ); //明星作品列表-相似推荐

  router.get(webRouter + "/tkb/labels", controller.web.tkb.mLabels); //视频标签

  // github登录挂载鉴权路由
  const github = app.passport.authenticate("github", {
    successRedirect: "/articles", // 指定鉴权成功后的 redirect 地址
  });

  // 前端直接 <a href="/api/v1/web/github/login">Github登录</a> 即可跳转到Github登录页面
  router.get(webRouter + "/github/login", github);

  // 授权后回调地址
  // 需要和 Authorization callback URL 一致：
  // 本地：http://localhost:8090/api/v1/web/github/callback
  // 线上：http://nevergiveupt.top/api/v1/web/github/callback
  router.get(webRouter + "/github/callback", github);
};
