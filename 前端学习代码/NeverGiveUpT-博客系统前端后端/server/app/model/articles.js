module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ArticlesSchema = new Schema(
    {
      title: {
        type: "string",
        min: 2,
        max: 200,
      },
      cover: {
        type: "string",
      },
      introduction: {
        type: "string",
        min: 10,
        max: 500,
      },
      categories: {
        type: "string",
      },
      tags: {
        type: "array",
        itemType: "string",
      },
      content: {
        type: "string",
      },
      views: {
        type: "number",
        default: 0,
      },
      comment: {
        type: "number",
        default: 0,
      },
      like: {
        type: "number",
        default: 0,
      },
      collect: {
        type: "number",
        default: 0,
      },
      isComment: {
        type: "boolean",
        default: true,
      },
      isLike: {
        type: "boolean",
        default: true,
      },
      isCollect: {
        type: "boolean",
        default: false,
      },
      // 是否开启打赏
      isReward: {
        type: "boolean",
        default: false,
      },
      status: {
        type: "number",
        default: 1,
      },
      publishStatus: {
        type: "number",
        default: 2,
      },
      sort: {
        type: "number",
        default: 0,
        min: -9999,
        max: 9999,
      },
      createTime: {
        type: "number",
        default: 0,
      },
      updateTime: {
        type: "number",
        default: 0,
      },
    },
    {
      collection: "articles",
      versionKey: false,
    }
  );

  return mongoose.model("Articles", ArticlesSchema);
};
