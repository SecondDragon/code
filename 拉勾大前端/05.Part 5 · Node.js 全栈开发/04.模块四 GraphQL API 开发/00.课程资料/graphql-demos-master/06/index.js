const express = require('express')

const { ApolloServer, gql } = require('apollo-server-express')

// 1. 定义 schema
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type User {
    id: ID!
    name: String
  }

  type Query {
    books: [Book]
    numberSix: Int! # Should always return the number 6 when queried
    numberSeven: Int! # Should always return 7
    user(id: ID!, foo: String): User
  }
`

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin'
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster'
  }
]

const users = [
  {
    id: '1',
    name: 'Elizabeth Bennet'
  },
  {
    id: '2',
    name: 'Fitzwilliam Darcy'
  }
]

// 2. 定义 resolver
const resolvers = {
  // 所有的 Query 都走这里
  Query: {
    books: () => books,
    numberSix() {
      return 6
    },
    numberSeven() {
      return 7
    },
    // args: 客户端的查询参数
    user(parent, args, context, info) {
      console.log(args)
      return users.find(user => user.id === args.id);
    }
  }
}

const app = express()

const server = new ApolloServer({ typeDefs, resolvers })

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
