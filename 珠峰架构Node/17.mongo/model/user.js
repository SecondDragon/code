const mongoose = require('./index');
const crpto = require('crypto')
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    gender: Number,
    age: Number,
    address: String
})

UserSchema.statics.findByName = function(name) {
    return this.findOne({ username: name })
}
UserSchema.methods.saveMd5 = function() {
    this.password = crpto.createHash('md5').update(this.password).digest('base64');
    // 获取模型
    this.save(); // 直接修改后将自己保存 ， 通过找到文档在保存自己
    //   return this.model('User').create(this)
}

UserSchema.virtual('usernameAndPassword').get(function() {
    return this.username + '+' + this.password
})
module.exports = mongoose.model('User', UserSchema, 'user')