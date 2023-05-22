const Service = require("egg").Service;

class CategoriesService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  // 分类列表
  async index() {
    const { ctx } = this;
    const data = await ctx.model.Categories.find().sort({ createTime: 1 });
    const bg = await ctx.model.Config.Home.findOne();

    return {
      data: {
        list: data,
        categoriesBgImg: bg.categoriesBgImg,
      },
      msg: "分类列表获取成功",
    };
  }

  async details(params) {
    const { ctx } = this;
    const id = params.id; // 分类id

    const page = params.page * 1;
    const pageSize = params.pageSize * 1;

    const data = await ctx.model.Categories.findOne({
      _id: id,
    });

    const queryCon = {
      categories: data.name,
      status: 1,
      publishStatus: 1,
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
        categoriesDetailBgImg: bg.categoriesDetailBgImg,
      },
      msg: "分类-文章列表获取成功",
    };
  }
}

module.exports = CategoriesService;
