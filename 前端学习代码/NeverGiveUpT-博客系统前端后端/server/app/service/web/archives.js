const Service = require("egg").Service;

class ArchivesService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async index() {
    const { ctx } = this;
    const data = await ctx.model.Articles.find({
      status: 1,
      publishStatus: 1,
    }).sort({ createTime: -1 });
    const bg = await ctx.model.Config.Home.findOne();

    return {
      msg: "归档信息获取成功",
      data: {
        list: data,
        archiveBgImg: bg.archiveBgImg,
      },
    };
  }
}

module.exports = ArchivesService;
