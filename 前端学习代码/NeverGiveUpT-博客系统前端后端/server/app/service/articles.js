const Service = require("egg").Service;

class ArticlesService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  // 更新分类下的文章数量
  async updateCategoriesArticleNum() {
    const { ctx } = this;
    const categories = await ctx.model.Categories.find(); // 查出所有分类
    if (categories && categories.length > 0) {
      categories.forEach(async (item) => {
        const articleNum = await ctx.model.Articles.find({
          categories: item.name,
          status: 1,
          publishStatus: 1,
        }).countDocuments();
        await ctx.model.Categories.update(
          {
            name: item.name,
          },
          {
            articleNum,
          }
        );
      });
    }
  }

  // 更新标签下的文章数量
  async updateTagsArticleNum() {
    const { ctx } = this;
    const tags = await ctx.model.Tags.find(); // 查出所有标签
    if (tags && tags.length > 0) {
      tags.forEach(async (item) => {
        const articleNum = await ctx.model.Articles.find({
          tags: { $elemMatch: { $eq: item.name } },
          status: 1,
          publishStatus: 1,
        }).countDocuments();
        await ctx.model.Tags.update(
          {
            name: item.name,
          },
          {
            articleNum,
          }
        );
      });
    }
  }

  async index(params) {
    const { ctx } = this;
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;
    params = ctx.helper.filterEmptyField(params);

    let mustCon = {};
    if (params.categories) {
      mustCon.categories = params.categories;
    }
    if (params.tags) {
      mustCon.tags = {
        $all: params.tags.split(","),
      };
    }
    if (params.status !== "0") {
      mustCon.status = params.status;
    }
    if (params.publishStatus !== "0") {
      mustCon.publishStatus = params.publishStatus;
    }

    let timeQuery = ctx.helper.getTimeQueryCon(params);

    const queryCon = {
      $and: [
        mustCon,
        timeQuery,
        {
          title: { $regex: params.title ? new RegExp(params.title, "i") : "" },
        },
      ],
    };

    const totalCount = await ctx.model.Articles.find(queryCon).countDocuments();
    const data = await ctx.model.Articles.find(queryCon)
      .sort({ sort: 1 })
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
      msg: "文章列表获取成功",
    };
  }
  async edit(id) {
    const { ctx } = this;
    const oldArticles = await ctx.model.Articles.findOne({
      _id: id,
    });
    if (!oldArticles) {
      return {
        msg: "文章不存在",
      };
    }
    return {
      msg: "文章详情获取成功",
      data: oldArticles,
    };
  }

  async create(params) {
    const { ctx } = this;
    const oldArticles = await ctx.model.Articles.findOne({
      title: params.title,
    });
    if (oldArticles) {
      return {
        msg: "该文章已存在",
      };
    }
    const data = {
      ...params,
      createTime: params.createTime || ctx.helper.moment().unix(),
    };
    const res = await ctx.model.Articles.create(data);

    await this.updateCategoriesArticleNum();
    await this.updateTagsArticleNum();

    return {
      msg: "文章添加成功",
      data: res,
    };
  }

  // 删除文章
  async destroy(id) {
    const { ctx } = this;

    const oldArticles = await ctx.model.Articles.findOne({
      _id: id,
    });
    if (!oldArticles) {
      return {
        msg: "文章不存在",
      };
    }

    await ctx.model.Articles.deleteOne({
      _id: id,
    });
    await this.updateCategoriesArticleNum();
    await this.updateTagsArticleNum();

    return {
      msg: "文章删除成功",
    };
  }

  // 修改文章
  async update(params) {
    const { ctx } = this;

    const oldIdArticles = await ctx.model.Articles.findOne({
      _id: params.id,
    });

    if (!oldIdArticles) {
      return {
        msg: "文章不存在",
      };
    }

    const updateData = {
      ...params,
      createTime: params.createTime || oldIdArticles.createTime,
      updateTime: ctx.helper.moment().unix(),
    };
    await ctx.model.Articles.updateOne(
      {
        _id: params.id,
      },
      updateData
    );

    await this.updateCategoriesArticleNum();
    await this.updateTagsArticleNum();

    return {
      msg: "文章修改成功",
    };
  }

  // 启用、停用
  async changeStatus(params) {
    const { ctx } = this;
    const oldIdArticles = await ctx.model.Articles.findOne({
      _id: params.id,
    });
    if (!oldIdArticles) {
      return {
        msg: "文章不存在",
      };
    }

    const updateData = {
      status: params.status,
    };
    await ctx.model.Articles.updateOne(
      {
        _id: params.id,
      },
      updateData
    );
    await this.updateCategoriesArticleNum();
    await this.updateTagsArticleNum();
    return {
      msg: `文章${params.status === 1 ? "启用" : "停用"}成功`,
    };
  }

  // 更改发布状态
  async changePublishStatus(params) {
    const { ctx } = this;
    const oldIdArticles = await ctx.model.Articles.findOne({
      _id: params.id,
    });
    if (!oldIdArticles) {
      return {
        msg: "文章不存在",
      };
    }

    const updateData = {
      publishStatus: params.publishStatus,
    };
    await ctx.model.Articles.updateOne(
      {
        _id: params.id,
      },
      updateData
    );
    await this.updateCategoriesArticleNum();
    await this.updateTagsArticleNum();
    return {
      msg: `文章${params.publishStatus === 1 ? "发布" : "取消发布"}成功`,
    };
  }

  // 修改权重和置顶
  async changeSort(params) {
    const { ctx } = this;
    const oldIdArticles = await ctx.model.Articles.findOne({
      _id: params.id,
    });
    if (!oldIdArticles) {
      return {
        msg: "文章不存在",
      };
    }
    // 置顶
    if (params.top) {
      const oldArr = await ctx.model.Articles.find();
      if (oldArr.length === 0) return;
      const arr = oldArr.map((item) => item.sort).sort((a, b) => a - b);
      const currentMin = arr[0];
      params.sort =
        currentMin - 1 < -9999 || currentMin - 1 > 9999 ? 0 : currentMin - 1;
    }

    const updateData = {
      sort: params.sort,
    };
    await ctx.model.Articles.updateOne(
      {
        _id: params.id,
      },
      updateData
    );
    return {
      msg: `文章排序成功`,
    };
  }

  async changeCollectStatus(params) {
    const { ctx } = this;
    const res = await ctx.model.Articles.updateMany(
      {},
      {
        isCollect: params.isCollect,
      }
    );
    return {
      data: res,
      msg: `文章${params.isCollect ? "一键开启" : "一键关闭"}收藏成功`,
    };
  }
}

module.exports = ArticlesService;
