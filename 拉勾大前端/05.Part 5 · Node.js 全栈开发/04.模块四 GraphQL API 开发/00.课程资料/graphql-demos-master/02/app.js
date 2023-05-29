const { buildSchema } = require('graphql')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')

const app = express()

// 允许客户端跨域请求
app.use(cors())

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

// 3. 挂载 GraphQL 中间件
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true // 开启浏览器 GraphQL IDE 调试工具
}))

// 4. 启动 Web 服务
app.listen(4000, () => {
  console.log('GraphQL Server is running at http://localhost:4000/')
})

// 3. 查询
// graphql(schema, '{ count, foo }', root).then(res => {
//   console.log(res)
// })
