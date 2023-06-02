export default app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const UserSchema = new Schema({
        nickname:{
            type: String,
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }, {
        timestamps: {
            createdAt: "createAt",
            updatedAt: 'updateAt'
        }
    })
    return mongoose.model('User', UserSchema, 'users');
}



