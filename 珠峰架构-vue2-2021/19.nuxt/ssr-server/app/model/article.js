module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const ArticleSchema = new Schema({
        tag: { type: String, required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
    }, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });
    return mongoose.model('Article', ArticleSchema);
}