const express = require("express")
const cors = require("cors")
const app = express()

// app.use(cors())

app.get("/", (req, res) => res.json({ msg: "welcome" }))

app.get("/token", (req, res) =>
  res.json({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  })
)

app.get("/userInfo", (req, res) => {
  res.json({
    name: "张三",
    age: 20
  })
})

app.get("/goods", (req, res) => {
  res.json({
    id: 1,
    name: "野生山核桃陕西官帽文玩精品大刺多纹理深薄棱官帽包邮狮子头如玉",
    price: 123.0
  })
})

app.get("/category", (req, res) => {
  res.json({
    id: 1,
    name: "文玩"
  })
})

app.get("/api/hello", (req, res) => {
  res.json({
    msg: "Hello"
  })
})

app.listen(3005, () => console.log("服务器启动成功, 监听 3005 端口"))
