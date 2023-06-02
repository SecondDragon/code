'use strict';
const Service = require('egg').Service;
class ArticleService extends Service {
    async findOne(_id) {
        const { ctx } = this;
        return ctx.app.model.Article.findById(_id);
    }
    async findAll() {
        const { ctx } = this;
        return ctx.app.model.Article.find({});
    }
    async save(article){
        const { ctx } = this;
        return new ctx.app.model.Article(article).save()
    }
}
module.exports = ArticleService;
