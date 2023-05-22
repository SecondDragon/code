module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const HeaderSchema = new Schema({
    logo: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
      max: 20,
    },
    openSearch: {
      type: "boolean",
      default: true,
    },
    login: {
      type: "boolean",
      default: false,
    },
    register: {
      type: "boolean",
      default: false,
    },
  });

  const FooterSchema = new Schema({
    copyright: {
      type: String,
      min: 1,
      max: 200,
    },
    extra: {
      type: String,
      min: 1,
      max: 200,
    },
  });

  const HfSchema = new Schema(
    {
      header: {
        type: HeaderSchema,
      },
      footer: {
        type: FooterSchema,
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
      collection: "hf",
      versionKey: false,
    }
  );
  return mongoose.model("Hf", HfSchema);
};
