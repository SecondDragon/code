'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken')

class UserController extends Controller {
    async login() {
        const { ctx, app } = this;
        const userInfo = ctx.request.body;
        let user = await ctx.service.user.find(userInfo);
        if (user) {
            let token = jwt.sign({ id: user._id }, app.config.secret);
            ctx.body = {
                err: 0,
                data: {
                    username: user.username,
                    token: token
                }
            }
        } else {
            ctx.body = {
                err: 1,
                data: '用户不存在'
            }
        }

    }
    async reg() {
        const { ctx, app } = this;
        const userInfo = ctx.request.body;
        let user = await ctx.service.user.find({ username: userInfo.username });
        if (user) {
            ctx.body = {
                err: 1,
                data: '用户存在'
            }
        } else {
            let r = await ctx.service.user.save(userInfo);
            ctx.body = {
                err: 0,
                data: '注册成功'
            }
        }
    }
}

module.exports = UserController;
