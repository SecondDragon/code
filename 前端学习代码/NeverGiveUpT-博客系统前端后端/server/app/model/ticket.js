module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TicketSchema = new Schema(
    {
      accessToken: {
        type: "string",
      },
      accessTokenTime: {
        type: "number", // 存储accessToken的时间点
      },
      jsApiTicket: {
        type: "string",
      },
      jsApiTicketTime: {
        type: "number", // 存储jsApiTicket的时间点
      },
    },
    {
      collection: "ticket",
      versionKey: false,
    }
  );

  return mongoose.model("Ticket", TicketSchema);
};
