module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CommentSchema = new Schema(
    {
      nickName: {
        type: "string",
        required: false,
        max: 20,
      },
      email: {
        type: "string",
        required: true,
        match: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
      },
      avatar: {
        type: "string",
        required: false,
      },
      articleId: {
        type: "ObjectId",
      },
      articleTitle: {
        type: "string",
        min: 2,
        max: 200,
      },
      targetReplayId: {
        type: "string",
        required: false,
        default: "",
      },
      targetReplayContent: {
        type: "string",
        required: false,
        max: 200,
        default: "",
      },
      currentReplayContent: {
        type: "string",
        required: false,
        max: 200,
        default: "",
      },
      commentTime: {
        // 评论时间
        type: "number",
        default: 0,
      },
      auditTime: {
        // 审核时间
        type: "number",
        default: 0,
      },
      auditStatus: {
        type: "string", // 0=全部 1=通过 2=驳回 3=未审核
        default: "3",
      },
    },
    {
      collection: "comment",
      versionKey: false,
    }
  );

  return mongoose.model("Comment", CommentSchema);
};
