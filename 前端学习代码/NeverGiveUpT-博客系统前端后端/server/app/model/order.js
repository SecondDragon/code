module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const OrderSchema = new Schema(
    {
      name: {
        type: "string",
        min: 2,
        max: 20,
        format: /^[\u4E00-\u9FA5A-Za-z0-9_.]{2,20}$/,
      },
      fileName: {
        type: "string",
      },
      source: {
        type: "string",
      },
      totalAmount: {
        type: "number",
        default: 0,
      },
      brokerage: {
        // 平台抽成
        type: "number",
        default: 0,
      },
      status: {
        type: "boolean",
        default: false,
      },

      details: {
        type: "array",
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
      collection: "order",
      versionKey: false,
    }
  );

  return mongoose.model("Order", OrderSchema);
};
