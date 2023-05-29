const { graphql, buildSchema } = require('graphql')

// 1. 使用 GraphQL schema 语法构建一个 schema
const schema = buildSchema(`
  type Query {
    foo: String
    count: Int
  }
`)

// 2. 定义 scheme 的 resolver
const rootValue = {
  foo () {
    return 'bar'
  },
  count () {
    return 123
  }
}

// 3. 查询
graphql(schema, '{ count, foo }', root).then(res => {
  console.log(res)
})
