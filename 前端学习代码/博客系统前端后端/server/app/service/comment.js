const Service = require("egg").Service;

class CommentService extends Service {
  async index(params) {
    const { ctx } = this;
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;

    params = ctx.helper.filterEmptyField(params);
    console.log("params", params);

    let mustCon = {};
    if (params.auditStatus != "0") {
      mustCon = {
        auditStatus: params.auditStatus,
      };
    }

    const queryCon = {
      $and: [
        mustCon,
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
      .sort({
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
    };
  }
  async create(params) {
    const { ctx } = this;

    const data = {
      ...params,
      commentTime: ctx.helper.moment().unix(),
    };
    // TODO 修改文章评论数量
    const res = await ctx.model.Comment.create(data);

    await ctx.model.Articles.updateOne(
      {
        _id: params.articlesId,
      },
      {
        $inc: { comment: 1 },
      }
    );

    return {
      msg: "评论添加成功",
      data: res,
    };
  }

  async update(params) {
    const { ctx } = this;

    if (params.id == 0) {
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

    const oldComment = await ctx.model.Comment.findOne({ _id: params.id });
    if (!oldComment) {
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

  async destroy(id) {
    const { ctx } = this;
    const oldComment = await ctx.model.Comment.findOne({ _id: id });
    if (!oldComment) {
      return {
        msg: "评论不存在",
      };
    }
    await ctx.model.Comment.deleteOne({ _id: id });
    const articleId = oldComment.articleId;
    await ctx.model.Articles.updateOne(
      { _id: articleId },
      {
        $inc: { comment: -1 },
      }
    );
    return {
      msg: "评论删除成功",
    };
  }
}

module.exports = CommentService;
