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
  return mongoose.model("RightAd", RightAdSchema);
};
