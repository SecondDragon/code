## connect-react-router
- 连接路由和仓库的

- 第一个作用是可以让你通过派发动作的方式修改路径
  - <Link>
  - history.push 
- middleware push




10:10
Traveller
connected-react-router是基于redux的吗 
router-router和redux连接起来的
菜菜
connected-react-router除了push，还有别的方法吗 


不会卡住，但是这个流程就结束 了
不调用next程序会卡住吗，还是说直接跳过其他中间件了 


真正项目 路由是不是外面要包很多 层函数 store 啊 链接路由啊 等 


真正项目 路由是不是外面要包很多 层函数 store 啊 链接路由啊 等 
嘎啦果
next具体传过来的是啥 
说滴对！
多层store是啥意思 

<Provider>
 <Router>
 context

 一个项目只能有一个store


 这个内部的reducer最终会被外面用户的reducer合并是吧老师 

 
组件内部还能用{history，location， match}原来的api吗 有的

