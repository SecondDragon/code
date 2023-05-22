## 流
用来解决大文件读取问题的，我们可以自己指定读取的位置和读取的大小，客户端发送给服务端的数据都是一段段，我们接受客户端的数据 ，也是用流的方式。
- 流的模式 
  - 可读流（on('data') on('end')  push(数据|null)）
  - 可写流 （ws.write() ws.end()  string or buffer） 指定写入内容的位置，将内容分开写入
  - tcp 双工流 （能读，能写） socket.write  socket.end  socket.on('data')
  - process.stdin.on() process.stdout.write()
  - 转化流 transform模式 

> pipe管道，可以将读取的内容，发送给写入  rs.pipe(ws);  
> pipe实现的思想 读主要靠的是发布订阅模式 （多个异步如何进行拆分），写入时多个异步并发，根据异步顺序造队列 实现按顺序依次执行

## 栈 队列 链表 树
- 栈 队列 链表 线性结构
- 能手写单向链表、链表时如何反转的
- 树结构：二叉搜索树、树的遍历（先序遍历 中序遍历 后续遍历。层序遍历（广度遍历））
  
> 反转二叉树

## 文件操作的方法
- fs.mkdir fs.rmdir fs.stat() statObj.isDirectory() statObj.isFile()
- fs.readdir fs.unlink....  (fs.stat  fs.access)

## tcp
- 七层模型 （真实使用是五层模型），每一层做什么事情的
- （物、数（一个帧能传递多大））、网 (ip arp)、传(TCP、udp)、（会、表、应）
- tcp协议组成 http请求最多chrome而言是6个（同一个域名而言）。需要开辟6个tcp通道 三次握手。http2 就一个通道

- http针对同一个域名最多创建 6个tcp链接来传递数据 （域名切片技术，域名多了会很好吗？DNS解析） 队头阻塞 （tcp竞争带宽） （慢启动）
- http2 为了减少tcp创建 每个域名只建立一个链接 阻塞问题，http2没有解决这个问题（如果丢包率高，http2 性能还不如http1.0） 头部压缩 （减少慢启动）
- 三次握手四次断开 （掌握握手和断开的机制 ACK SEQ FIN SYNC LEN）

- 滑动窗口？（两个窗口，不停的滑动来确定发送的数据的区域和接收方的缓存区域）TCP拥塞控制？

> 一个tcp包到底能传递多大 帧的长度最大是1500 - 20个字节 - 20个字节 =》 1460个字节



> 从输入url 到 展现网站发生了什么 （域名-> ip地址 dns解析） 建立连接 (三次握手和四次断开) tcp的特点协议（滑动窗口、tcp拥塞处理）-> 网络层寻址 -> mac -> mac 物理层
