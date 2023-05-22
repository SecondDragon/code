const Service = require("egg").Service;

class RightRecommendService extends Service {
  async index(params) {
    const { ctx } = this;
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;

    params = ctx.helper.filterEmptyField(params);
    console.log("params", params);
    const queryCon = params.project ? { project: params.project } : {};
    const totalCount = await ctx.model.Tags.find(queryCon).countDocuments();

    const data = await ctx.model.Config.Right.Recommend.find(queryCon)
      .sort({
        createTime: -1,
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    return {
      data: {
        page,
        pageSize,
        totalCount,
        list: data,
      },
    };
  }
  async create(params) {
    const { ctx } = this;
    const totalCount = await ctx.model.Config.Right.Recommend.find({
      name: params.name,
    }).countDocuments();
    if (totalCount === 0) {
      const data = {
        ...params,
        createTime: ctx.helper.moment().unix(),
      };
      const res = await ctx.model.Config.Right.Recommend.create(data);
      return {
        msg: "推荐设置配置信息添加成功",
        data: res,
      };
    } else {
      return {
        msg: "推荐设置配置信息已存在",
      };
    }
  }

  async update(params) {
    const { ctx } = this;

    const oldHf = await ctx.model.Config.Right.Recommend.findOne({
      _id: params.id,
    });

    if (oldHf) {
      const updateData = {
        ...params,
        createTime: oldHf.createTime, // 不传是否会改掉？ 1642774039
        updateTime: ctx.helper.moment().unix(),
      };
      const res = await ctx.model.Config.Right.Recommend.findByIdAndUpdate(
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
        msg: "推荐设置配置信息修改成功",
        data: res,
      };
    } else {
      return {
        msg: "推荐设置配置信息不存在",
      };
    }
  }

  async destroy(id) {
    const { ctx } = this;
    const oldTags = await ctx.model.Config.Right.Recommend.findOne({ _id: id });
    if (!oldTags) {
      return {
        msg: "推荐设置不存在",
      };
    }
    await ctx.model.Config.Right.Recommend.deleteOne({ _id: id });
    return {
      msg: "推荐设置删除成功",
    };
  }
}

module.exports = RightRecommendService;
