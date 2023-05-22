const Service = require("egg").Service;

class ResumeService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async index() {
    const { ctx } = this;
    const data = await ctx.model.Resume.find({
      status: true,
    }).sort({ createTime: 1 });
    return {
      data: {
        list: data,
      },
      msg: "简历列表获取成功",
    };
  }
}

module.exports = ResumeService;
