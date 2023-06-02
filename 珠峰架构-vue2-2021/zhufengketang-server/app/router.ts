import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  // 用户相关
  router.post('/user/login', controller.user.login.index);
  router.get('/user/validate', controller.user.login.validate);

  router.post('/user/reg', controller.user.reg.index);
  router.post('/user/reset', controller.user.reset.index);

  // 轮播图数据 
  router.get('/api/slider',controller.api.slider.index)
  router.get('/api/lessonList/:id',controller.api.lessonList.index)

};
