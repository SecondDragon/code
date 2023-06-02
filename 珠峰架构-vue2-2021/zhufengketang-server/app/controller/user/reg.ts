import { Controller } from 'egg';
export default class RegController extends Controller {
  public async index() {
    const { ctx, app } = this;
    let { username, password } = ctx.request.body;
    password = (app as any).createHash(password);
    try {
      let user = await ctx.model.User.findOne({username});
      if (user) {
          ctx.body = {
            err: 1,
            data: '用户已经存在'
          }
      } else {
        await ctx.model.User.create({ username, password });
        ctx.body = {
          err: 0,
          data: '注册成功 请登录'
        }
      }
    } catch (e) {
      ctx.body = {
        err: 1,
        data: '用户注册失败'
      }
    }
  }
}
