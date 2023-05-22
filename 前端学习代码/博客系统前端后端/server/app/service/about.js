const Service = require("egg").Service;

class AboutService extends Service {
  async index() {
    const { ctx } = this;
    const data = await ctx.model.About.findOne();
    return {
      msg: "关于信息获取成功",
      data,
    };
  }
  async create(params) {
    const { ctx } = this;

    const totalCount = await ctx.model.About.find().countDocuments();
    if (totalCount === 0) {
      const data = {
        ...params,
        createTime: ctx.helper.moment().unix(),
      };
      const res = await ctx.model.About.create(data);
      return {
        msg: "关于信息添加成功",
        data: res,
      };
    } else {
      return {
        msg: "关于信息已存在",
      };
    }
  }

  async update(params) {
    const { ctx } = this;

    const oldAbout = await ctx.model.About.findOne({ _id: params.id });

    if (oldAbout) {
      const updateData = {
        ...params,
        createTime: oldAbout.createTime, // 不传是否会改掉？ 1642774039
        updateTime: ctx.helper.moment().unix(),
      };
      const res = await ctx.model.About.findByIdAndUpdate(
        {
          _id: params.id,
        },
        updateData,
        {
          new: true, // 返回修改后的数据
          runValidators: true, // 执行Validaton验证
        }
      );
      return {
        msg: "关于信息修改成功",
        data: res,
      };
    } else {
      return {
        msg: "关于信息不存在",
      };
    }
  }
}

module.exports = AboutService;
