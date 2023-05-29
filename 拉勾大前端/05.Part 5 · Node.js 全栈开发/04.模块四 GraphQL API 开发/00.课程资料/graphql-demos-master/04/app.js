/**
 * schema 类型：
 *  - 参数
 *  - 修改
 *  - 输入类型
 */

const { buildSchema } = require('graphql')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(cors())

const articles = [
  { id: '1', title: 'article 1', body: 'article 1 body' },
  { id: '2', title: 'article 2', body: 'article 2 body' },
  { id: '3', title: 'article 3', body: 'article 3 body' }
]

const schema = buildSchema(`
  type Article {
    id: ID!
    title: String!
    body: String!
    tagList: [String!]
  }

  # 查询的入口点
  type Query {
    articles: [Article]
    article(id: ID!): Article
  }

  # 参数对象必须使用 Input 定义
  input CreateArticleInput {
    title: String!
    body: String!
    tagList: [String!]
  }

  input UpdateArticleInput {
    title: String!
    body: String!
  }

  type DeletionStatus {
    success: Boolean!
  }

  # 修改入口点
  type Mutation {
    createArticle(article: CreateArticleInput): Article
    updateArticle(id: ID!, article: UpdateArticleInput): Article
    deleteArticle(id: ID!): DeletionStatus
  }
`)

const rootValue = {
  articles () {
    return articles
  },
  article ({ id }) {
    return articles.find(article => article.id === id)
  },
  createArticle ({ article }) {
    article.id = uuidv4()
    articles.push(article)
    return article
  },
  updateArticle ({ id, article: postArticle }) {
    const article = articles.find(article => article.id === id)
    article.title = postArticle.title
    article.body = postArticle.body
    return article
  },
  deleteArticle ({ id }) {
    const index = articles.find(article => article.id === id)
    articles.splice(index, 1)
    return {
      success: true
    }
  }
}

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('GraphQL Server is running at http://localhost:4000/')
})
