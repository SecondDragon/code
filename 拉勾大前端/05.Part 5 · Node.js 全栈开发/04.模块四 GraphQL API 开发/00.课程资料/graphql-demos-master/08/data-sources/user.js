const { MongoDataSource } = require('apollo-datasource-mongodb')

class Users extends MongoDataSource {
  getUser(userId) {
    return this.findOneById(userId)

    // this.model // 访问数据模型对象
  }

  getUsers () {
    return this.model.find()
  }
}

module.exports = Users
