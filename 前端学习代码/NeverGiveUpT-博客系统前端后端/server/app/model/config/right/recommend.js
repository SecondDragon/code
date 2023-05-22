module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const RightRecommendSchema = new Schema(
    {
      project: {
        type: "string",
      },
      showPosition: {
        type: [String],
        min: 1,
        max: 10,
      },
      name: {
        type: "string",
        min: 2,
        max: 50,
      },
      cover: {
        type: "string",
      },
      link: {
        type: "string",
      },
      platform: {
        type: "string",
        min: 2,
        max: 20,
      },
      isVip: {
        type: "boolean",
        default: false,
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
      collection: "right_recommend",
      versionKey: false,
    }
  );

  return mongoose.model("RightRecommend", RightRecommendSchema);
};
