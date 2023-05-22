const Service = require("egg").Service;

class ArticlesService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  // 文章列表
  async index(params) {
    const { ctx, app } = this;
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;
    const queryCon = {
      status: 1,
      publishStatus: 1,
    };
    const totalCount = await ctx.model.Articles.find(queryCon).countDocuments();
    let list = await ctx.model.Articles.find(queryCon)
      .sort({
        createTime: -1,
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    if (ctx.user) {
      //生成token
      const token = app.jwt.sign(
        {
          email: ctx.user.email,
        },
        app.config.jwt.secret
      );

      //登录成功后设置cookie
      ctx.cookies.set("token", token, {
        maxAge: 86400000, //一天过期时间
        httpOnly: true, //是否只是服务器可访问 cookie, 默认是 true
      });
      return {
        data: {
          page,
          pageSize,
          totalCount,
          list,
          user: {
            token,
            email: ctx.user.email,
            nickName: ctx.user.nickName,
            avatar: ctx.user.avatar,
          },
        },
        msg: "文章列表获取成功",
      };
    }
    return {
      data: {
        page,
        pageSize,
        totalCount,
        list,
      },
      msg: "文章列表获取成功",
    };
  }

  async details(params) {
    const { ctx } = this;
    const { id, views } = params; // 文章id
    if (views * 1 === 1) {
      // 第一次查看该文章
      const oldView = await ctx.model.Articles.findOne({
        _id: id,
      });
      await ctx.model.Articles.updateOne(
        {
          _id: id,
        },
        {
          views: oldView.views + 1,
        }
      );
    }
    const queryCon = {
      status: 1,
      publishStatus: 1,
    };
    const allArticles = await ctx.model.Articles.find(queryCon).sort({
      createTime: -1,
    });
    const index = allArticles.findIndex((item) => item._id == id);

    let prev = null;
    let next = null;
    if (index === 0) {
      // 没有下一篇文章
      next = null;
      prev = allArticles[index + 1];
    } else if (index === allArticles.length - 1) {
      // 没有上一篇文章
      next = allArticles[index - 1];
      prev = null;
    } else {
      next = allArticles[index - 1];
      prev = allArticles[index + 1];
    }

    const data = {
      prev,
      next,
      current: allArticles[index],
    };

    return {
      data,
      msg: "文章详情获取成功",
    };
  }

  // 关键字搜索
  async keyword(params) {
    const { ctx } = this;
    // 从文章标题，简介，内容中去搜索
    const queryCon = {
      status: 1,
      publishStatus: 1,
      $or: [
        {
          title: {
            $regex: new RegExp(params.keyword, "i"),
          },
        },
        {
          introduction: {
            $regex: new RegExp(params.keyword, "i"),
          },
        },
        {
          content: {
            $regex: new RegExp(params.keyword, "i"),
          },
        },
      ],
    };
    let list = await ctx.model.Articles.find(queryCon).sort({
      createTime: -1,
    });
    return {
      data: {
        list,
      },
      msg: "文章关键字搜索成功",
    };
  }
}

module.exports = ArticlesService;
