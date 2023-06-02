'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 用户相关的操作
  router.post('/api/login',controller.user.login);
  router.post('/api/reg',controller.user.reg);

  router.resources('article','/api/article',controller.article)
};
