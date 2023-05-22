const store = require("./store")

console.log(store.getState())


// 修改store中的数据: 必须action
const nameAction = { type: "change_name", name: "kobe" }
store.dispatch(nameAction)

console.log(store.getState())

const nameAction2 = { type: "change_name", name: "lilei" }
store.dispatch(nameAction2)
console.log(store.getState())

// 修改counter
const counterAction = { type: "add_number", num: 10 }
store.dispatch(counterAction)
console.log(store.getState())

