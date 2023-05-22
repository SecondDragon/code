module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ImgsSchema = new Schema({
    imgUrl: {
      type: "string",
    },
    link: {
      type: "string",
    },
  });
  const RightAdSchema = new Schema(
    {
      imgs: {
        type: [ImgsSchema],
        min: 1,
        max: 3,
      },
      showPosition: {
        type: [String],
        min: 1,
        max: 10,
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
      collection: "right_ad",
      versionKey: false,
    }
  );

  //   const RecommendSchema = new Schema({
  //     name: {
  //       type: "string",
  //       min: 2,
  //       max: 4,
  //     },
  //     router: {
  //       type: "string",
  //       match: /^[a-z]{1,50}$/,
  //       min: 1,
  //       max: 50,
  //     },
  //     sort: {
  //       type: "number",
  //       max: 9999,
  //       default: 0,
  //     },
  //     status: {
  //       type: "boolean",
  //       default: true,
  //     },
  //   });

  return mongoose.model("RightAd", RightAdSchema);
};
