module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const FriendLinkSchema = new Schema({
    link: {
      type: "string",
    },
    icon: {
      type: "string",
    },
  });

  const RightIntroductionSchema = new Schema(
    {
      nickName: {
        type: "string",
        min: 2,
        max: 20,
      },
      desc: {
        type: "string",
        min: 2,
        max: 100,
      },
      tags: {
        type: [String],
        min: 1,
        max: 10,
      },
      friendLink: {
        type: [FriendLinkSchema],
        min: 1,
        max: 4,
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
      collection: "right_introduction",
      versionKey: false,
    }
  );

  return mongoose.model("RightIntroduction", RightIntroductionSchema);
};
