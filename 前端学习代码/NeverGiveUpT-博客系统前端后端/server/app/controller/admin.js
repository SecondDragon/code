const Controller = require("egg").Controller;

class AdminController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createRule = {
      userName: {
        type: "string",
        format: /^[\u4E00-\u9FA5A-Za-z0-9_]{5,20}$/,
        min: 5,
        max: 20,
      },
      password: {
        type: "password",
        format: /^[A-Za-z0-9_]{6,20}$/,
        min: 6,
        max: 20,
      },
    };
  }
  async adminLogin() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    const res = await service.admin.adminLogin(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async adminLogout() {
    const { ctx, service } = this;
    const res = await service.admin.adminLogout();
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = AdminController;
