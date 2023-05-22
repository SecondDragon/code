# 06-H5 的变化总结 -2-WebAPI

## 一 离线应用

离线应用可以帮助用户在没有网络时使用 web 程序，H5 的离线功能包含：离线资源缓存、在线状态监测、本地数据存储等。  
离线 web 应用比普通的 web 应用多了一个描述文件，该文件用来列出需要缓存和永不缓存的资源，描述文件的扩展名为：.manifest 或者 .appcache(推荐使用)。  
首先需要在项目目录下创建 offline.appcache 文件：

```txt
CACHE MANIFEST      # 说明这是离线应用描述文件
CACHE:              # 会被缓存的资源列表
index.html
index.js
NETWORK:            # 总是从 web 获取的资源列表
test.js
```

html 文件需要添加如下配置：

```html
<html lmanifest="./offline.appcache"></html>
```

## 二 跨文档通信

在过去，跨文档通信（跨源、跨窗口，cross-document messaging）往往是与服务端进行数据交互来实现的，并且需要借助轮询或者 Connect 技术来监听消息。

H5 提供了 PostMessages() 方法 实现安全的跨源通信：

```js
// 参数一：消息体
// 参数二：消息来自哪个域
// 参数三：可选。是一串和 message 同时传递的 Transferable 对象，这些对象的所有权将被转译给消息的接收方，而发送乙方将不再保有所有权

let iframeWindow = document.getElementById('myframe').contentWindow
iframeWindow.postMessage('A secret', 'http://www.demo.com')
```

iframe 应用实例：

```html
<button id="btn">点击发送消息给 iframe</button>
<iframe src="http:127.0.0.1/iframe.html"></iframe>
<script>
  let btn = document.querySelector('#btn')
  let data = ['周一', '周二', '周五']
  btn.onclick = function () {
    alert('执行发送数据给 iframe？')
    window.parent.postMessage(data, 'http:127.0.0.1/iframe.html')
  }
</script>
```

iframe 接受数据：

```javascript
    <script>
        window.addEventListener("data", e =>{
            console.log("origin=", e.origin);
            console.log("data=", e.data);
        });
    </script>
```

## 三 H5 原生拖放

在 H5 规范中，拖动元素，将依次触发：`dragstart`，`drag`，`dragend`三个事件。

当某个元素被拖动到一个有效的放置目标上时，将依次触发：`dragenter`，`dragover`，`dragleave/drop`三个事件。如果拖拽元素离开了目标元素位置，则触发 dragleav 事件，如果放置到了目标元素位置，则触发 drop 事件。

如果拖动元素经过不允许放置的元素，无论用户如何操作，都不会发生 drop 事件。不过，任何元素都可以被设置为放置目标元素。

设置元素可以放置方式是重写 dragenter、dragover 事件的默认行为：

```js
let droptarget = document.getElementById('droptarget')
EventUtil.addHandler(droptarget, 'dragover', function (event) {
  EventUtil.preventDefault(event)
})

EventUtil.addHandler(droptarget, 'dragenter', function (event) {
  EventUtil.preventDefault(event)
})
```

在 Firefox 中，若拖拽图像，则页面会转向图像文件，若拖拽文本，则会导致无效 URL 错误，所以这里需要取消 Firefox 的 drop 事件的默认行为，阻止其打开 URL：

```js
EventUtil.addHandler(droptarget, 'drop', function (event) {
  EventUtil.preventDefault(event)
})
```

dataTransfer 对象是拖拽事件对象的属性，用于存储数据：

```js
//设置和接收文本数据
event.dataTransfer.setData('text', 'some text')
let text = event.dataTransfer.getData('text')
//设置和接收 URL
event.dataTransfer.setData('URL', 'http://www.wrox.com/')
let url = event.dataTransfer.getData('URL')
```

默认情况下，图像、链接和文本是可以拖动的，也就是说，不用额外编写代码，用户就可以拖动它们。文本只有在被选中的情况下才能拖动，而图像和链接在任何时候都可以拖动。

HTML5 为所有 HTML 元素规定了一个 draggable 属性，表示元素是否可以拖动。图像和链接的 draggable 属性自动被设置成了 true，而其他元素这个属性的默认值都是 false。

## 四 多媒体控制

HTML5 新增了两个与媒体相关的元素：`<audio>`和`<video>`，可以取代 flash，为浏览器提供了嵌入音频和视频的统一解决方案。

嵌入方案：

```html
<!-- 嵌入视频 -->
<video id="myVideo">
  <source src="conference.webm" type="video/webm; codecs='vp8, vorbis'" />
  <source src="conference.ogv" type="video/ogg; codecs='theora, vorbis'" />
  <source src="conference.mpg" />
  Video player not available.
</video>

<!-- 嵌入音频 -->
<audio id="myAudio">
  <source src="song.ogg" type="audio/ogg" />
  <source src="song.mp3" type="audio/mpeg" />
  Audio player not available.
</audio>
```

## 五 通知

Notifications API 用于向用户显示通知，比传统的 alert() 更灵活，常用于 Service Worker，使得网页看起来像一个应用。

Notifications API 有被滥用的可能，因此默认会开启两项安全措施：

- 通知只能在运行在安全上下文的代码中被触发；
- 通知必须按照每个源的原则明确得到用户允许。

```js
Notification.requestPermission().then((permission) => {
  console.log('User responded to permission request:', permission)
})
```

Notification 构造函数用于创建和显示通知，第二个可选参数可以对通知进行自定义：

```js
const n = new Notification('Title text!', {
  body: 'Body text!',
  image: 'path/to/image.png',
  vibrate: true,
})

// 关闭通知
setTimeout(() => n.close(), 1000)
```

Notifications API 提供了 4 个用于添加回调的生命周期方法：

```txt
onshow 在通知显示时触发；
onclick 在通知被点击时触发；
onclose 在通知消失或通过 close() 关闭时触发；
onerror 在发生错误阻止通知显示时触发。
```

```js
const n = new Notification('foo')
n.onshow = () => console.log('Notification was shown!')
n.onclick = () => console.log('Notification was clicked!')
n.onclose = () => console.log('Notification was closed!')
n.onerror = () => console.log('Notification experienced an error!')
```
