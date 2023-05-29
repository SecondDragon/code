const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const { User } = require('./models/')
const Users = require('./data-sources/user')

// 1. 定义 schema
const typeDefs = gql`
  type User {
    _id: ID!,
    name: String!,
    age: Int
  }

  type Query {
    users: [User!]
    user(id: ID!): User
  }
`

// 2. 定义 resolver
const resolvers = {
  // 所有的 Query 都走这里
  Query: {
    async users (parent, args, { dataSources }) {
      const users = await dataSources.users.getUsers()
      return users
    },
    async user (parent, { id }, { dataSources }) {
      const user = await dataSources.users.getUser(id)
      return user
    }
    // async users () {
    //   const users = await User.find()
    //   return users
    // },
    // async user (parent, { id }) {
    //   const user = await User.findById(id)
    //   return user
    // }
  }
}

const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // 任何 GraphQL 请求都会经过这里
  // 该函数接收一个参数：Request 请求对象
  context (req) {
    return { // 返回对象，自定义数据，后续的每个 resolver 都可以直接获取
      foo: 'bar'
    }
  },
  dataSources () {
    return {
      users: new Users(User)
    }
  }
})

// 将 Apollo-server 和 express 集合到一起
server.applyMiddleware({ app })

app.use((req, res) => {
  res.status(200)
  res.send('Hello!')
  res.end()
})

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
