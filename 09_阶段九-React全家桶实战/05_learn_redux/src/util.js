const store = require("./store")

const { changeNameAction } = require("./store/actionCreators")

store.dispatch(changeNameAction("curry"))
