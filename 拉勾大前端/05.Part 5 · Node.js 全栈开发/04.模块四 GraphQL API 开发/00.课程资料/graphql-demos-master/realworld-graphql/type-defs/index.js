const { gql } = require('apollo-server-express')

const typeDefs = gql`
  directive @upper on FIELD_DEFINITION
  directive @auth on FIELD_DEFINITION

  type User {
    email: String!
    # username: String! @deprecated(reason: "请使用 newUsername")
    username: String!
    bio: String
    image: String
    token: String
    following: Boolean
  }

  type UserPayload {
    user: User
  }

  type ArticlesPayload {
    articles: [Article!]
    articlesCount: Int!
  }

  type Query {
    # foo: String @upper
    foo: String @auth @upper
    currentUser: User @auth
    articles(offset: Int = 0, limit: Int = 2): ArticlesPayload
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    email: String
    username: String
    password: String
    image: String
    bio: String
  }

  input CreateArticleInput {
    title: String!
    description: String!
    body: String!
    tagList: [String!]
  }

  type Article {
    _id: String!
    title: String!
    description: String!
    body: String!
    tagList: [String!]
    createdAt: String!
    updatedAt: String!
    favorited: Boolean
    favoritesCount: Int
    author: User
  }

  type CreateArticlePayload {
    article: Article
  }

  type Mutation {
    # User
    login(user: LoginInput): UserPayload
    createUser(user: CreateUserInput): UserPayload
    updateUser(user: UpdateUserInput): UserPayload @auth
    
    # Article
    createArticle(article: CreateArticleInput): CreateArticlePayload @auth
  }
`

module.exports = typeDefs
