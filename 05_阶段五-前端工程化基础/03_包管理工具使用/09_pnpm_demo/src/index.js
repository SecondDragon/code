const axios = require("axios")

axios.get("http://123.207.32.32:8000/home/multidata").then(res => {
  console.log(res)
})
