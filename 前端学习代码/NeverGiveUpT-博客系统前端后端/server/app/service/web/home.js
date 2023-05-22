const Service = require("egg").Service;

class HomeService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async index() {
    const { ctx } = this;
    const res = await ctx.model.Config.Home.findOne();
    return {
      msg: "首页配置信息获取成功",
      data: res,
    };
  }
}

module.exports = HomeService;
