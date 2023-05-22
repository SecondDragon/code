
// 对实例配置拦截器
axios.interceptors.request.use((config) => {
  console.log("请求成功的拦截")
  // 1.开始loading的动画

  // 2.对原来的配置进行一些修改
  // 2.1. header
  // 2.2. 认证登录: token/cookie
  // 2.3. 请求参数进行某些转化

  return config
}, (err) => {
  console.log("请求失败的拦截")
  return err
})

axios.interceptors.response.use((res) => {
  console.log("响应成功的拦截")

  // 1.结束loading的动画

  // 2.对数据进行转化, 再返回数据
  return res.data
}, (err) => {
  console.log("响应失败的拦截:", err)
  return err
})

axios.get("http://123.207.32.32:9001/lyric?id=500665346").then(res => {
  console.log("res:", res)
}).catch(err => {
  console.log("err:", err)
})