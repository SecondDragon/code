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
        math: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/,
      },
      password: {
        type: "string",
        required: true,
      },
      nickName: {
        type: String,
        required: false,
        max: 20,
      },
      avatar: {
        type: String,
        required: false,
      },
      introduction: {
        type: String,
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
