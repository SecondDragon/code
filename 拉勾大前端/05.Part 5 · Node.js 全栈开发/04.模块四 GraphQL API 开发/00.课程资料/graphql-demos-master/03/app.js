const { buildSchema } = require('graphql')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')

const app = express()

// 允许客户端跨域请求
app.use(cors())

// 1. 使用 GraphQL schema 语法构建一个 schema
const schema = buildSchema(`
  type Score {
    name: String
    score: Float
  }

  enum Gender {
    MALE
    FEMALE
  }

  type User {
    name: String
    age: Int
    hobbies: [String!]!
    scores: [Score]
    gender: Gender
  }

  type Article {
    title: String
    body: String
    author: User
  }

  # Query 严格来说是一种对象类型
  # Query 是所有查询的入口点
  # Query 必须有，并且不能重复
  type Query {
    # 默认情况，每个类型都是可以为空的
    # 在类型后面加 ! 表示该字段不能为 null
    # foo: String
    foo: String!
    count: Int
    salary: Float
    isGood: Boolean
    userId: ID
    user: User
    article: Article
  }
`)

// 2. 定义 scheme 的 resolver
const rootValue = {
  foo () {
    return 'bar'
  },
  count () {
    return 123
  },
  salary () {
    return 123.123
  },
  isGood () {
    return true
  },
  userId () {
    return 123
  },
  user () {
    return {
      name: 'Jack',
      age: 18,
      hobbies: ['吃饭', '睡觉'],
      scores: [
        { name: '英语', score: 78 },
        { name: '数学', score: 98 }
      ],
      gender: 'MALE'
    }
  },
  article () {
    return {
      title: '标题',
      body: '内容',
      author: {
        name: 'Jack',
        age: 18
      }
    }
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
