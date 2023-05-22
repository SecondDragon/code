module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CategoriesSchema = new Schema(
    {
      name: {
        type: String,
        min: 2,
        max: 20,
        match: /^[\u4e00-\u9fa5A-Za-z0-9_]{2,20}$/,
      },
      createTime: {
        type: "number",
        default: 0,
      },
      updateTime: {
        type: "number",
        default: 0,
      },
      articleNum:{
        type: "number",
        default: 0,
      },
    },
    {
      collection: "categories",
      versionKey: false,
    }
  );
  return mongoose.model("Categories", CategoriesSchema);
};
