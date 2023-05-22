module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const HomeSchema = new Schema(
    {
      introduction: {
        type: "string",
        min: 2,
        max: 100,
      },
      effects: {
        type: "boolean",
        default: false,
      },
      archiveBgImg: {
        type: "string",
      },
      categoriesBgImg: {
        type: "string",
      },
      categoriesDetailBgImg: {
        type: "string",
      },
      tagsBgImg: {
        type: "string",
      },
      tagsDetailBgImg: {
        type: "string",
      },
      aboutBgImg: {
        type: "string",
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
      collection: "home",
      versionKey: false,
    }
  );
  return mongoose.model("Home", HomeSchema);
};
