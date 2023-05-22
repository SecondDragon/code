const Service = require("egg").Service;

class CommentService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async submit(params) {
    const { ctx } = this;
    const data = {
      ...params,
      commentTime: ctx.helper.moment().unix(),
    };
    const res = await ctx.model.Comment.create(data);

    const oldComment = await ctx.model.Articles.findOne({
      _id: params.articleId,
    });

    await ctx.model.Articles.updateOne(
      {
        _id: params.articleId,
      },
      { $inc: { comment: 1 } } // 删除评论则将该文章中统计的评论数自增一
    );

    return {
      msg: "评论成功，请耐心等待审核",
      data: res,
    };
  }

  async list(params) {
    const { ctx } = this;
    const { articleId } = params;
    const res = await ctx.model.Comment.find({
      articleId,
      auditStatus: {
        $ne: "2", // 评论状态不为驳回的
      },
    }).sort({
      commentTime: -1,
    });
    return {
      msg: "评论列表获取成功",
      data: res,
    };
  }
}

module.exports = CommentService;
