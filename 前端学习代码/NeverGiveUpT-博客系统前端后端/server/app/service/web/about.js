const Service = require("egg").Service;

class AboutService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async index() {
    const { ctx } = this;
    const res = await ctx.model.About.findOne();
    return {
      msg: "关于信息获取成功",
      data: res,
    };
  }
}

module.exports = AboutService;
