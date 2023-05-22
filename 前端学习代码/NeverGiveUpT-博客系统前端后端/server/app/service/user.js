const Service = require("egg").Service;

class UserService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async index(params) {
    const { ctx, app } = this;
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;
    params = ctx.helper.filterEmptyField(params);

    const queryCon = params.nickName
      ? {
          nickName: { $regex: new RegExp(params.nickName,'i') },
        }
      : {};

    const totalCount = await ctx.model.User.find(queryCon).countDocuments();
    const data = await ctx.model.User.find(queryCon)
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
      msg: "用户列表获取成功",
    };
  }

  async destroy(id) {
    const { ctx } = this;

    const oldUser = await ctx.model.User.findOne({
      _id: id,
    });
    if (!oldUser) {
      return {
        msg: "用户不存在",
      };
    }

    await ctx.model.User.deleteOne({
      _id: id,
    });
    return {
      msg: "用户删除成功",
    };
  }
}

module.exports = UserService;
