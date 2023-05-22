module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const WeddingSchema = new Schema(
    {
      name: {
        type: "string",
        required: true,
      },
      phone: {
        type: "string",
        required: true,
        max: 11,
      },
      message: {
        type: "string",
        required: true,
        max: 5000,
      },
      type: {
        type: "number",
        default: 0,
        required: true,
      },
      createTime: {
        type: "number",
        default: 0,
      },
    },
    {
      collection: "wedding",
      versionKey: false,
    }
  );

  return mongoose.model("Wedding", WeddingSchema);
};
