# admin

博客后台服务

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7002/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

[egg]: https://eggjs.org

### 1.修改项目默认启动端口为 6666

config.default.js 配置如下：

```js
config.cluster = {
  listen: {
    path: "",
    port: 6666,
    hostname: "0.0.0.0",
  },
};
```

### 2.MongoDB Mac 启动步骤

```bash
$ cd /usr/local/mongodb/bin
$ sudo ./mongod
# 新开终端
$ cd /usr/local/mongodb/bin
$ ./mongod
```

### 3.post 请求 csrf 问题忽略

config.default.js 配置如下：

```js
// post请求忽略csrf
config.security = {
  csrf: {
    enable: false,
  },
};
```

### 4.RESTful 风格的 URL 定义

```js
router.resources("topics", baseRouter + "/topics", jwt, controller.topics);
// 等同于下面 需要在 controller/playlist.js 创建 `edit`，`update`，`destroy`，`index`，`create`方法已完成各个接口的实际业务
router.get("/api/v1/playlist/:id/edit", controller.playlist.edit);
router.put("/api/v1/playlist/:id", controller.playlist.update);
router.del("/api/v1/playlist/:id", controller.playlist.destroy);
router.get("/api/v1/playlist", controller.playlist.index);
router.post("/api/v1/playlist", controller.playlist.create);
```

### 5.egg-validate

- github: https://github.com/eggjs/egg-validate
- 配置规则: https://github.com/node-modules/parameter

### 6.egg-mongoose

- github: https://github.com/eggjs/egg-mongoose

### 7.egg-jwt

- github: https://github.com/okoala/egg-jwt

  1.config.default.js

```js
config.jwt = {
  secret: "NeverGiveUpT", // 随便自定义
};
```

2.router.js 给需要 jwt 验证的接口加上验证

```js
module.exports = (app) => {
  const { router, controller, jwt } = app;
  const baseRouter = app.config.baseRouter; // /api/v1
  router.post(baseRouter + "/admin/login", controller.admin.adminLogin); // 管理员登录
  router.resources("topics", baseRouter + "/topics", jwt, controller.topics); // 需要jwt验证
};
```

### 8.返回前端结构约定

```
  {
    status:200 // http状态码  默认：200
    code:0 // 0代表业务成功 其他代表失败 默认：0
    msg:"请求成功" // 成功或者失败 提示语 默认：请求成功
    data:{ // 成功返回数据结构
      ...
    }
  }
```

### 参考项目：

- https://github.com/heimi-block/egg-RESTfulAPI
- https://github.com/xuwenliu/node-phone/blob/master/v2 node+koa2+mongoose
- https://www.jianshu.com/p/c3c9b1469fee Egg 上传文件到七牛云
