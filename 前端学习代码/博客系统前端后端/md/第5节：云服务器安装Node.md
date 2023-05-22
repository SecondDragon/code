# 第5节：云服务器安装Node

1.Node.js 需要通过 g++ 进行编译，所以先执行如下命令，这个过程大概几分钟的样子。

```bash
$ yum -y install gcc gcc-c++ autoconf
```
2.进入/usr/local/src，这个文件夹用来存放软件源代码。

```bash
$ cd /usr/local/src
```
3.下载Node.js源码--我这里下载的是v12.18.3版本--这个过程根据网速而定，一般10分钟的样子。

```bash
$ wget https://nodejs.org/dist/v12.18.3/node-v12.18.3.tar.gz
```
查看Node.js所有版本：[传送门](https://nodejs.org/dist/)
![node.png](/Users/xwl/Desktop/node.png)

4.下载完成后解压
```bash
$ tar -xzvf node-v12.18.3.tar.gz
```
5.进入解压后的文件夹

```bash
$ cd node-v12.18.3
```
6.执行配置脚本来进行预编译处理

```bash
$ ./configure
```
执行这一步，可能会报错如下：（未报错就自动忽略吧）
```bash
$ ./configure: 第 3 行:exec: python: 未找到
```
解决方案如下：
执行如下命令：

```bash
$ ls -l /usr/bin | grep python
```
会发现有python3，此时只需要运行如下命令即可
```bash
$ python3 configure.py
```
7.编译源代码，这个步骤花的时间会很长

```bash
$ make
```
8.编译完成后，执行安装命令，使之在系统范围内可用

```bash
$ make install
```
9.通过指令查看 node 及 npm 版本

```bash
$ node -v
$ npm -v
```
出现版本号即代表安装成功。


