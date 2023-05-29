const { SchemaDirectiveVisitor } = require('apollo-server-express')
const { defaultFieldResolver } = require('graphql')

class UpperCaseDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    // 把字段本身的 resolve 函数备份一下
    const { resolve = defaultFieldResolver } = field

    // 重写字段的 resolve 函数
    field.resolve = async function (parent, args, context, info) {
      // 调用原本的 resolve 函数
      const result = await resolve(parent, args, context, info)

      if (typeof result === 'string') {
        return result.toUpperCase()
      }
      return result
    }
  }
}

module.exports = UpperCaseDirective
