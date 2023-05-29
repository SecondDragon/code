const { SchemaDirectiveVisitor, AuthenticationError } = require('apollo-server-express')
const { defaultFieldResolver } = require('graphql')
const { jwtSecret } = require('../config/config.default')
const jwt = require('../util/jwt')

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    // 把字段本身的 resolve 函数备份一下
    const { resolve = defaultFieldResolver } = field

    // 重写字段的 resolve 函数
    field.resolve = async function (parent, args, context, info) {
      const { token, dataSources } = context
      if (!token) {
        throw new AuthenticationError('未授权')
      }

      try {
        const decodedData = await jwt.verify(token, jwtSecret)
        const user = await dataSources.users.findById(decodedData.userId)

        // 把当前登录用户挂载到 context 上下文对象中，给后续的 resolve 使用
        context.user = user
      } catch (err) {
        throw new AuthenticationError('未授权')
      }
      const result = await resolve(parent, args, context, info)
      return result
    }
  }
}

module.exports = AuthDirective
