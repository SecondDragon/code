const Service = require("egg").Service;

class ResumeService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async index(params) {
    const { ctx, app } = this;
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;
    params = ctx.helper.filterEmptyField(params);

    const totalCount = await ctx.model.Resume.find({}).countDocuments();
    const data = await ctx.model.Resume.find({})
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
      msg: "简历列表获取成功",
    };
  }

  async create(params) {
    const { ctx } = this;
    const oldResume = await ctx.model.Resume.findOne({
      name: params.name,
    });
    if (oldResume) {
      return {
        msg: "该简历已存在",
      };
    }
    if (params.experiences) {
      params.experiences.sort((a, b) => b.startTime - a.startTime);
    }
    if (params.projectExp) {
      params.projectExp.sort((a, b) => b.startTime - a.startTime);
    }
    const data = {
      ...params,
      createTime: ctx.helper.moment().unix(),
    };
    const res = await ctx.model.Resume.create(data);
    return {
      msg: "简历添加成功",
      data: res,
    };
  }

  async destroy(id) {
    const { ctx } = this;

    const oldResume = await ctx.model.Resume.findOne({
      _id: id,
    });
    if (!oldResume) {
      return {
        msg: "简历不存在",
      };
    }

    await ctx.model.Resume.deleteOne({
      _id: id,
    });
    return {
      msg: "简历删除成功",
    };
  }

  async update(params) {
    const { ctx } = this;

    const oldIdResume = await ctx.model.Resume.findOne({
      _id: params.id,
    });

    if (!oldIdResume) {
      return {
        msg: "简历不存在",
      };
    }
    if (params.experiences) {
      params.experiences.sort((a, b) => b.startTime - a.startTime);
    }
    if (params.projectExp) {
      params.projectExp.sort((a, b) => b.startTime - a.startTime);
    }
    const updateData = {
      ...params,
      createTime: oldIdResume.createTime,
      updateTime: ctx.helper.moment().unix(),
    };
    await ctx.model.Resume.updateOne(
      {
        _id: params.id,
      },
      updateData
    );
    return {
      msg: "简历修改成功",
    };
  }

  async edit(id) {
    const { ctx } = this;
    const oldResume = await ctx.model.Resume.findOne({
      _id: id,
    });
    if (!oldResume) {
      return {
        msg: "简历不存在",
      };
    }

    return {
      msg: "简历详情获取成功",
      data: oldResume,
    };
  }

  async updateStatus(params) {
    const { ctx } = this;

    const oldIdResume = await ctx.model.Resume.findOne({
      _id: params.id,
    });

    if (!oldIdResume) {
      return {
        msg: "简历不存在",
      };
    }

    const updateData = {
      status: params.status,
    };
    await ctx.model.Resume.updateOne(
      {
        _id: params.id,
      },
      updateData
    );
    return {
      msg: `简历${params.status ? "启用" : "停用"}成功`,
    };
  }
}

module.exports = ResumeService;
