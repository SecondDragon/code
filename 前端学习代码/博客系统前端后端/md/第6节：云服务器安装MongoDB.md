# 第6节：云服务器安装MongoDB

1.直接在服务器上下载安装包，我这里下载的版本是`4.0.11`

```bash
$ cd /usr/local
$ wget https://fastdl.mongodb.org/osx/mongodb-linux-x86_64-4.0.11.tgz
```
请选对相应的环境与版本，因我购买的服务器是 `CentOS` ，其实本质就是` linux 系统`，所以选择了`mongodb-linux-x86_64-4.0.11.tgz`

这个链接咋来的呢？看官网：如下

第一步：打开[Mongodb官网](https://www.mongodb.com/)
第二步：
![18.png](/Users/xwl/Desktop/18.png)
第三步：这里由于我当时选的版本是有的，后面人家更新就没有我当时选的版本了，这里就请选你自己对相应的环境与版本。当然你也可以复制选择我所选择的版本。
![19.png](/Users/xwl/Desktop/19.png)
2.解压并重命名文件夹为 mongodb

```bash
$ tar zxvf mongodb-linux-x86_64-4.0.11.tgz
$ mv mongodb-linux-x86_64-4.0.11 mongodb
```


3.配置环境变量

1、在终端中输出 "open -e .bash_profile"，打开bash_profile文件。

2、将`/usr/local/mongodb/bin:$PATH`追加到之前的配置后面

```bash
PATH=/usr/local/git/bin:$PATH:/usr/local/mongodb/bin:$PATH

export PATH
```

3、执行`source .bash_profile`使其刚刚的修改生效

4、执行`mongod -version`查看是否配置好，有信息输出则成功。





3.到var文件夹下去创建mongodb和/mongodb/data以及mongodb/logs。data 用于存放数据，logs 用于存放日志。

```bash
$ cd /var
$ mkdir mongodb   # 此时会在var文件夹下创建一个mongodb的文件夹
$ cd mongodb
$ mkdir data   # 此时会在mongodb文件夹下创建一个data的文件夹
$ mkdir logs   # 此时会在mongodb文件夹下创建一个logs的文件夹
```
我这里是一步一步cd创建的，你也可以一步到位。

4.添加 CentOS 开机启动项，首先打开 rc.local 文件，执行如下命令，不需要管现在当前路径，直接执行就OK。
```bash
$ vim /etc/rc.d/rc.local
```
> 温馨提示： vim 模式下，要 按了` i `才能插入内容，输入完之后，要先按`ESC`再按 `shift` 加` :wq` 才能保存退出。

5.设置mongodb 开机自启动，将 mongodb 启动命令书写到本文件中
```bash
$ /usr/local/mongodb/bin/mongod --dbpath=/var/mongodb/data --logpath /var/mongodb/logs/log.log -fork
```
6.启动 mongodb

```bash
$ cd /usr/local/mongodb/bin/
$ ./mongo
```
看到如下则表示启动成功：
![20.png](/Users/xwl/Desktop/20.png)
mongodb 默认的端口号是 27017。

7.如果你数据库的连接要账号和密码的，要创建数据库管理员，不然直接连接即可。 在 mongo shell 中创建管理员及数据库。

切换到 admin 数据库，创建超级管理员帐号
```sql
use admin
db.createUser({ user: "用户名", pwd:"密码", roles:[{ role: "userAdminAnyDatabase", db: "admin" }] })
```
切换到要使用的数据库，如articles数据库，创建这个数据库的管理员帐号
```bash
use articles
```
```sql
db.createUser({ user: "用户名", pwd:"密码", roles:[ { role: "readWrite", db: "articles" }] //读写权限 })
```
> 温馨提示：重复按两下 ctrl+c ，退出 mongo shell。
> 到这里 mongodb 基本已经安装设置完成了。

