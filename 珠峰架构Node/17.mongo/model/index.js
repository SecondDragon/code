const mongoose = require('mongoose');
mongoose.connect('mongodb://webAdmin:1234@127.0.0.1:27017/web', { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if(err) return console.log(err);
    console.log('链接成功')
});
module.exports = mongoose