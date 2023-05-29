const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const schema = require('./schema')
const dataSources = require('./data-sources')

const app = express()

const server = new ApolloServer({
  schema,
  dataSources,
  // 所有的 GraphQL 查询都会经过这里
  context ({ req }) {
    const token = req.headers['authorization']
    return {
      token
    }
  },
  // schemaDirectives: {
  //   // 自定义指令
  // }
})

// 将 Apollo-server 和 express 集合到一起
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
