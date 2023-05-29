const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

// 1. 定义 schema
const typeDefs = gql`
  # A library has a branch and books
  type Library {
    branch: String!
    books: [Book!]
  }

  # A book has a title and author
  type Book {
    title: String!
    author: Author!
  }

  # An author has a name
  type Author {
    name: String!
  }

  type Query {
    libraries: [Library]
  }
`

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

const libraries = [
  {
    branch: 'downtown'
  },
  {
    branch: 'riverside'
  }
]

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
    branch: 'riverside'
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
    branch: 'downtown'
  }
]

// 2. 定义 resolver
const resolvers = {
  // 所有的 Query 都走这里
  Query: {
    libraries(parent, args, context) {
      console.log(context)
      // Return our hardcoded array of libraries
      return libraries
    }
  },
  Library: {
    // 这些解析器按上述顺序执行，并将其返回值通过父参数传递给链中的下一个解析器。
    books(parent, args, context) {
      console.log(context)
      // Filter the hardcoded array of books to only include
      // books that are located at the correct branch
      return books.filter(book => book.branch === parent.branch)
    },
  },
  Book: {
    // The parent resolver (Library.books) returns an object with the
    // author's name in the "author" field. Return a JSON object containing
    // the name, because this field expects an object.
    author(parent) {
      return {
        name: parent.author
      }
    }
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
