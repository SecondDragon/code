const Service = require("egg").Service;

class AdminService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  // 管理员登录
  async adminLogin(params) {
    const { ctx, app } = this;

    const oldUser = await ctx.model.Admin.findOne({
      userName: params.userName,
    });

    if (!oldUser) {
      return {
        msg: "用户不存在",
      };
    }
    const isMatch = await ctx.helper.comparePassword(
      params.password,
      oldUser.password
    );
    if (!isMatch) {
      return {
        msg: "用户名或密码错误",
      };
    }

    //生成token
    const token = app.jwt.sign(
      {
        ...oldUser,
        // userName: oldUser.userName,
      },

      app.config.jwt.secret,
      {
        expiresIn: "1h",
      }
    );

    //登录成功后设置cookie
    ctx.cookies.set("token", token, {
      maxAge: 86400000, //一天过期时间
      httpOnly: true, //是否只是服务器可访问 cookie, 默认是 true
    });

    return {
      data: {
        token,
        userName: oldUser.userName,
      },
      msg: "登录成功",
    };
  }

  async adminLogout() {
    const { ctx } = this;
    ctx.cookies.set("token", "", {
      maxAge: 0, //清除cookie
    });
    return {
      msg: "退出登录成功",
    };
  }
}

module.exports = AdminService;
