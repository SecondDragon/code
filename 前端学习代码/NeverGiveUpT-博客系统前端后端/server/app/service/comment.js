const Service = require("egg").Service;

class CommentService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  // 评论列表
  async index(params) {
    const { ctx, app } = this;
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;
    params = ctx.helper.filterEmptyField(params);

    let mustCon = {};
    if (params.auditStatus !== "0") {
      mustCon = {
        auditStatus: params.auditStatus,
      };
    }
    // auditStatus === "0" -查全部
    // nickName 模糊匹配
    // articleTitle  模糊匹配
    // 三者是and关系
    const queryCon = {
      $and: [
        mustCon,
        {
          nickName: {
            $regex: params.nickName ? new RegExp(params.nickName, "i") : "",
          },
        },
        {
          articleTitle: {
            $regex: params.articleTitle
              ? new RegExp(params.articleTitle, "i")
              : "",
          },
        },
      ],
    };
    const totalCount = await ctx.model.Comment.find(queryCon).countDocuments();
    const data = await ctx.model.Comment.find(queryCon)
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
      msg: "评论列表获取成功",
    };
  }

  async destroy(id) {
    const { ctx } = this;

    const oldComment = await ctx.model.Comment.findOne({
      _id: id,
    });
    if (!oldComment) {
      return {
        msg: "评论不存在",
      };
    }
    const articleId = oldComment.articleId;
    await ctx.model.Articles.updateOne(
      {
        _id: articleId,
      },
      { $inc: { comment: -1 } } // 删除评论则将该文章中统计的评论数自减一
    );

    await ctx.model.Comment.deleteOne({
      _id: id,
    });
    return {
      msg: "评论删除成功",
    };
  }

  async update(params) {
    const { ctx } = this;
    if (params.id == 0) {
      // 批量审核 id 前端传0
      await ctx.model.Comment.updateMany(
        {},
        {
          auditStatus: params.auditStatus,
          auditTime: ctx.helper.moment().unix(),
        }
      );
      return {
        msg: `评论一键${params.auditStatus === 1 ? "审核通过" : "驳回"}成功`,
      };
    }

    const oldIdComment = await ctx.model.Comment.findOne({
      _id: params.id,
    });

    if (!oldIdComment) {
      return {
        msg: "评论不存在",
      };
    }

    const updateData = {
      auditStatus: params.auditStatus,
      auditTime: ctx.helper.moment().unix(),
    };
    await ctx.model.Comment.updateOne(
      {
        _id: params.id,
      },
      updateData
    );

    return {
      msg: `评论${params.auditStatus === 1 ? "审核通过" : "驳回"}成功`,
    };
  }

  async create(params) {
    const { ctx } = this;
    const data = {
      ...params,
      createTime: ctx.helper.moment().unix(),
    };
    const res = await ctx.model.Comment.create(data);
    return {
      msg: "评论添加成功",
      data: res,
    };
  }
}

module.exports = CommentService;
