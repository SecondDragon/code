const Service = require("egg").Service;

class LikeService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async submit(params) {
    const { ctx } = this;
    const oldLike = await ctx.model.Articles.findOne({
      _id: params.articleId,
    });
    const res = await ctx.model.Articles.updateOne(
      {
        _id: params.articleId,
      },
      {
        like: oldLike.like + 1,
      }
    );
    return {
      msg: "点赞成功",
      data: res,
    };
  }

  async collect(params) {
    const { ctx } = this;
    const { articleId, email } = params;
    const oldUser = await ctx.model.User.findOne({
      email,
    });
    if (!oldUser) {
      return {
        status: 402,
        msg: "不存在该用户",
      };
    }
    let articleIds = [articleId];
    if (oldUser.articleIds) {
      if (oldUser.articleIds.includes(articleId)) {
        return {
          code: 1,
          msg: "该文章你已经收藏过了",
        };
      }
      articleIds = [...oldUser.articleIds, articleId];
    }

    await ctx.model.User.updateOne(
      {
        email,
      },
      {
        articleIds,
      }
    );
    return {
      msg: "收藏成功",
    };
  }
  async cancelCollect(params) {
    const { ctx } = this;
    const { email, articleIds } = params;
    const oldUser = await ctx.model.User.findOne({
      email,
    });
    if (!oldUser) {
      return {
        status: 402,
        msg: "不存在该用户",
      };
    }
    const oldArticleIds = oldUser.articleIds;
    let newArticleIds = [];
    oldArticleIds.forEach((id) => {
      if (!articleIds.includes(id)) {
        newArticleIds.push(id);
      }
    });
    const updateData = {
      articleIds: newArticleIds,
    };
    const res = await ctx.model.User.updateOne(
      {
        email,
      },
      updateData
    );
    return {
      data: res,
      msg: "取消收藏成功",
    };
  }
  async collectList(params) {
    const { ctx } = this;
    const { email } = params;
    const oldUser = await ctx.model.User.findOne({
      email,
    });
    if (!oldUser) {
      return {
        status: 402,
        msg: "不存在该用户",
      };
    }
    const articleIds = oldUser.articleIds;
    if (articleIds && articleIds.length != 0) {
      let articles = [];
      const allArticles = await ctx.model.Articles.find({});
      allArticles.forEach((item) => {
        if (articleIds.includes(item._id)) {
          articles.push(item);
        }
      });
      return {
        data: articles,
        msg: "收藏文章获取成功",
      };
    } else {
      return {
        code: 1,
        msg: "暂无收藏文章",
      };
    }
  }
}

module.exports = LikeService;
