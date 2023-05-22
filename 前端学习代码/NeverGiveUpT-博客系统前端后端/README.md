# NeverGiveUpT

个人博客项目简介：

- server 后台服务(管理系统和前台客户端) Node.js + Egg.js
- front/admin 客户端(管理系统) React + Umi + Ant design Pro
- front/web 客户端(前台 pc/wap) Vue2.x + MuseUI

### 1.项目本地启动步骤

1. 启动 MongoDB--Mac 版

   ```bash
   $ cd /usr/local/mongodb/bin
   $ sudo ./mongod # 需要输入Mac本机密码

   # 新开终端
   $ cd /usr/local/mongodb/bin
   $ ./mongod
   ```

   > 使用 mongoose 连接 MongoDb 默认端口和数据库：
   > mongodb://127.0.0.1:27017/blog
   > 参看：server/admin/config/config.default.js

2. 启动服务端

   ```bash
   $ cd server
   $ yarn
   $ yarn dev    # http://0.0.0.0:6666
   ```

   > 如何修改默认端口参看：server/admin/config/config.default.js

3. 启动客户端（后台管理系统）

   ```bash
   $ cd front/admin
   $ yarn
   $ yarn dev     # http://localhost:8000
   ```

   > 需要访问后台接口则需要设置项目代理，参看：front/admin/config/proxy.js

   ```js
   dev: {
   	'/api': {
   		target: 'http://127.0.0.1:6666', // 上面服务端启动的地址
   		changeOrigin: true,
   		pathRewrite: {
   				'^/api': '/api/v1', // 意思是将形如：/api/about 接口地址代理成：/api/v1/about
   		},
   	},
   }
   ```

4. 启动客户端（前台）

   ```bash
   $ cd front/web
   $ yarn install
   $ yarn serve # http://localhost:8090
   ```

   > 如何修改默认端口参看：front/web/vue.config.js

### 2.项目线上启动步骤

1.启动和终止 MongoDB

> /var/mongodb/data blog 数据存在这里
> /var/mongodb/logs/log.log 日志存在这里
> 没有使用 mongod.conf 配置文件

```bash
# 终止
$  mongod --dbpath /var/mongodb/data --logpath /var/mongodb/logs/log.log --shutdown

# 启动
$ mongod --dbpath /var/mongodb/data --logpath /var/mongodb/logs/log.log --fork
$ cd /usr/local/mongodb/bin
$ ./mongo

#查看MongoDB是否启用
$ ps aux | grep -v grep | grep mongod

```

2.启动服务端

```bash
$ cd server
$ yarn stop # 停止
$ yarn start # 启动
```

3.打包客户端（前台&&后台管理系统）

```bash
$ cd front/web
$ yarn build

$ cd front/admin
$ yarn build
```

4.启动和停止 Nginx

```bash
$ cd /usr/local/nginx/sbin
$ ./nginx -s reload # 重启
$ ./nginx -s stop # 停止
$ ./nginx # 启动

```

> nginx 的配置文件：/usr/local/nginx/conf/nginx.conf

### 本地连接线上

1.连接线上的 MongoDB 数据库

`server/config/config.default.js`

```js
config.mongoose = {
  url: "mongodb://服务器ip:27017/数据库名",
  options: {
    useNewUrlParser: true,
  },
};
```

2.启动本地后端服务

```bash
   cd server
   yarn dev # http://127.0.0.1:7002
```

3.启动前台

`front/web/vue.config.js`

```js
devServer: {
    port: 8090,
    proxy: {
      "/api/v1/web": {
        // target: "http://nevergiveupt.top", // 代理到线上
        target: "http://127.0.0.1:7002", // 代理到后台本地启动
        ws: false,
        changeOrigin: true, //是否跨域
      },
    },
    disableHostCheck: true,
  },
```

```bash
   cd front/web
   yarn serve
```

4.启动管理端

`front/admin/config/proxy.js`

```js
export default {
  dev: {
    "/api/v1": {
      // target: 'http://nevergiveupt.top:3000',// 代理到线上
      target: "http://127.0.0.1:7002", // 代理到后台本地启动
      changeOrigin: true,
    },
  },
};
```

```bash
   cd front/admin
   yarn serve
```
