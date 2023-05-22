const Service = require("egg").Service;

class RightAdService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async index() {
    const { ctx } = this;
    const res = await ctx.model.Config.Right.Ad.findOne();
    return {
      msg: `广告设置获取成功`,
      data: res,
    };
  }

  async create(params) {
    const { ctx } = this;
    const data = {
      ...params,
      createTime: ctx.helper.moment().unix(),
    };

    const oldRightAdCount = await ctx.model.Config.Right.Ad.find(
      {}
    ).countDocuments();

    if (oldRightAdCount === 0) {
      const res = await ctx.model.Config.Right.Ad.create(data);
      return {
        msg: "广告设置添加成功",
        data: res,
      };
    } else {
      return {
        msg: "广告设置已存在",
      };
    }
  }

  async update(params) {
    const { ctx } = this;

    const oldRightAd = await ctx.model.Config.Right.Ad.findOne(
      {
        _id: params.id,
      }
    );

    if (oldRightAd) {
      const updateData = {
        ...params,
        createTime: oldRightAd.createTime,
        updateTime: ctx.helper.moment().unix(),
      };
      const res = await ctx.model.Config.Right.Ad.findByIdAndUpdate(
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
        msg: "广告设置修改成功",
        data: res,
      };
    } else {
      return {
        msg: "广告设置不存在",
      };
    }
  }
}

module.exports = RightAdService;
