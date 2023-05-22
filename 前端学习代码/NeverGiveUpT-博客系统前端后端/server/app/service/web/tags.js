const Service = require("egg").Service;

class TagsService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  // 标签列表
  async index() {
    const { ctx } = this;
    const data = await ctx.model.Tags.find({
      status: true,
    }).sort({ createTime: 1 });
    const bg = await ctx.model.Config.Home.findOne();
    return {
      data: {
        list: data,
        tagsBgImg: bg.tagsBgImg,
      },
      msg: "标签列表获取成功",
    };
  }

  async details(params) {
    const { ctx } = this;
    const id = params.id; // 标签id

    const page = params.page * 1;
    const pageSize = params.pageSize * 1;

    const data = await ctx.model.Tags.findOne({
      _id: id,
    });

    const queryCon = {
      publishStatus: 1,
      status: 1,
      tags: { $elemMatch: { $eq: data.name } }, // 查询tags数组中 为 data.name的标签
    };
    const totalCount = await ctx.model.Articles.find(queryCon).countDocuments();
    const bg = await ctx.model.Config.Home.findOne();

    let list = await ctx.model.Articles.find(queryCon)
      .sort({
        createTime: -1,
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    list = list
      ? list.map((item) => {
          return {
            title: item.title,
            createTime: item.createTime,
            id: item._id,
          };
        })
      : [];

    return {
      data: {
        page,
        pageSize,
        totalCount,
        name: data.name,
        list,
        tagsDetailBgImg: bg.tagsDetailBgImg,
      },
      msg: "标签-文章列表获取成功",
    };
  }
}

module.exports = TagsService;
