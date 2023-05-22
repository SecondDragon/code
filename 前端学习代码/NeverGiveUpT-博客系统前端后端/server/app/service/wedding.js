const Service = require("egg").Service;

class WeddingService extends Service {
  constructor(ctx) {
    super(ctx);
  }

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
    if (params.type) {
      queryCon.type = params.type;
    }
    const totalCount = await ctx.model.Wedding.find(queryCon).countDocuments();
    const data = await ctx.model.Wedding.find(queryCon)
      .sort({ loginTime: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return {
      data: {
        page,
        pageSize,
        totalCount,
        list: data,
      },
      msg: "祝福语列表获取成功",
    };
  }

  async create(params) {
    const { ctx } = this;
    const oldWedding = await ctx.model.Wedding.findOne({
      phone: params.phone,
    });
    if (oldWedding) {
      return {
        msg: "该手机号已发送过祝福了",
      };
    }
    const data = {
      ...params,
      createTime: ctx.helper.moment().unix(),
    };
    const res = await ctx.model.Wedding.create(data);
    return {
      msg: "祝福送成功了",
      data: res,
    };
  }
}

module.exports = WeddingService;
