const Service = require("egg").Service;

class HfService extends Service {
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

  async create(params) {
    const { ctx } = this;
    const data = {
      ...params,
      createTime: ctx.helper.moment().unix(),
    };
    const oldHfCount = await ctx.model.Config.Hf.find({}).countDocuments();
    if (oldHfCount === 0) {
      const res = await ctx.model.Config.Hf.create(data);
      return {
        msg: "Header/Footer配置信息添加成功",
        data: res,
      };
    } else {
      return {
        msg: "Header/Footer配置信息已存在",
      };
    }
  }

  async update(params) {
    const { ctx } = this;

    const oldHf = await ctx.model.Config.Hf.findOne({
      _id: params.id,
    });
    if (oldHf) {
      const updateData = {
        ...params,
        createTime: oldHf.createTime,
        updateTime: ctx.helper.moment().unix(),
      };
      const res = await ctx.model.Config.Hf.findByIdAndUpdate(
        {
          _id: params.id,
        },
        updateData,
        {
          new: true, // 返回修改后的数据。
          runValidators: true, //如果值为true，执行Validation验证。
        }
      );
      return {
        msg: "Header/Footer配置信息修改成功",
        data: res,
      };
    } else {
      return {
        msg: "Header/Footer配置信息不存在",
      };
    }
  }
}

module.exports = HfService;
