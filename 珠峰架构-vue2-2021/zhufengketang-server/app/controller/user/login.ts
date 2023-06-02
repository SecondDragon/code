import { Controller } from 'egg';
let jwt = require('jsonwebtoken');
export default class LoginController extends Controller {
  public async index() {
    const { ctx, app } = this;
    let { username, password: pwd } = ctx.request.body;
    let user = await ctx.model.User.findOne({ $or: [{ username }, { nickname: username }] });

    try {
      if (user) {
        let password = (app as any).createHash(pwd)
        if (user.password == password) {
          let token = jwt.sign({ username: user.username, _id: user._id }, app.config.privateKey);
          let authList;
          if (username == 'admin') {
            authList = [{ auth: 'lesson', name: '课程管理', path: '/profile/lesson-manager' }
            , { auth: 'student', name: '学员管理', path: '/profile/student-manager' }]
          } else {
            authList = [{ auth: 'points', name: '积分查看', path: '/profile/points' }, { auth: 'collect', name: '收藏列表', path: '/profile/collect' }]
          }
          ctx.body = {
            err: 0,
            data: {
              username: user.username,
              token,
              authList
            }
          }
        } else {
          ctx.body = {
            err: 1,
            data: '密码错误'
          }
        }
      } else {
        ctx.body = {
          err: 1,
          data: '用户不存在'
        }
      }
    } catch (e) {
      console.log(e)
      ctx.body = {
        err: 1,
        data: '登录失败，密码错误'
      }
    }
  }
  validate() {
    const { ctx, app } = this;
    // 获取header 去验证吧  
    const token = ctx.headers.authorization;
    try {

      const decoded = jwt.verify(token, app.config.privateKey);
      let authList;
      if (decoded.username == 'admin') {
        authList = [
          { auth: 'lesson', name: '课程管理', path: '/profile/lesson-manager' }
          , { auth: 'student', name: '学员管理', path: '/profile/student-manager' }
        ]
      } else {
        authList = [{ auth: 'points', name: '积分查看', path: '/profile/points' }, { auth: 'collect', name: '收藏列表', path: '/profile/collect' }]
      }
      ctx.body = {
        err: 0,
        data: {
          username: decoded.username,
          token,
          authList
        }
      }
    } catch (e) {
      ctx.body = {
        err: 1,
        data: 'token不正确'
      }
    }
  }
}
