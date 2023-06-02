'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
    async index() { // 查询
        let { ctx, app } = this;
        let articles = await ctx.service.article.findAll();
        ctx.body = {
            err: 0,
            data: {
                list: articles
            }
        }
    }
    async create() { // 创建
        let { ctx, app } = this;
        try {
            let doc = await ctx.service.article.save(ctx.request.body);
            console.log(doc)
            ctx.body = {
                err: 0,
                data: '添加成功'
            }
        } catch (e) {
            console.log(e)
            ctx.body = {
                err: 1,
                data: '添加失败'
            }
        }

    }
    async show() {
        let { ctx, app } = this;
        let id = ctx.params.id;
        try {
            let article = await ctx.service.article.findOne(id);
            ctx.body = {
                err: 0,
                data: article
            }
        } catch (e) {
            ctx.body = {
                err: 1,
                data: '无此文章'
            }
        }

    }
}

module.exports = ArticleController;
