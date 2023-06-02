import { Controller } from 'egg';

export default class ResetController extends Controller {
  public async index() {
    const { ctx, app } = this;
    let body = ctx.request.body;
    body.password = (app as any).createHash(body.password)
    try {
      let code = body.code;
      let c = await ctx.service.redis.getValue(body.username);
      if (code != c) { // 如果验证码正确
        return ctx.body = {
          err: 1,
          data: '验证码不正确,无法修改'
        }
      }
      delete body.code;
      let user = await ctx.model.User.findOneAndUpdate({ username: body.username }, {password:body.password});
      if (user) {
        ctx.body = {
          err: 0,
          data: '重置密码成功'
        }
        ctx.service.redis.remove(body.username); // 删除用户名
      } else {
        ctx.body = {
          err: 1,
          data: '查询无此用户，请注册'
        }
      }
    } catch (e) {
      ctx.body = {
        err: 1,
        data: '重置密码失败'
      }
    }

  }
}
