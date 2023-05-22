## windows安装
- https://www.mongodb.com/try/download/community 4.4.5
- 需要配置环境变量 `C:\Program Files\MongoDB\Server\4.4\bin`
- 安装后 mongod 服务端是自行启动的 ， 通过配置文件启动
- “可视化工具不要安装”


## mac安装
- brew tap mongodb/brew
- brew install mongodb-community
- brew services start mongodb-community


> 链接mongo服务 可以直接使用mongo命令， 需要给mongo设置权限，防止被别人访问

> mongo特点 数据库 》 集合 》 文档

##  可视化工具 
- Robo 3T Robomongo  / navicat


## 配置数据库权限
- 先创建mongodb的管理员，来管理数据库

```bash
show dbs
use admin
db.createUser({user:"jw",pwd:"1234",roles:[{role:"root",db:"admin"}]})


use web
db.createUser({user:"webAdmin",pwd:"1234",roles:[{role:"dbOwner",db:"web"}]})
```


## 数据库的基本的增删改查
- db.collection.insert()
- db.collection.find()
- db.collection.update()
- db.collection.remove()

> mongo的默认的使用方式 很多时候并不友好，而且在开发时 我们也不会直接使用命令行来增删改查

## mongoose
- orm工具 方便，而且可以约束存储的内容
- https://mongoosejs.com/docs/guide.html