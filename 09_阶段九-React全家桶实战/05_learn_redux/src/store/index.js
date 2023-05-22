const { createStore } = require("redux")
const reducer =  require("./reducer.js")

// 创建的store
const store = createStore(reducer)

module.exports = store

