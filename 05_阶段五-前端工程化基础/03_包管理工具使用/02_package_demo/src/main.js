// const { why } = require("why")
const dayjs = require("dayjs")
const axios = require("axios")

// why()
console.log(dayjs())
axios.get("http://123.207.32.32:8000/home/multidata").then(res => {
  console.log(res)
})
