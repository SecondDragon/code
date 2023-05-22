const Service = require("egg").Service;

class RightIntroductionService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async index() {
    const { ctx } = this;
    const res = await ctx.model.Config.Right.Introduction.findOne();
    return {
      msg: `个人简介获取成功`,
      data: res,
    };
  }

  async create(params) {
    const { ctx } = this;
    const data = {
      ...params,
      createTime: ctx.helper.moment().unix(),
    };

    const oldRightIntroductionCount = await ctx.model.Config.Right.Introduction.find(
      {}
    ).countDocuments();

    if (oldRightIntroductionCount === 0) {
      const res = await ctx.model.Config.Right.Introduction.create(data);
      return {
        msg: "个人简介添加成功",
        data: res,
      };
    } else {
      return {
        msg: "个人简介已存在",
      };
    }
  }

  async update(params) {
    const { ctx } = this;

    const oldRightIntroduction = await ctx.model.Config.Right.Introduction.findOne(
      {
        _id: params.id,
      }
    );

    if (oldRightIntroduction) {
      const updateData = {
        ...params,
        createTime: oldRightIntroduction.createTime,
        updateTime: ctx.helper.moment().unix(),
      };
      const res = await ctx.model.Config.Right.Introduction.findByIdAndUpdate(
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
        msg: "个人简介修改成功",
        data: res,
      };
    } else {
      return {
        msg: "个人简介不存在",
      };
    }
  }
}

module.exports = RightIntroductionService;
