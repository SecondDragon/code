const Service = require("egg").Service;

class HeaderService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async index() {
    const { ctx } = this;
    const res = await ctx.model.Config.Hf.findOne();
    if (res) {
      if (res.header.menu && res.header.menu.length > 0) {
        res.header.menu = res.header.menu.sort((a, b) => a.sort - b.sort);
      }
    }
    return {
      msg: "Header/Footer配置信息获取成功",
      data: res,
    };
  }
}

module.exports = HeaderService;
