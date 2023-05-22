"use strict";

module.exports = (app) => {
  // 校验github用户登录信息（包括首次以及多次登录的处理）
  app.passport.verify(async (ctx, user) => {
    // user即为github提供的用户信息
    const existsUser = await ctx.model.User.findOne({
      uid: user.id,
    });
    if (existsUser) {
      return existsUser;
    }

    // 首次github登录，调用 service 注册新用户
    const data = {
      nickName: user.name,
      password: app.config.passportGithubPassword, // github登录用户统一初始化密码，在进入系统后强制修改密码
      email: user.profile._json.email,
      provider: user.provider,
      uid: user.id,
      avatar: user.photo,
      introduction: user.profile._json.bio,
      registerTime: ctx.helper.moment().unix(),
    };
    const newUser = await ctx.model.User.create(data);

    return newUser;
  });
};
