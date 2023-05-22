const mongoose = require('./index');

const ArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    createTime: {
        type: Date,
        default: Date.now
    },
    user_id:{
        type:mongoose.SchemaTypes.ObjectId,
        // ref:'User'
    } // 用户的_id 类型就是ObjectId
})
module.exports = mongoose.model('Article', ArticleSchema, 'article')