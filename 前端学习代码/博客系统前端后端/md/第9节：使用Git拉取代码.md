# 第9节：使用Git拉取代码

1.安装cnpm或yarn

因为你已经安装了node.js 所以在这里提前把cnpm或yarn都下载好，后面部署代码要用到。

```bash
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```

```bash
$ npm install -g yarn
```

2.用命令命令进行安装

```bash
$ yum install git 
```

3.然后用命令查看git 版本

```bash
$ git version
```

4.对git进行初始化设置

```bash
$ git config --global user.name "userName" # (userName是git的用户名) 然后回车即可
$ git config --global user.email "xxx@qq.com" # (xxx@qq.com是git的用户名邮箱) 然后回车即可
```

5.生成授权证书

Git的授权证书是基于公钥和私钥的证书体系，所以需要证书体系输入命令生成证书。

```bash
$ ssh-keygen -t rsa -C "xxx@qq.com" # 然后回车即可
```

（1：表示文件名，2：表示生成证书的密码，3：表示确认密码）

![git_config.png](/Users/xwl/Desktop/git_config.png)



<img src="/Users/xwl/Desktop/git_config_success.png" alt="git_config_success.png" style="zoom:50%;" />



6.切换到ssh目录下查看证书是否生成

```bash
$ cd ~/.ssh/
```

![git_ssh.png](/Users/xwl/Desktop/git_ssh.png)

> 这里的id_rsa 是私钥，id_rsa.pub表示公钥

7.实现git和github的链接 gitee同理

因为我的源码是放到github的所以直接通过git到github去拉去代码就可以了。

1.将证书注册到github上。
1）首先登陆[Github](https://github.com/)，
2）登陆之后点击头像，点击`Settings`.

<img src="/Users/xwl/Desktop/github_settings.png" alt="github_settings.png" style="zoom:50%;" />

3) 然后点击`SSH and GPG Keys`-----> `New SSH Key`

![git_ssh_new_key.png](/Users/xwl/Desktop/git_ssh_new_key.png)

4) 然后填写SSH Key数据。Title是名字（随便写），Key是我们在上面创建的公钥，复制到里面即可。

![](/Users/xwl/Desktop/git_add_ssh_key.png)

5）回到服务器中，用命令`cd ~/.ssh/` 切换到证书文件下，然后用命令`cat id_rsa.pub` 查看公钥内容，并复制公钥内容，将该公钥黏贴到github中的key里面，然后点击`Add SSH Key`。

```bash
$ cd ~/.ssh/
$ cat id_rsa.pub
```

![git_rsa_pub.png](/Users/xwl/Desktop/git_rsa_pub.png)

8.验证git的配置是否正确，是否能链接github

使用命令来链接github，然后回车

```bash
$ ssh git@github.com
```

![git_validate_success.png](/Users/xwl/Desktop/git_validate_success.png)

系统会提示是否要连接，我们输入`yes`，然后回车。当出现上图红方框中的内容时，就表示我们的服务器已经和github连接成功。



[Git常用命令指南](http://www.nevergiveupt.top/articles/details?id=5f43c1ca89ea670e66310139)

