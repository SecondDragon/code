"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, jwt } = app;
  const baseRouter = app.config.baseRouter; // /api/v1
  // 前台 /web

  router.post(
    baseRouter + "/upload",
    jwt,
    controller.utils.uploadFiles
  ); // 上传文件到七牛云

  router.post(baseRouter + "/admin/login", controller.admin.adminLogin);
  router.post(baseRouter + "/admin/logout", controller.admin.adminLogout);

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
  ); // 启用，停用
  router.put(
    baseRouter + "/articles/publishStatus/:id",
    jwt,
    controller.articles.changePublishStatus
  ); // 修改发布状态

  router.post(
    baseRouter + "/articles/collectStatus",
    jwt,
    controller.articles.changeCollectStatus
  ); // 一键开启或关闭收藏

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
  );
  router.resources("about", baseRouter + "/about", jwt, controller.about); // 关于
  router.resources("user", baseRouter + "/user", jwt, controller.user); // 用户管理
  router.resources("comment", baseRouter + "/comment", jwt, controller.comment); // 评论管理
  router.resources(
    "home",
    baseRouter + "/config/home",
    jwt,
    controller.config.home
  ); // 网页配置-首页配置
  router.resources("hf", baseRouter + "/config/hf", jwt, controller.config.hf); // 网页配置-Header/Footer配置
  router.resources(
    "right_introduction",
    baseRouter + "/config/right/introduction",
    jwt,
    controller.config.right.introduction
  ); // 网页配置-侧栏配置-个人简介

  router.resources(
    "right_ad",
    baseRouter + "/config/right/ad",
    jwt,
    controller.config.right.ad
  ); // 网页配置-侧栏配置-广告设置

  router.resources(
    "right_recommend",
    baseRouter + "/config/right/recommend",
    jwt,
    controller.config.right.recommend
  ); // 网页配置-侧栏配置-推荐设置
};

// model -> router -> controller -> service -> model
// 数据库 mySql mongodb  模型 Model
// user
// name sex age job
