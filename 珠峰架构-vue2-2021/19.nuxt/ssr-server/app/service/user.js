'use strict';
const Service = require('egg').Service;
class UserService extends Service {
    async find(userInfo) {
        const { ctx } = this;
        return ctx.app.model.User.findOne(userInfo)
    }
    async save(userInfo){
        const { ctx } = this;
        return new ctx.app.model.User(userInfo).save()
    }
   
}

module.exports = UserService;
