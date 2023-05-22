const Service = require('egg').Service;

class TagsService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  // 标签列表
  async index(params) {
    const { ctx, app } = this;
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;
    params = ctx.helper.filterEmptyField(params);

    const queryCon = params.name
      ? {
          name: {
            $regex: new RegExp(params.name, 'i'),
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
      msg: '标签列表获取成功',
    };
  }

  // 添加标签
  async create(params) {
    const { ctx } = this;
    const oldTags = await ctx.model.Tags.findOne({
      name: params.name,
    });
    if (oldTags) {
      return {
        msg: '该标签已存在',
      };
    }
    const data = {
      ...params,
      createTime: ctx.helper.moment().unix(),
    };
    const res = await ctx.model.Tags.create(data);
    return {
      msg: '标签添加成功',
      data: res,
    };
  }

  // 删除标签
  async destroy(id) {
    const { ctx } = this;

    const oldTags = await ctx.model.Tags.findOne({
      _id: id,
    });
    if (!oldTags) {
      return {
        msg: '标签不存在',
      };
    }

    await ctx.model.Tags.deleteOne({
      _id: id,
    });
    return {
      msg: '标签删除成功',
    };
  }

  // 修改标签
  async update(params) {
    const { ctx } = this;

    const oldIdTags = await ctx.model.Tags.findOne({
      _id: params.id,
    });

    if (oldIdTags) {
      // 这里查询是因为可以修改不同id的数据为相同的name，需要通过name判断是否已经存在相同的name
      const oldNameTags = await ctx.model.Tags.findOne({
        name: params.name,
      });
      if (oldNameTags) {
        return {
          msg: '标签已存在，请重新修改',
        };
      }
    } else {
      return {
        msg: '标签不存在',
      };
    }

    const updateData = {
      createTime: oldIdTags.createTime,
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
      msg: '标签修改成功',
    };
  }

  async updateStatus(params) {
    const { ctx } = this;

    const oldIdTags = await ctx.model.Tags.findOne({
      _id: params.id,
    });

    if (!oldIdTags) {
      return {
        msg: '标签不存在',
      };
    }

    const updateData = {
      status: params.status,
    };
    await ctx.model.Tags.updateOne(
      {
        _id: params.id,
      },
      updateData
    );
    return {
      msg: `标签${params.status ? '启用' : '停用'}成功`,
    };
  }
}

module.exports = TagsService;
