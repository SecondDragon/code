const Service = require("egg").Service;

class UserService extends Service {
  constructor(ctx) {
    super(ctx);
  }
  async register(params) {
    const { ctx, app } = this;
    const { nickName, email } = params;

    const emailRes = await ctx.model.User.findOne({
      email,
    });
    if (emailRes) {
      return {
        msg: "该Email已经存在",
      };
    }

    if (nickName) {
      const nickNameRes = await ctx.model.User.findOne({
        nickName,
      });

      if (nickNameRes) {
        return {
          msg: "该昵称已经存在",
        };
      }
    }

    const data = {
      ...params,
      registerTime: ctx.helper.moment().unix(),
    };

    await ctx.model.User.create(data);

    //生成token
    const token = app.jwt.sign(
      {
        email,
      },
      app.config.jwt.secret
    );

    //注册成功后设置cookie-直接登录
    ctx.cookies.set("token", token, {
      maxAge: 86400000, //一天过期时间
      httpOnly: true, //是否只是服务器可访问 cookie, 默认是 true
    });

    return {
      msg: "注册成功",
      data: {
        token,
        email,
        nickName,
        avatar: params.avatar || app.config.defaultUserAvatar,
      },
    };
  }

  async login(params) {
    const { ctx, app } = this;
    const { email, password } = params;
    // 这里是昵称或email搜索，前端传递字段为email
    // const queryCon = {
    //   $or: [{ nickName: email }, { email: email }],
    // };

    // 2021-1-26修改为只能用email登录
    const queryCon = {
      email,
    };

    const queryRes = await ctx.model.User.findOne(queryCon);
    if (!queryRes) {
      return {
        msg: "Email不存在",
      };
    }

    const passwordRes = await ctx.model.User.findOne({
      ...queryCon,
      password,
    });
    if (!passwordRes) {
      return {
        msg: "Email或密码错误",
      };
    }

    //生成token
    const token = app.jwt.sign(
      {
        email,
      },
      app.config.jwt.secret
    );

    //登录成功后设置cookie
    ctx.cookies.set("token", token, {
      maxAge: 86400000, //一天过期时间
      httpOnly: true, //是否只是服务器可访问 cookie, 默认是 true
    });

    return {
      msg: "登录成功",
      data: {
        email,
        token,
        nickName: passwordRes.nickName,
        avatar: passwordRes.avatar || app.config.defaultUserAvatar,
      },
    };
  }
  async logout() {
    const { ctx } = this;
    ctx.cookies.set("token", "", {
      maxAge: 0, //清除cookie
    });
    ctx.logout(); // github登录的用户退出登录时调用这个即可将用户信息从 session 中清除
    return {
      msg: "退出登录成功",
    };
  }

  async info(params) {
    const { ctx, app } = this;
    const { email } = params;
    const queryRes = await ctx.model.User.findOne({
      email,
    });
    if (!queryRes) {
      return {
        status: 402,
        msg: "不存在该用户",
      };
    }
    return {
      data: {
        avatar: queryRes.avatar || app.config.defaultUserAvatar,
        email: queryRes.email,
        introduction: queryRes.introduction,
        nickName: queryRes.nickName,
      },
      msg: "查询用户成功",
    };
  }

  async update(params) {
    const { ctx } = this;

    const oldUser = await ctx.model.User.findOne({
      email: params.email,
    });

    if (!oldUser) {
      return {
        status: 402,
        msg: "不存在该用户",
      };
    }
    const updateData = {
      nickName: params.nickName,
      avatar: params.avatar,
      introduction: params.introduction,
      password: params.password || oldUser.password,
    };

    await ctx.model.User.updateOne(
      {
        email: params.email,
      },
      updateData
    );

    // 更新头像则同时将评论的头像给更新了
    await ctx.model.Comment.updateMany(
      {
        email: params.email,
      },
      {
        avatar: params.avatar,
      }
    );
    return {
      msg: `修改成功`,
    };
  }
}

module.exports = UserService;
