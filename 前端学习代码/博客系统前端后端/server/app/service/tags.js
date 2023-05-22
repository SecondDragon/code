const Service = require("egg").Service;

class TagsService extends Service {
  async index(params) {
    const { ctx } = this;
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;

    params = ctx.helper.filterEmptyField(params);
    console.log('params',params)

    // name 是模糊匹配
    const queryCon = params.name
      ? {
          name: {
            $regex: new RegExp(params.name, "i"),
          },
        }
      : {};

    const totalCount = await ctx.model.Tags.find(queryCon).countDocuments();

    const data = await ctx.model.Tags.find(queryCon)
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
    const oldTags = await ctx.model.Tags.findOne({
      name: params.name,
    });
    if (oldTags) {
      return {
        msg: "该标签已存在",
      };
    }

    const data = {
      ...params,
      createTime: ctx.helper.moment().unix(),
    };

    const res = await ctx.model.Tags.create(data);
    return {
      msg: "标签添加成功",
      data: res,
    };
  }

  async update(params) {
    const { ctx } = this;

    const oldTags = await ctx.model.Tags.findOne({ _id: params.id });
    if (oldTags) {
      const oldNameTags = await ctx.model.Tags.findOne({ name: params.name });
      if (oldNameTags) {
        return {
          msg: "标签已存在，请重新修改",
        };
      }
    }

    const updateData = {
      // createTime: oldTags.createTime, // 不传是否会改掉？ 1642774039
      updateTime: ctx.helper.moment().unix(),
      name: params.name,
    };
    await ctx.model.Tags.updateOne(
      {
        _id: params.id,
      },
      updateData
    );
    return {
      msg: "标签修改成功",
    };
  }

  async destroy(id) {
    const { ctx } = this;
    const oldTags = await ctx.model.Tags.findOne({ _id: id });
    if (!oldTags) {
      return {
        msg: "标签不存在",
      };
    }
    await ctx.model.Tags.deleteOne({ _id: id });
    return {
      msg: "标签删除成功",
    };
  }

  async updateStatus(params) {
    const { ctx } = this;
    const oldTags = await ctx.model.Tags.findOne({ _id: params.id });
    if (!oldTags) {
      return {
        msg: "标签不存在",
      };
    }

    await ctx.model.Tags.updateOne(
      {
        _id: params.id,
      },
      {
        status: params.status,
      }
    );
    return {
      msg: `标签${params.status ? "启用" : "停用"}成功`,
    };
  }
}

module.exports = TagsService;
