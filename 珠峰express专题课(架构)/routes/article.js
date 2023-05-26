const express = require('express');
const article = express.Router(); // es5 类可以直接调用 new ()

article.get('/addxxx', function (req, res) {
    res.end('article add')
})
article.get('/remove', function (req, res) {
    res.end('article remove')
})

module.exports = article