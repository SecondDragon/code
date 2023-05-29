const { MongoDataSource } = require('apollo-datasource-mongodb')

class Articles extends MongoDataSource {
  createArticle (data) {
    const article = new this.model(data)
    // article.populate('author').execPopulate()
    return article.save()
  }

  getArticles (options) {
    return this.model.find().skip(options.offset).limit(options.limit)
  }

  getCount () {
    return this.model.countDocuments()
  }
}

module.exports = Articles
