const Service = require("egg").Service;

class CategoriesService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  // 分类列表
  async index(params) {
    const { ctx, app } = this;

    const page = params.page * 1;
    const pageSize = params.pageSize * 1;
    params = ctx.helper.filterEmptyField(params);


    const queryCon = params.name
      ? {
          name: { $regex: new RegExp(params.name, "i") },
        }
      : {};
    const totalCount = await ctx.model.Categories.find(queryCon).countDocuments();
    const data = await ctx.model.Categories.find(queryCon)
      .sort({ createTime: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return {
      data: {
        page,
        pageSize,
        totalCount,
        list: data,
      },
      msg: "分类列表获取成功",
    };
  }

  // 添加分类
  async create(params) {
    const { ctx } = this;
    const oldCategories = await ctx.model.Categories.findOne({
      name: params.name,
    });
    if (oldCategories) {
      return {
        msg: "该分类已存在",
      };
    }
    const data = {
      ...params,
      createTime: ctx.helper.moment().unix(),
    };
    const res = await ctx.model.Categories.create(data);
    return {
      msg: "分类添加成功",
      data: res,
    };
  }

  // 删除分类
  async destroy(id) {
    const { ctx } = this;

    const oldCategories = await ctx.model.Categories.findOne({
      _id: id,
    });
    if (!oldCategories) {
      return {
        msg: "分类不存在",
      };
    }

    await ctx.model.Categories.deleteOne({
      _id: id,
    });
    return {
      msg: "分类删除成功",
    };
  }

  // 修改分类
  async update(params) {
    const { ctx } = this;

    const oldIdCategories = await ctx.model.Categories.findOne({
      _id: params.id,
    });

    if (oldIdCategories) {
      // 这里查询是因为可以修改不同id的数据为相同的name，需要通过name判断是否已经存在相同的name
      const oldNameCategories = await ctx.model.Categories.findOne({
        name: params.name,
      });
      if (oldNameCategories) {
        return {
          msg: "分类已存在，请重新修改",
        };
      }
    } else {
      return {
        msg: "分类不存在",
      };
    }

    const updateData = {
      createTime: oldIdCategories.createTime,
      updateTime: ctx.helper.moment().unix(),
      name: params.name,
    };
    await ctx.model.Categories.updateOne(
      {
        _id: params.id,
      },
      updateData
    );
    return {
      msg: "分类修改成功",
    };
  }
}

module.exports = CategoriesService;
