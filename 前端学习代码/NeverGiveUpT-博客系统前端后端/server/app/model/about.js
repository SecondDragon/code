module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const AboutSchema = new Schema(
    {
      imgs: [
        {
          imgUrl: { type: "string" },
          link: { type: "string", required: false },
        },
      ],
      desc: {
        type: "string",
        min: 1,
        max: 5000,
      },
      tags: [String],
      createTime: {
        type: "number",
        default: 0,
      },
      updateTime: {
        type: "number",
        default: 0,
      },
      showResume: {
        type: "boolean",
        default: false,
      },
      showTkb: {
        type: "boolean",
        default: false,
      },
      tkbApi: {
        type: "string",
      },
      tkbOrigin: {
        type: "string",
      },
      tkbStatic: {
        type: "string",
      },
      tkbResources: {
        type: "string",
      },
      tkbCryptoKey: {
        type: "string",
      },
      tkbSlat: {
        type: "string",
      },
    },
    {
      collection: "about",
      versionKey: false,
    }
  );

  return mongoose.model("About", AboutSchema);
};
