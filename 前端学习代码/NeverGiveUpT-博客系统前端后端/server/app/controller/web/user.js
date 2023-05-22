const Controller = require("egg").Controller;
const svgCaptcha = require("svg-captcha");

class UserController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createRule = {
      email: {
        type: "string",
        format: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
      },
      password: {
        type: "password",
        format: /^[a-zA-Z]\w{5,19}$/,
      },
      nickName: {
        type: "string",
        required: false,
        max: 20,
      },
      introduction: {
        type: "string",
        required: false,
        max: 1000,
      },
    };
  }
  async register() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    if (ctx.session.captcha !== data.captcha) {
      ctx.helper.success({
        ctx,
        res: {
          msg: "验证码错误",
        },
      });
      return;
    }
    const res = await service.web.user.register(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async login() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    if (ctx.session.captcha !== data.captcha) {
      ctx.helper.success({
        ctx,
        res: {
          msg: "验证码错误",
        },
      });
      return;
    }
    const res = await service.web.user.login(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async logout() {
    const { ctx, service } = this;
    const res = await service.web.user.logout();
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async captcha() {
    const { ctx } = this;
    const captchaObj = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 50,
      background: "#eceff1",
    });
    ctx.session.captcha = captchaObj.text;
    ctx.set("Content-Type", "image/svg+xml");
    ctx.body = captchaObj.data;
  }

  async info() {
    const { ctx, service } = this;
    const params = ctx.request.query;
    const res = await service.web.user.info(params);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const res = await service.web.user.update(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = UserController;
