const Service = require("egg").Service;

class OrderService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  // 标签列表
  async index(params) {
    const { ctx, app } = this;
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;
    params = ctx.helper.filterEmptyField(params);

    const queryCon = params.source ?
    {
      source: {
        $regex: new RegExp(params.source, 'i')
      },
    } :
    {};

    const totalCount = await ctx.model.Order.find({}).countDocuments();
    const data = await ctx.model.Order.find(queryCon)
      .sort({
        status: 1,
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
      msg: "订单列表获取成功",
    };
  }

  // 添加
  async create(params) {
    const { ctx } = this;
    const oldOrder = await ctx.model.Order.findOne({
      fileName: params.fileName,
    });
    if (oldOrder) {
      return {
        msg: "该项目已存在",
      };
    }
    const data = {
      ...params,
      createTime: ctx.helper.moment().unix(),
    };
    const res = await ctx.model.Order.create(data);
    return {
      msg: "订单添加成功",
      data: res,
    };
  }

  // 删除
  async destroy(id) {
    const { ctx } = this;

    const oldTags = await ctx.model.Order.findOne({
      _id: id,
    });
    if (!oldTags) {
      return {
        msg: "订单不存在",
      };
    }

    await ctx.model.Order.deleteOne({
      _id: id,
    });
    return {
      msg: "订单删除成功",
    };
  }

  // 修改
  async update(params) {
    const { ctx } = this;

    const oldIdOrder = await ctx.model.Order.findOne({
      _id: params.id,
    });

    if (!oldIdOrder) {
      return {
        msg: "订单不存在",
      };
    }

    const updateData = {
      createTime: oldIdOrder.createTime,
      updateTime: ctx.helper.moment().unix(),
      ...params,
    };
    await ctx.model.Order.updateOne(
      {
        _id: params.id,
      },
      updateData
    );
    return {
      msg: "订单修改成功",
    };
  }
}

module.exports = OrderService;
