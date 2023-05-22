module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema(
    {
      uid: {
        type: "string",
        required: false,
      },
      provider: {
        type: "string",
        default: "local",
        required: false,
      },
      email: {
        type: "string",
        required: true,
        match: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
      },
      password: {
        type: "string",
        required: true,
      },
      nickName: {
        type: "string",
        required: false,
        max: 20,
      },
      avatar: {
        type: "string",
        required: false,
      },
      introduction: {
        // 简介
        type: "string",
        required: false,
        max: 1000,
      },
      loginTime: {
        type: "number",
        default: 0,
      },
      registerTime: {
        type: "number",
        default: 0,
      },
      articleIds: {
        type: "array",
      },
    },
    {
      collection: "user",
      versionKey: false,
    }
  );

  return mongoose.model("User", UserSchema);
};
