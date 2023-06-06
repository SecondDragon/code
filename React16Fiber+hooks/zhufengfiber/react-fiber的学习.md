## 1. 屏幕刷新率

-   目前大多数设备的屏幕刷新率为 60 次/秒
-   浏览器渲染动画或页面的每一帧的速率也需要跟设备屏幕的刷新率保持一致
-   页面是一帧一帧绘制出来的，当每秒绘制的帧数（FPS）达到 60 时，页面是流畅的,小于这个值时，用户会感觉到卡顿
-   每个帧的预算时间是16.66 毫秒 (1秒/60)
-   1s 60帧，所以每一帧分到的时间是 1000/60 ≈ 16 ms。所以我们书写代码时力求不让一帧的工作量超过 16ms

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1a6c84ff4ef40dba2ac0a0f581358b7~tplv-k3u1fbpfcp-watermark.image?)

## 2. 帧

-   每个帧的开头包括样式计算、布局和绘制
-   JavaScript执行 Javascript引擎和页面渲染引擎在同一个渲染线程,GUI渲染和Javascript执行两者是互斥的
-   如果某个任务执行时间过长，浏览器会推迟渲染

![lifeofframe](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4dfa736897643449b2e179187705339~tplv-k3u1fbpfcp-zoom-1.image)

### 2.1 rAF

-   [requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)回调函数会在绘制之前执行

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RAF</title>
</head>

<body>
    <div style="background: lightblue;width: 0;height: 20px;"></div>
    <button>开始</button>
    <script>
        /**
         * requestAnimationFrame(callback) 由浏览器专门为动画提供的API
         * cancelAnimationFrame(返回值) 清除动画
         * <16.7 丢帧
         * >16.7 跳跃 卡顿
         */
        const div = document.querySelector('div');
        const button = document.querySelector('button');
        let start;
        function progress() {
            div.style.width = div.offsetWidth + 1 + 'px';
            div.innerHTML = (div.offsetWidth) + '%';
            if (div.offsetWidth < 100) {
                let current = Date.now();
                console.log(current - start);
                start = current;
                timer = requestAnimationFrame(progress);
            }
        }
        button.onclick = () => {
            div.style.width = 0;
            start = Date.now();
            requestAnimationFrame(progress);
        }
    </script>
</body>
</html>
```

### 2.2 requestIdleCallback

-   我们希望快速响应用户，让用户觉得够快，不能阻塞用户的交互
-   [requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应
-   正常帧任务完成后没超过`16 ms`,说明时间有富余，此时就会执行 `requestIdleCallback` 里注册的任务

![cooperativescheduling2](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4c61c72ec7b4bd18bb1d7c652969c2a~tplv-k3u1fbpfcp-zoom-1.image)

```js
window.requestIdleCallback(
  callback: (deaLine: IdleDeadline) => void,
  option?: {timeout: number}
  )

interface IdleDeadline {
  didTimeout: boolean // 表示任务执行是否超过约定时间
  timeRemaining(): DOMHighResTimeStamp // 任务可供执行的剩余时间
}
```

-   callback：回调即空闲时需要执行的任务，该回调函数接收一个IdleDeadline对象作为入参。其中IdleDeadline对象包含：

    -   didTimeout，布尔值，表示任务是否超时，结合 timeRemaining 使用
    -   timeRemaining()，表示当前帧剩余的时间，也可理解为留给任务的时间还有多少

-   options：目前 options 只有一个参数

    -   timeout。表示超过这个时间后，如果任务还没执行，则强制执行，不必等待空闲

```html
<body>
    <script>
        function sleep(d) {
            for (var t = Date.now(); Date.now() - t <= d;);
        }
        const works = [
            () => {
                console.log("第1个任务开始");
                sleep(0);//sleep(20);
                console.log("第1个任务结束");
            },
            () => {
                console.log("第2个任务开始");
                sleep(0);//sleep(20);
                console.log("第2个任务结束");
            },
            () => {
                console.log("第3个任务开始");
                sleep(0);//sleep(20);
                console.log("第3个任务结束");
            },
        ];

        requestIdleCallback(workLoop, { timeout: 1000 });
        function workLoop(deadline) {
            console.log('本帧剩余时间', parseInt(deadline.timeRemaining()));
            while ((deadline.timeRemaining() > 1 || deadline.didTimeout) && works.length > 0) {
                performUnitOfWork();
            }

            if (works.length > 0) {
                console.log(`只剩下${parseInt(deadline.timeRemaining())}ms,时间片到了等待下次空闲时间的调度`);
                requestIdleCallback(workLoop);
            }
        }
        function performUnitOfWork() {
            works.shift()();
        }
    </script>
</body>
```

### 2.3 MessageChannel

-   目前 `requestIdleCallback` 目前只有Chrome支持
-   所以目前 React利用 [MessageChannel](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel)模拟了requestIdleCallback，将回调延迟到绘制操作之后执行
-   MessageChannel API允许我们创建一个新的消息通道，并通过它的两个MessagePort属性发送数据
-   MessageChannel创建了一个通信的管道，这个管道有两个端口，每个端口都可以通过postMessage发送数据，而一个端口只要绑定了onmessage回调方法，就可以接收从另一个端口传过来的数据
-   MessageChannel是一个宏任务

![phones](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c1c86b4dee24f14b08e64ebb7af85d7~tplv-k3u1fbpfcp-zoom-1.image)

```js
var channel = new MessageChannel();
//channel.port1
//channel.port2
```

```js
var channel = new MessageChannel();
var port1 = channel.port1;
var port2 = channel.port2;
port1.onmessage = function(event) {
    console.log("port1收到来自port2的数据：" + event.data);
}
port2.onmessage = function(event) {
    console.log("port2收到来自port1的数据：" + event.data);
}
port1.postMessage("发送给port2");
port2.postMessage("发送给port1");
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <script>
        const channel = new MessageChannel()
        let pendingCallback;
        let startTime;
        let timeoutTime;
        let perFrameTime = (1000 / 60);
        let timeRemaining = () => perFrameTime - (Date.now() - startTime);
        channel.port2.onmessage = () => {
            if (pendingCallback) {
                pendingCallback({ didTimeout: Date.now() > timeoutTime, timeRemaining });
            }
        }
        window.requestIdleCallback = (callback, options) => {
            timeoutTime = Date.now() + options.timeout;
            requestAnimationFrame(() => {
                startTime = Date.now();
                pendingCallback = callback;
                channel.port1.postMessage('hello');
            })
            /* startTime = Date.now();
            setTimeout(() => {
                callback({ didTimeout: Date.now() > timeoutTime, timeRemaining });
            }); */
        }

        function sleep(d) {
            for (var t = Date.now(); Date.now() - t <= d;);
        }
        const works = [
            () => {
                console.log("第1个任务开始");
                sleep(30);//sleep(20);
                console.log("第1个任务结束");
            },
            () => {
                console.log("第2个任务开始");
                sleep(30);//sleep(20);
                console.log("第2个任务结束");
            },
            () => {
                console.log("第3个任务开始");
                sleep(30);//sleep(20);
                console.log("第3个任务结束");
            },
        ];

        requestIdleCallback(workLoop, { timeout: 60 * 1000 });
        function workLoop(deadline) {
            console.log('本帧剩余时间', parseInt(deadline.timeRemaining()));
            while ((deadline.timeRemaining() > 1 || deadline.didTimeout) && works.length > 0) {
                performUnitOfWork();
            }
            if (works.length > 0) {
                console.log(`只剩下${parseInt(deadline.timeRemaining())}ms,时间片到了等待下次空闲时间的调度`);
                requestIdleCallback(workLoop, { timeout: 60 * 1000 });
            }
        }
        function performUnitOfWork() {
            works.shift()();
        }
    </script>
</body>

</html>
```

## 3. 单链表

-   单链表是一种链式存取的数据结构
-   链表中的数据是以节点来表示的，每个节点的构成：元素 + 指针(指示后继元素存储位置)，元素就是存储数据的存储单元，指针就是连接每个节点的地址

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6902b086c7cc43b9ac1e675b64ba5315~tplv-k3u1fbpfcp-watermark.image?)
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/38f532c13bea4b01a9112c9b13bd6fe1~tplv-k3u1fbpfcp-watermark.image?)



```js
class Update {
    constructor(payload) {
        this.payload = payload;
        this.nextUpdate = null;
    }
}
class UpdateQueue {
    constructor() {
        this.baseState = null;
        this.firstUpdate = null;
        this.lastUpdate = null;
    }
    clear() {
        this.firstUpdate = null;
        this.lastUpdate = null;
    }
    enqueueUpdate(update) {
        if (this.firstUpdate === null) {
            this.firstUpdate = this.lastUpdate = update;
        } else {
            this.lastUpdate.nextUpdate = update;
            this.lastUpdate = update;
        }
    }
    forceUpdate() {
        let currentState = this.baseState || {};
        let currentUpdate = this.firstUpdate;
        while (currentUpdate) {
            let nexState = typeof currentUpdate.payload == 'function' ? currentUpdate.payload(currentState) : currentUpdate.payload;
            currentState = { ...currentState, ...nexState };
            currentUpdate = currentUpdate.nextUpdate;
        }
        this.firstUpdate = this.lastUpdate = null;
        this.baseState = currentState;
        return currentState;
    }
}


let queue = new UpdateQueue();
queue.enqueueUpdate(new Update({ name: 'zhufeng' }));
queue.enqueueUpdate(new Update({ number: 0 }));
queue.enqueueUpdate(new Update(state => ({ number: state.number + 1 })));
queue.enqueueUpdate(new Update(state => ({ number: state.number + 1 })));
queue.forceUpdate();
console.log(queue.baseState);
```

## 4.Fiber历史

### 4.1 Fiber之前的协调

-   React 会递归比对VirtualDOM树，找出需要变动的节点，然后同步更新它们。这个过程 React 称为Reconcilation(协调)
-   在`Reconcilation`期间，React 会一直占用着浏览器资源，一则会导致用户触发的事件得不到响应, 二则会导致掉帧，用户可能会感觉到卡顿

```js
let root = {
    key: 'A1',
    children: [
        {
            key: 'B1',
            children: [
                {
                    key: 'C1',
                    children: []
                },
                {
                    key: 'C2',
                    children: []
                }
            ]
        },
        {
            key: 'B2',
            children: []
        }
    ]
}
function walk(element) {
    doWork(element);
    element.children.forEach(walk);
}

function doWork(element) {
    console.log(element.key);
}
walk(root);
```

### 4.2 Fiber是什么

-   我们可以通过某些调度策略合理分配CPU资源，从而提高用户的响应速度
-   通过Fiber架构，让自己的Reconcilation过程变成可被中断。 `适时`地让出CPU执行权，除了可以让浏览器及时地响应用户的交互

#### 4.2.1 Fiber是一个执行单元

-   Fiber是一个执行单元,每次执行完一个执行单元, React 就会检查现在还剩多少时间，如果没有时间就将控制权让出去

![fiberflow](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f125c18cbb934583951e72fe9b366455~tplv-k3u1fbpfcp-zoom-1.image)

#### 4.2.2 Fiber是一种数据结构

-   React目前的做法是使用链表, 每个 VirtualDOM 节点内部表示为一个`Fiber`

![fiberconstructor](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/adbbae3fc23c40f58c2551de8d3786ea~tplv-k3u1fbpfcp-zoom-1.image)

```js
type Fiber = {
  //类型  
  type: any,
  //父节点
  return: Fiber,
  // 指向第一个子节点
  child: Fiber,
  // 指向下一个弟弟
  sibling: Fiber
}
```

## 5.Fiber执行阶段

-   每次渲染有两个阶段：Reconciliation(协调\render阶段)和Commit(提交阶段)
-   协调阶段: 可以认为是 Diff 阶段, 这个阶段可以被中断, 这个阶段会找出所有节点变更，例如节点新增、删除、属性变更等等, 这些变更React 称之为副作用(Effect)
-   提交阶段: 将上一个阶段计算出来的需要处理的副作用(Effects)一次性执行了。这个阶段必须同步执行，不能被打断

### 5.1 render阶段

-   render阶段会构建fiber树

#### 5.1.1 element.js

```js
let A1 = { type: 'div', key: 'A1' };
let B1 = { type: 'div', key: 'B1', return: A1 };
let B2 = { type: 'div', key: 'B2', return: A1 };
let C1 = { type: 'div', key: 'C1', return: B1 };
let C2 = { type: 'div', key: 'C2', return: B1 };
A1.child = B1;
B1.sibling = B2;
B1.child = C1;
C1.sibling = C2;
module.exports = A1;
```

#### 5.1.2 render.js

-   从顶点开始遍历
-   如果有第一个儿子，先遍历第一个儿子
-   如果没有第一个儿子，标志着此节点遍历完成
-   如果有弟弟遍历弟弟
-   如果有没有下一个弟弟，返回父节点标识完成父节点遍历，如果有叔叔遍历叔叔
-   没有父节点遍历结束

![fiberconstructortranverse3](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d57d5c1ae6f5449bbcd72f42fba2b2fe~tplv-k3u1fbpfcp-zoom-1.image)

```js
let rootFiber = require('./element');
//下一个工作单元
let nextUnitOfWork = null;
//render工作循环
function workLoop() {
    while (nextUnitOfWork) {
        //执行一个任务并返回下一个任务
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
    //render阶段结束
}
function performUnitOfWork(fiber) {
    beginWork(fiber);
    if (fiber.child) {//如果子节点就返回第一个子节点
        return fiber.child;
    }
    while (fiber) {//如果没有子节点说明当前节点已经完成了渲染工作
        completeUnitOfWork(fiber);//可以结束此fiber的渲染了 
        if (fiber.sibling) {//如果它有弟弟就返回弟弟
            return fiber.sibling;
        }
        fiber = fiber.return;//如果没有弟弟让爸爸完成，然后找叔叔
    }
}
function beginWork(fiber) {
    console.log('beginWork', fiber.key);
    //fiber.stateNode = document.createElement(fiber.type);
}
function completeUnitOfWork(fiber) {
    console.log('completeUnitOfWork', fiber.key);
}
nextUnitOfWork = rootFiber;
workLoop();
```

-   先儿子，后弟弟，再叔叔,辈份越小越优先
-   什么时候一个节点遍历完成? 没有子节点，或者所有子节点都遍历完成了
-   没爹了就表示全部遍历完成了

### 5.2 commit阶段

-   类比Git分支功能,从旧树中fork出来一份，在新分支进行添加、删除和更新操作，经过测试后进行提交

![fibercommit](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aeb9ed540c6846908545fc1e03042cff~tplv-k3u1fbpfcp-zoom-1.image)

![fibereffectlist4](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/81be456bb653416daf1ef12f5a906314~tplv-k3u1fbpfcp-zoom-1.image)

```js
let container = document.getElementById('root');
let C1 = { type: 'div', key: 'C1', props: { id: 'C1', children: [] } };
let C2 = { type: 'div', key: 'C2', props: { id: 'C2', children: [] } };
let B1 = { type: 'div', key: 'B1', props: { id: 'B1', children: [C1, C2] } };
let B2 = { type: 'div', key: 'B2', props: { id: 'B2', children: [] } };
let A1 = { type: 'div', key: 'A1', props: { id: 'A1', children: [B1, B2] } };


let nextUnitOfWork = null;
let workInProgressRoot = null;
function workLoop() {
    while (nextUnitOfWork) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
    if (!nextUnitOfWork) { //render阶段结束
        commitRoot();
    }
}
function commitRoot() {
    let fiber = workInProgressRoot.firstEffect;
    while (fiber) {
        console.log(fiber.key); //C1 C2 B1 B2 A1
        commitWork(fiber);
        fiber = fiber.nextEffect;
    }
    workInProgressRoot = null;
}
function commitWork(currentFiber) {
    currentFiber.return.stateNode.appendChild(currentFiber.stateNode);
}
function performUnitOfWork(fiber) {
    beginWork(fiber);
    if (fiber.child) {
        return fiber.child;
    }
    while (fiber) {
        completeUnitOfWork(fiber);
        if (fiber.sibling) {
            return fiber.sibling;
        }
        fiber = fiber.return;
    }
}
function beginWork(currentFiber) {
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = document.createElement(currentFiber.type);//创建真实DOM
        for (let key in currentFiber.props) {//循环属性赋赋值给真实DOM
            if (key !== 'children' && key !== 'key')
                currentFiber.stateNode.setAttribute(key, currentFiber.props[key]);
        }
    }
    let previousFiber;
    currentFiber.props.children.forEach((child, index) => {
        let childFiber = {
            tag: 'HOST',
            type: child.type,
            key: child.key,
            props: child.props,
            return: currentFiber,
            effectTag: 'PLACEMENT',
            nextEffect: null
        }
        if (index === 0) {
            currentFiber.child = childFiber;
        } else {
            previousFiber.sibling = childFiber;
        }
        previousFiber = childFiber;
    });
}
function completeUnitOfWork(currentFiber) {
    const returnFiber = currentFiber.return;
    if (returnFiber) {
        if (!returnFiber.firstEffect) {
            returnFiber.firstEffect = currentFiber.firstEffect;
        }
        if (currentFiber.lastEffect) {
            if (returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = currentFiber.firstEffect;
            }
            returnFiber.lastEffect = currentFiber.lastEffect;
        }

        if (currentFiber.effectTag) {
            if (returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = currentFiber;
            } else {
                returnFiber.firstEffect = currentFiber;
            }
            returnFiber.lastEffect = currentFiber;
        }
    }
}
console.log(container);

workInProgressRoot = {
    key: 'ROOT',
    stateNode: container,
    props: { children: [A1] }
};
nextUnitOfWork = workInProgressRoot;//从RootFiber开始，到RootFiber结束
workLoop();
```







## 1.实现虚拟DOM

### 1.1 src\index.js

```js
import React from './react';
//import ReactDOM from 'react-dom';
let element = (
  <div id="A1">
    <div id="B1">
      <div id="C1"></div>
      <div id="C2"></div>
    </div>
    <div id="B2"></div>
  </div>
)
console.log(element);
/* ReactDOM.render(
  element,
  document.getElementById('root')
);
*/
```

### 1.2 src\react.js

src\react.js

```js
import { ELEMENT_TEXT } from './constants';
function createElement(type, config, ...children) {
    delete config.__self;
    delete config.__source;
    return {
        type,
        props: {
            ...config,
            children: children.map(
                child => typeof child === "object" ?
                    child :
                    { type: ELEMENT_TEXT, props: { text: child, children: [] } })
        }
    }
}

let React = {
    createElement
}
export default React;
```

## 2.实现初次渲染

![collecting2](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/238122d43c6b44c98e984c99b68d5862~tplv-k3u1fbpfcp-zoom-1.image)

![fibereffectlistabc](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6459a61bf9384fcc9399e339b37969fd~tplv-k3u1fbpfcp-zoom-1.image)

![fibereffectlistwithchild3](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e44f73690ef547e9b71fdab57a8d31c3~tplv-k3u1fbpfcp-zoom-1.image)

### 2.1 index.js

```js
import React from './react';
import ReactDOM from './react-dom';
+let style = { border: '3px solid red', margin: '5px' };
+let element = (
+  <div  id="A1" style={style}>
+    A1
+    <div  id="B1" style={style}>
+      B1
+        <div  id="C1" style={style}>C1</div>
+      <div  id="C2" style={style}>C2</div>
+    </div>
+    <div  id="B2" style={style}>B2</div>
+  </div>
+)
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

### 2.2 constants.js

src\constants.js

```js
+export const ELEMENT_TEXT = Symbol.for('ELEMENT_TEXT');
+export const TAG_ROOT = Symbol.for('TAG_ROOT');
+export const TAG_HOST = Symbol.for('TAG_HOST');
+export const TAG_TEXT = Symbol.for('TAG_TEXT');
+export const PLACEMENT = Symbol.for('PLACEMENT');
```

### 2.3 utils.js

src\utils.js

```js
function setProp(dom, key, value) {
    if (/^on/.test(key)) {
        dom[key.toLowerCase()] = value;
    } else if (key === 'style') {
        if (value) {
            for (let styleName in value) {
                if (value.hasOwnProperty(styleName)) {
                    dom.style[styleName] = value[styleName];
                }
            }
        }
    } else {
        dom.setAttribute(key, value);
    }
    return dom;
}
export function setProps(elem, oldProps, newProps) {
    for (let key in oldProps) {
        if (key !== 'children') {
            if (newProps.hasOwnProperty(key)) {
                setProp(elem, key, newProps[key]);
            } else {
                elem.removeAttribute(key);
            }
        }
    }
    for (let key in newProps) {
        if (key !== 'children') {
            setProp(elem, key, newProps[key])
        }
    }
}
```

### 2.4 react-dom.js

src\react-dom.js

```js
import { TAG_ROOT } from './constants';
import { scheduleRoot } from './scheduler';

function render(element, container) {
    let rootFiber = {
        tag: TAG_ROOT,//这是根Fiber
        stateNode: container,//此Fiber对应的DOM节点
        props: { children: [element] },//子元素就是要渲染的element
    }
    scheduleRoot(rootFiber);
}

export default {
    render
}
```

### 2.4 scheduler.js

src\scheduler.js

```
import { setProps } from './utils';
import {
    ELEMENT_TEXT, TAG_ROOT, TAG_HOST, TAG_TEXT, PLACEMENT
} from './constants';

let workInProgressRoot = null;//正在渲染中的根Fiber
let nextUnitOfWork = null//下一个工作单元

export function scheduleRoot(rootFiber) {
    //把当前树设置为nextUnitOfWork开始进行调度
    workInProgressRoot = rootFiber;
    nextUnitOfWork = workInProgressRoot;
}

function commitRoot() {
    let currentFiber = workInProgressRoot.firstEffect;
    while (currentFiber) {
        commitWork(currentFiber);
        currentFiber = currentFiber.nextEffect;
    }
    workInProgressRoot = null;
}
function commitWork(currentFiber) {
    if (!currentFiber) {
        return;
    }
    let returnFiber = currentFiber.return;//先获取父Fiber
    const domReturn = returnFiber.stateNode;//获取父的DOM节点
    if (currentFiber.effectTag === PLACEMENT && currentFiber.stateNode != null) {//如果是新增DOM节点
        let nextFiber = currentFiber;
        domReturn.appendChild(nextFiber.stateNode);
    }
    currentFiber.effectTag = null;
}

function performUnitOfWork(currentFiber) {
    beginWork(currentFiber);//开始渲染前的Fiber,就是把子元素变成子fiber

    if (currentFiber.child) {//如果子节点就返回第一个子节点
        return currentFiber.child;
    }

    while (currentFiber) {//如果没有子节点说明当前节点已经完成了渲染工作
        completeUnitOfWork(currentFiber);//可以结束此fiber的渲染了 
        if (currentFiber.sibling) {//如果它有弟弟就返回弟弟
            return currentFiber.sibling;
        }
        currentFiber = currentFiber.return;//如果没有弟弟让爸爸完成，然后找叔叔
    }
}

function beginWork(currentFiber) {
    if (currentFiber.tag === TAG_ROOT) {//如果是根节点
        updateHostRoot(currentFiber);
    } else if (currentFiber.tag === TAG_TEXT) {//如果是原生文本节点
        updateHostText(currentFiber);
    } else if (currentFiber.tag === TAG_HOST) {//如果是原生DOM节点
        updateHostComponent(currentFiber);
    }
}

function updateHostRoot(currentFiber) {//如果是根节点
    const newChildren = currentFiber.props.children;//直接渲染子节点
    reconcileChildren(currentFiber, newChildren);
}
function updateHostText(currentFiber) {
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = createDOM(currentFiber);//先创建真实的DOM节点
    }
}
function updateHostComponent(currentFiber) {//如果是原生DOM节点
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = createDOM(currentFiber);//先创建真实的DOM节点
    }
    const newChildren = currentFiber.props.children;
    reconcileChildren(currentFiber, newChildren);
}
function createDOM(currentFiber) {
    if (currentFiber.type === ELEMENT_TEXT) {
        return document.createTextNode(currentFiber.props.text);
    }
    const stateNode = document.createElement(currentFiber.type);
    updateDOM(stateNode, {}, currentFiber.props);
    return stateNode;
}

function reconcileChildren(currentFiber, newChildren) {
    let newChildIndex = 0;//新虚拟DOM数组中的索引
    let prevSibling;
    while (newChildIndex < newChildren.length) {
        const newChild = newChildren[newChildIndex];
        let tag;
        if (newChild && newChild.type === ELEMENT_TEXT) {
            tag = TAG_TEXT;//文本
        } else if (newChild && typeof newChild.type === 'string') {
            tag = TAG_HOST;//原生DOM组件
        }
        let newFiber = {
            tag,//原生DOM组件
            type: newChild.type,//具体的元素类型
            props: newChild.props,//新的属性对象
            stateNode: null,//stateNode肯定是空的
            return: currentFiber,//父Fiber
            effectTag: PLACEMENT,//副作用标识
            nextEffect: null
        }
        if (newFiber) {
            if (newChildIndex === 0) {
                currentFiber.child = newFiber;//第一个子节点挂到父节点的child属性上
            } else {
                prevSibling.sibling = newFiber;
            }
            prevSibling = newFiber;//然后newFiber变成了上一个哥哥了
        }
        prevSibling = newFiber;//然后newFiber变成了上一个哥哥了
        newChildIndex++;
    }
}

function updateDOM(stateNode, oldProps, newProps) {
    setProps(stateNode, oldProps, newProps);
}
function completeUnitOfWork(currentFiber) {
    const returnFiber = currentFiber.return;
    if (returnFiber) {
        if (!returnFiber.firstEffect) {
            returnFiber.firstEffect = currentFiber.firstEffect;
        }
        if (!!currentFiber.lastEffect) {
            if (!!returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = currentFiber.firstEffect;
            }
            returnFiber.lastEffect = currentFiber.lastEffect;
        }

        const effectTag = currentFiber.effectTag;
        if (effectTag) {
            if (!!returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = currentFiber;
            } else {
                returnFiber.firstEffect = currentFiber;
            }
            returnFiber.lastEffect = currentFiber;
        }
    }
}

function workLoop(deadline) {
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);//执行一个任务并返回下一个任务
        shouldYield = deadline.timeRemaining() < 1;//如果剩余时间小于1毫秒就说明没有时间了，需要把控制权让给浏览器
    }
    //如果没有下一个执行单元了，并且当前渲染树存在，则进行提交阶段
    if (!nextUnitOfWork && workInProgressRoot) {
        commitRoot();
    }
    requestIdleCallback(workLoop);
}
//开始在空闲时间执行workLoop
requestIdleCallback(workLoop);
```

## 3.实现元素的更新

![updatecomponent](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/219e8f526ad846bdbec7af0be6fb26ca~tplv-k3u1fbpfcp-zoom-1.image)

![alternate2](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58ee77b2f38746e7ad25a0c77de09aeb~tplv-k3u1fbpfcp-zoom-1.image)

### 3.1 public\index.html

```
<body>
  <div id="root"></div>
  <button id="reRender1">reRender1</button>
  <button id="reRender2">reRender2</button>
</body>
```

### 3.2 src\index.js

src\index.js

```
import React from './react';
import ReactDOM from './react-dom';
let style = { border: '3px solid red', margin: '5px' };
let element = (
  <div id="A1" style={style}>
    A1
    <div id="B1" style={style}>
      B1
      <div id="C1" style={style}>C1</div>
      <div id="C2" style={style}>C2</div>
    </div>
    <div id="B2" style={style}>B2</div>
  </div>
)
console.log(element);
ReactDOM.render(
  element,
  document.getElementById('root')
);

+let reRender2 = document.getElementById('reRender2');
+reRender2.addEventListener('click', () => {
+  let element2 = (
+    <div id="A1-new" style={style}>
+      A1-new
+      <div id="B1-new" style={style}>
+        B1-new
+        <div id="C1-new" style={style}>C1-new</div>
+        <div id="C2-new" style={style}>C2-new</div>
+      </div>
+      <div id="B2" style={style}>B2</div>
+      <div id="B3" style={style}>B3</div>
+    </div>
+  )
+  ReactDOM.render(
+    element2,
+    document.getElementById('root')
+  );
+});
+
+let reRender3 = document.getElementById('reRender3');
+reRender3.addEventListener('click', () => {
+  let element3 = (
+    <div id="A1-new2" style={style}>
+      A1-new2
+      <div id="B1-new2" style={style}>
+        B1-new2
+        <div id="C1-new2" style={style}>C1-new2</div>
+        <div id="C2-new2" style={style}>C2-new2</div>
+      </div>
+      <div id="B2" style={style}>B2</div>
+    </div>
+  )
+  ReactDOM.render(
+    element3,
+    document.getElementById('root')
+  );
+});
```

### 3.3 src\constants.js

```
export const ELEMENT_TEXT = Symbol.for('ELEMENT_TEXT');

export const TAG_ROOT = Symbol.for('TAG_ROOT');
export const TAG_HOST = Symbol.for('TAG_HOST');
export const TAG_TEXT = Symbol.for('TAG_TEXT');

export const PLACEMENT = Symbol.for('PLACEMENT');
+export const UPDATE = Symbol.for('UPDATE');
+export const DELETION = Symbol.for('DELETION');
```

### 3.4 scheduler.js

src\scheduler.js

```
import { setProps } from './utils';
import {
    ELEMENT_TEXT, TAG_ROOT, TAG_HOST, TAG_TEXT, PLACEMENT, DELETION, UPDATE
} from './constants';
+let currentRoot = null;//当前的根Fiber
let workInProgressRoot = null;//正在渲染中的根Fiber
let nextUnitOfWork = null//下一个工作单元
+let deletions = [];//要删除的fiber节点

export function scheduleRoot(rootFiber) {
    //{tag:TAG_ROOT,stateNode:container,props: { children: [element] }}
+    if (currentRoot && currentRoot.alternate) {//偶数次更新
+        workInProgressRoot = currentRoot.alternate;
+        workInProgressRoot.firstEffect = workInProgressRoot.lastEffect = workInProgressRoot.nextEffect = null;
+        workInProgressRoot.props = rootFiber.props;
+        workInProgressRoot.alternate = currentRoot;
+    } else if (currentRoot) {//奇数次更新
+        rootFiber.alternate = currentRoot;
+        workInProgressRoot = rootFiber;
+    } else {
+        workInProgressRoot = rootFiber;//第一次渲染
+    }
    nextUnitOfWork = workInProgressRoot;
}

function commitRoot() {
+    deletions.forEach(commitWork);
    let currentFiber = workInProgressRoot.firstEffect;
    while (currentFiber) {
        commitWork(currentFiber);
        currentFiber = currentFiber.nextEffect;
    }
+    deletions.length = 0;//先把要删除的节点清空掉
+    currentRoot = workInProgressRoot;
    workInProgressRoot = null;
}
function commitWork(currentFiber) {
    if (!currentFiber) {
        return;
    }
    let returnFiber = currentFiber.return;//先获取父Fiber
    const domReturn = returnFiber.stateNode;//获取父的DOM节点
    if (currentFiber.effectTag === PLACEMENT && currentFiber.stateNode != null) {//如果是新增DOM节点
        let nextFiber = currentFiber;
        domReturn.appendChild(nextFiber.stateNode);
+    } else if (currentFiber.effectTag === DELETION) {//如果是删除则删除并返回
+        domReturn.removeChild(currentFiber.stateNode);
+    } else if (currentFiber.effectTag === UPDATE && currentFiber.stateNode != null) {//如果是更新
+        if (currentFiber.type === ELEMENT_TEXT) {
+            if (currentFiber.alternate.props.text != currentFiber.props.text) {
+                currentFiber.stateNode.textContent = currentFiber.props.text;
+            }
+        } else {
+            updateDOM(currentFiber.stateNode, currentFiber.alternate.props, currentFiber.props);
+        }
+    }
    currentFiber.effectTag = null;
}

function performUnitOfWork(currentFiber) {
    beginWork(currentFiber);//开始渲染前的Fiber,就是把子元素变成子fiber

    if (currentFiber.child) {//如果子节点就返回第一个子节点
        return currentFiber.child;
    }

    while (currentFiber) {//如果没有子节点说明当前节点已经完成了渲染工作
        completeUnitOfWork(currentFiber);//可以结束此fiber的渲染了 
        if (currentFiber.sibling) {//如果它有弟弟就返回弟弟
            return currentFiber.sibling;
        }
        currentFiber = currentFiber.return;//如果没有弟弟让爸爸完成，然后找叔叔
    }
}

function beginWork(currentFiber) {
    if (currentFiber.tag === TAG_ROOT) {//如果是根节点
        updateHostRoot(currentFiber);
    } else if (currentFiber.tag === TAG_TEXT) {//如果是原生文本节点
        updateHostText(currentFiber);
    } else if (currentFiber.tag === TAG_HOST) {//如果是原生DOM节点
        updateHostComponent(currentFiber);
    }
}
function updateHostRoot(currentFiber) {//如果是根节点
    const newChildren = currentFiber.props.children;//直接渲染子节点
    reconcileChildren(currentFiber, newChildren);
}
function updateHostText(currentFiber) {
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = createDOM(currentFiber);//先创建真实的DOM节点
    }
}
function updateHostComponent(currentFiber) {//如果是原生DOM节点
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = createDOM(currentFiber);//先创建真实的DOM节点
    }
    const newChildren = currentFiber.props.children;
    reconcileChildren(currentFiber, newChildren);
}
function createDOM(currentFiber) {
    if (currentFiber.type === ELEMENT_TEXT) {
        return document.createTextNode(currentFiber.props.text);
    }
    const stateNode = document.createElement(currentFiber.type);
    updateDOM(stateNode, {}, currentFiber.props);
    return stateNode;
}

function reconcileChildren(currentFiber, newChildren) {
    let newChildIndex = 0;//新虚拟DOM数组中的索引
+    let oldFiber = currentFiber.alternate && currentFiber.alternate.child;//父Fiber中的第一个子Fiber
+    let prevSibling;
+    while (newChildIndex < newChildren.length || oldFiber) {
+        const newChild = newChildren[newChildIndex];
+        let newFiber;
+        const sameType = oldFiber && newChild && newChild.type === oldFiber.type;//新旧都有，并且元素类型一样
+        let tag;
+        if (newChild && newChild.type === ELEMENT_TEXT) {
+            tag = TAG_TEXT;//文本
+        } else if (newChild && typeof newChild.type === 'string') {
+            tag = TAG_HOST;//原生DOM组件
+        }
+        if (sameType) {
+            if (oldFiber.alternate) {
+                newFiber = oldFiber.alternate;
+                newFiber.props = newChild.props;
+                newFiber.alternate = oldFiber;
+                newFiber.effectTag = UPDATE;
+                newFiber.nextEffect = null;
+            } else {
+                newFiber = {
+                    tag:oldFiber.tag,//标记Fiber类型，例如是函数组件或者原生组件
+                    type: oldFiber.type,//具体的元素类型
+                    props: newChild.props,//新的属性对象
+                    stateNode: oldFiber.stateNode,//原生组件的话就存放DOM节点，类组件的话是类组件实例，函数组件的话为空，因为没有实例
+                    return: currentFiber,//父Fiber
+                    alternate: oldFiber,//上一个Fiber 指向旧树中的节点
+                    effectTag: UPDATE,//副作用标识
+                    nextEffect: null //React 同样使用链表来将所有有副作用的Fiber连接起来
+                }
+            }
+        } else {
+            if (newChild) {//类型不一样，创建新的Fiber,旧的不复用了
+                newFiber = {
+                    tag,//原生DOM组件
+                    type: newChild.type,//具体的元素类型
+                    props: newChild.props,//新的属性对象
+                    stateNode: null,//stateNode肯定是空的
+                    return: currentFiber,//父Fiber
+                    effectTag: PLACEMENT//副作用标识
+                }
+            }
+            if (oldFiber) {
+                oldFiber.effectTag = DELETION;
+                deletions.push(oldFiber);
+            }
+        }
+        if (oldFiber) {  //比较完一个元素了，老Fiber向后移动1位
+            oldFiber = oldFiber.sibling;
+        }
       if (newFiber) {
            if (newChildIndex === 0) {
                currentFiber.child = newFiber;//第一个子节点挂到父节点的child属性上
            } else {
                prevSibling.sibling = newFiber;
            }
            prevSibling = newFiber;//然后newFiber变成了上一个哥哥了
        }
        prevSibling = newFiber;//然后newFiber变成了上一个哥哥了
        newChildIndex++;
    }
}

function updateDOM(stateNode, oldProps, newProps) {
    setProps(stateNode, oldProps, newProps);
}
function completeUnitOfWork(currentFiber) {
    const returnFiber = currentFiber.return;
    if (returnFiber) {
        if (!returnFiber.firstEffect) {
            returnFiber.firstEffect = currentFiber.firstEffect;
        }
        if (!!currentFiber.lastEffect) {
            if (!!returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = currentFiber.firstEffect;
            }
            returnFiber.lastEffect = currentFiber.lastEffect;
        }

        const effectTag = currentFiber.effectTag;
        if (effectTag) {
            if (!!returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = currentFiber;
            } else {
                returnFiber.firstEffect = currentFiber;
            }
            returnFiber.lastEffect = currentFiber;
        }
    }
}

function workLoop(deadline) {
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);//执行一个任务并返回下一个任务
        shouldYield = deadline.timeRemaining() < 1;//如果剩余时间小于1毫秒就说明没有时间了，需要把控制权让给浏览器
    }
    //如果没有下一个执行单元了，并且当前渲染树存在，则进行提交阶段
    if (!nextUnitOfWork && workInProgressRoot) {
        commitRoot();
    }
    requestIdleCallback(workLoop);
}
//开始在空闲时间执行workLoop
requestIdleCallback(workLoop);
```

## 4.实现类组件

![singlelink2](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ab7ed542ec84e158e988554c496c0ad~tplv-k3u1fbpfcp-zoom-1.image)

![fiberdoublebuffer](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29053f036b734e339d887bd673af3136~tplv-k3u1fbpfcp-zoom-1.image)

### 4.1 src\index.js

```
import React from './react';
import ReactDOM from './react-dom';
+class ClassCounter extends React.Component {
+  constructor(props) {
+    super(props);
+    this.state = { number: 0 };
+  }
+  onClick = () => {
+    this.setState(state => ({ number: state.number + 1 }));
+  }
+  render() {
+    return (
+      <div id="counter">
+        <span>{this.state.number}</span>
+        <button onClick={this.onClick}>加1</button>
+      </div >
+    )
+  }
+}
ReactDOM.render(
+  <ClassCounter />,
  document.getElementById('root')
);
```

### 4.2 src\react.js

src\react.js

```
import { ELEMENT_TEXT } from './constants';
+import { Update, UpdateQueue } from './updateQueue';
+import { scheduleRoot } from './scheduler';
function createElement(type, config, ...children) {
    delete config.__self;
    delete config.__source;
    return {
        type,
        props: {
            ...config,
            children: children.map(
                child => typeof child === "object" ?
                    child :
                    { type: ELEMENT_TEXT, props: { text: child, children: [] } })
        }
    }
}
+class Component {
+    constructor(props) {
+        this.props = props;
+        this.updateQueue = new UpdateQueue();
+    }
+    setState(payload) {
+        this.internalFiber.updateQueue.enqueueUpdate(new Update(payload));
+        scheduleRoot();
+    }
+}
+Component.prototype.isReactComponent = true;
let React = {
    createElement,
+    Component
}
export default React;
```

### 4.3 constants.js

src\constants.js

```
export const ELEMENT_TEXT = Symbol.for('ELEMENT_TEXT');

export const TAG_ROOT = Symbol.for('TAG_ROOT');
export const TAG_HOST = Symbol.for('TAG_HOST');
export const TAG_TEXT = Symbol.for('TAG_TEXT');
+export const TAG_CLASS = Symbol.for('TAG_CLASS');

export const UPDATE = Symbol.for('UPDATE');
export const PLACEMENT = Symbol.for('PLACEMENT');
export const DELETION = Symbol.for('DELETION');
```

### 4.4 updateQueue.js

src\updateQueue.js

```
export class Update {
    constructor(payload) {
        this.payload = payload;
    }
}
export class UpdateQueue {
    constructor() {
        this.firstUpdate = null;
        this.lastUpdate = null;
    }
    enqueueUpdate(update) {
        if (this.lastUpdate === null) {
            this.firstUpdate = this.lastUpdate = update;
        } else {
            this.lastUpdate.nextUpdate = update;
            this.lastUpdate = update;
        }
    }
    forceUpdate(state) {
        let currentUpdate = this.firstUpdate;
        while (currentUpdate) {
            state = typeof currentUpdate.payload == 'function' ? currentUpdate.payload(state) : currentUpdate.payload;
            currentUpdate = currentUpdate.nextUpdate;
        }
        this.firstUpdate = this.lastUpdate = null;
        return state;
    }
}
```

### 4.5 utils.js

src\utils.js

```
function setProp(dom, key, value) {
    if (/^on/.test(key)) {
        dom[key.toLowerCase()] = value;
    } else if (key === 'style') {
        if (value) {
            for (let styleName in value) {
                if (value.hasOwnProperty(styleName)) {
                    dom.style[styleName] = value[styleName];
                }
            }
        }
    } else {
        dom.setAttribute(key, value);
    }
    return dom;
}
export function setProps(elem, oldProps, newProps) {
    for (let key in oldProps) {
        if (key !== 'children') {
            if (newProps.hasOwnProperty(key)) {
                setProp(elem, key, newProps[key]);
            } else {
                elem.removeAttribute(key);
            }
        }
    }
    for (let key in newProps) {
        if (key !== 'children') {
            setProp(elem, key, newProps[key])
        }
    }
}

+export function deepEquals(obj1, obj2) {
+    let { children: oldChildren, ...oldProps } = obj1;
+    let { children: newChildren, ...newProps } = obj2;
+    return JSON.stringify(oldProps) === JSON.stringify(newProps);
+}
```

### 4.6 scheduler.js

src\scheduler.js

```
import { setProps,deepEquals } from './utils';
+import { UpdateQueue } from './updateQueue';
+import _ from 'lodash';
import {
+    ELEMENT_TEXT, TAG_ROOT, TAG_HOST, TAG_TEXT, TAG_CLASS, PLACEMENT, DELETION, UPDATE
} from './constants';
let currentRoot = null;        //当前的根Fiber
let workInProgressRoot = null; //正在渲染中的根Fiber
let nextUnitOfWork = null;     //下一个工作单元
let deletions = [];            //要删除的fiber节点

export function scheduleRoot(rootFiber) {
+    if (currentRoot && currentRoot.alternate) {
+        workInProgressRoot = currentRoot.alternate;
+        workInProgressRoot.alternate = currentRoot;
+        if (rootFiber) {
+            workInProgressRoot.props = rootFiber.props;
+        }
+    } else if (currentRoot) {
+        if (rootFiber) {
+            rootFiber.alternate = currentRoot;
+            workInProgressRoot = rootFiber;
+        } else {
+            workInProgressRoot = {
+                ...currentRoot,
+                alternate: currentRoot
+            }
+        }
+    } else {
+        workInProgressRoot = rootFiber;
+    }
+    workInProgressRoot.firstEffect = workInProgressRoot.lastEffect = workInProgressRoot.nextEffect = null;
+    nextUnitOfWork = workInProgressRoot;
+}

function commitRoot() {
    deletions.forEach(commitWork);
    let currentFiber = workInProgressRoot.firstEffect;
    while (currentFiber) {
        commitWork(currentFiber);
        currentFiber = currentFiber.nextEffect;
    }
    deletions.length = 0;//先把要删除的节点清空掉
+   workInProgressRoot.firstEffect = workInProgressRoot.lastEffect = null;//清除effect list
    currentRoot = workInProgressRoot;
    workInProgressRoot = null;
}
function commitWork(currentFiber) {
+     if (!currentFiber) {
+        return;
+    }
    let returnFiber = currentFiber.return;//先获取父Fiber
+    while (returnFiber.tag !== TAG_HOST && returnFiber.tag !== TAG_ROOT && returnFiber.tag !== TAG_TEXT) {//如果不是DOM节点就一直向上找,比如ClassCounter
+        returnFiber = returnFiber.return;
+    }
    const domReturn = returnFiber.stateNode;//获取父的DOM节点
    if (currentFiber.effectTag === PLACEMENT && currentFiber.stateNode != null) {//如果是新增DOM节点
+        let nextFiber = currentFiber;
+        while (nextFiber.tag !== TAG_HOST && nextFiber.tag !== TAG_TEXT) {
+            nextFiber = nextFiber.child;//必须向下找到一个DOM节点 比如Class Counter
+        }
        domReturn.appendChild(nextFiber.stateNode);
    } else if (currentFiber.effectTag === DELETION) {//如果是删除则删除并返回
+        commitDeletion(currentFiber, domReturn);
    } else if (currentFiber.effectTag === UPDATE && currentFiber.stateNode != null) {//如果是更新
        if (currentFiber.type === ELEMENT_TEXT) {
            if (currentFiber.alternate.props.text !== currentFiber.props.text) {
                currentFiber.stateNode.textContent = currentFiber.props.text;
            }
        } else {
            updateDOM(currentFiber.stateNode, currentFiber.alternate.props, currentFiber.props);
        }
    }
    currentFiber.effectTag = null;
}
+function commitDeletion(currentFiber, domReturn) {
+    if (currentFiber.tag === TAG_HOST || currentFiber.tag === TAG_TEXT) {
+        domReturn.removeChild(currentFiber.stateNode);
+    } else {
+        commitDeletion(currentFiber.child, domReturn);
+    }
+}
function performUnitOfWork(currentFiber) {
    beginWork(currentFiber);//开始渲染前的Fiber,就是把子元素变成子fiber

    if (currentFiber.child) {//如果子节点就返回第一个子节点
        return currentFiber.child;
    }

    while (currentFiber) {//如果没有子节点说明当前节点已经完成了渲染工作
        completeUnitOfWork(currentFiber);//可以结束此fiber的渲染了 
        if (currentFiber.sibling) {//如果它有弟弟就返回弟弟
            return currentFiber.sibling;
        }
        currentFiber = currentFiber.return;//如果没有弟弟让爸爸完成，然后找叔叔
    }
}

function beginWork(currentFiber) {
    if (currentFiber.tag === TAG_ROOT) {//如果是根节点
        updateHostRoot(currentFiber);
    } else if (currentFiber.tag === TAG_TEXT) {//如果是原生文本节点
        updateHostText(currentFiber);
    } else if (currentFiber.tag === TAG_HOST) {//如果是原生DOM节点
        updateHostComponent(currentFiber);
+    } else if (currentFiber.tag === TAG_CLASS) {//如果是类组件
+        updateClassComponent(currentFiber)
+    }
}
+function updateClassComponent(currentFiber) {
+    if (currentFiber.stateNode === null) {
+        currentFiber.stateNode = new currentFiber.type(currentFiber.props);
+        currentFiber.stateNode.internalFiber = currentFiber;
+        currentFiber.updateQueue = new UpdateQueue();
+    }
+    currentFiber.stateNode.state = currentFiber.updateQueue.forceUpdate(currentFiber.stateNode.state);
+    const newChildren = [currentFiber.stateNode.render()];
+    reconcileChildren(currentFiber, newChildren);
+}
function updateHostText(currentFiber) {
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = createDOM(currentFiber);//先创建真实的DOM节点
    }
}
function updateHostRoot(currentFiber) {//如果是根节点
    const newChildren = currentFiber.props.children;//直接渲染子节点
    reconcileChildren(currentFiber, newChildren);
}

function updateHostComponent(currentFiber) {//如果是原生DOM节点
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = createDOM(currentFiber);//先创建真实的DOM节点
    }
    const newChildren = currentFiber.props.children;
    reconcileChildren(currentFiber, newChildren);
}
function createDOM(currentFiber) {
    if (currentFiber.type === ELEMENT_TEXT) {
        return document.createTextNode(currentFiber.props.text);
    }
    const stateNode = document.createElement(currentFiber.type);
    updateDOM(stateNode, {}, currentFiber.props);
    return stateNode;
}

function reconcileChildren(currentFiber, newChildren) {
    let newChildIndex = 0;//新虚拟DOM数组中的索引
    let oldFiber = currentFiber.alternate && currentFiber.alternate.child;//父Fiber中的第一个子Fiber
+   if (oldFiber) oldFiber.firstEffect = oldFiber.lastEffect = oldFiber.nextEffect = null;
    let prevSibling;
    while (newChildIndex < newChildren.length || oldFiber) {
        const newChild = newChildren[newChildIndex];
        let newFiber;
        const sameType = oldFiber && newChild && newChild.type === oldFiber.type;//新旧都有，并且元素类型一样
        let tag;
+        if (newChild && typeof newChild.type === 'function' && newChild.type.prototype.isReactComponent) {
+            tag = TAG_CLASS;//类组件
+        } else if (newChild && newChild.type === ELEMENT_TEXT) {
            tag = TAG_TEXT;//文本
        } else if (newChild && typeof newChild.type === 'string') {
            tag = TAG_HOST;//原生DOM组件
        }
        if (sameType) {
+            let { children: oldChildren, ...oldProps } = oldFiber.props;
+            let { children: newChildren, ...newProps } = newChild.props;
+            newFiber = {
+                tag,//标记Fiber类型，例如是函数组件或者原生组件
+                type: oldFiber.type,//具体的元素类型
+                props: newChild.props,//新的属性对象
+                stateNode: oldFiber.stateNode,//原生组件的话就存放DOM节点，类组件的话是类组件实例，函数组件的话为空，因为没有实例
+                return: currentFiber,//父Fiber
+                updateQueue: oldFiber.updateQueue || new UpdateQueue(),
+                alternate: oldFiber,//上一个Fiber 指向旧树中的节点
+                effectTag: deepEquals(oldProps, newProps) ? null : UPDATE,//副作用标识
+            }
        } else {
            if (newChild) {//类型不一样，创建新的Fiber,旧的不复用了
                newFiber = {
                    tag,//原生DOM组件
                    type: newChild.type,//具体的元素类型
                    props: newChild.props,//新的属性对象
                    stateNode: null,//stateNode肯定是空的
                    return: currentFiber,//父Fiber
                    effectTag: PLACEMENT//副作用标识
                }
            }
            if (oldFiber) {
                oldFiber.effectTag = DELETION;
                deletions.push(oldFiber);
            }
        }
        if (oldFiber) {  //比较完一个元素了，老Fiber向后移动1位
            oldFiber = oldFiber.sibling;
        }
       if (newFiber) {
            if (newChildIndex === 0) {
                currentFiber.child = newFiber;//第一个子节点挂到父节点的child属性上
            } else {
                prevSibling.sibling = newFiber;
            }
            prevSibling = newFiber;//然后newFiber变成了上一个哥哥了
        }
        newChildIndex++;
    }
}

function updateDOM(stateNode, oldProps, newProps) {
    setProps(stateNode, oldProps, newProps);
}
function completeUnitOfWork(currentFiber) {
    const returnFiber = currentFiber.return;
    if (returnFiber) {
        if (!returnFiber.firstEffect) {
            returnFiber.firstEffect = currentFiber.firstEffect;
        }
        if (!!currentFiber.lastEffect) {
            if (!!returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = currentFiber.firstEffect;
            }
            returnFiber.lastEffect = currentFiber.lastEffect;
        }

        const effectTag = currentFiber.effectTag;
        if (effectTag) {
            if (!!returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = currentFiber;
            } else {
                returnFiber.firstEffect = currentFiber;
            }
            returnFiber.lastEffect = currentFiber;
        }
    }
}

function workLoop(deadline) {
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);//执行一个任务并返回下一个任务
        shouldYield = deadline.timeRemaining() < 1;//如果剩余时间小于1毫秒就说明没有时间了，需要把控制权让给浏览器
    }
    //如果没有下一个执行单元了，并且当前渲染树存在，则进行提交阶段
    if (!nextUnitOfWork && workInProgressRoot) {
        commitRoot();
    }
    requestIdleCallback(workLoop);
}
//开始在空闲时间执行workLoop
requestIdleCallback(workLoop);
```

## 5.实现函数组件

### 5.1 src\index.js

src\index.js

```
+function FunctionCounter() {
+  return (
+    <h1>
+      Count:0
+    </h1>
+  )
+}
ReactDOM.render(
+  <FunctionCounter />,
   document.getElementById('root')
);
```

### 5.2 constants.js

src\constants.js

```
export const ELEMENT_TEXT = Symbol.for('ELEMENT_TEXT');

export const TAG_ROOT = Symbol.for('TAG_ROOT');
export const TAG_HOST = Symbol.for('TAG_HOST');
export const TAG_TEXT = Symbol.for('TAG_TEXT');
export const TAG_CLASS = Symbol.for('TAG_CLASS');
+export const TAG_FUNCTION = Symbol.for('TAG_FUNCTION');
export const UPDATE = Symbol.for('UPDATE');
export const PLACEMENT = Symbol.for('PLACEMENT');
export const DELETION = Symbol.for('DELETION');
```

### 5.3 scheduler.js

src\scheduler.js

```
import { setProps, deepEquals } from './utils';
import { UpdateQueue } from './updateQueue';
+import {
+    ELEMENT_TEXT, TAG_ROOT, TAG_HOST, TAG_TEXT, TAG_CLASS, TAG_FUNCTION, PLACEMENT, DELETION, UPDATE
+} from './constants';
let currentRoot = null;        //当前的根Fiber
let workInProgressRoot = null; //正在渲染中的根Fiber
let nextUnitOfWork = null;     //下一个工作单元
let deletions = [];            //要删除的fiber节点

export function scheduleRoot(rootFiber) {
    if (rootFiber) {
        workInProgressRoot = rootFiber; //把当前树设置为nextUnitOfWork开始进行调度
    } else {
        if (currentRoot.alternate) {
            workInProgressRoot = currentRoot.alternate;
            workInProgressRoot.alternate = currentRoot;
        } else {
            workInProgressRoot = {
                ...currentRoot,
                alternate: currentRoot
            }
        }
    }
    deletions.length = 0;
    nextUnitOfWork = workInProgressRoot;
}

function commitRoot() {
    deletions.forEach(commitWork);
    let currentFiber = workInProgressRoot.firstEffect;
    while (currentFiber) {
        commitWork(currentFiber);
        currentFiber = currentFiber.nextEffect;
    }
    deletions.length = 0;//先把要删除的节点清空掉
    workInProgressRoot.firstEffect = workInProgressRoot.lastEffect = null;
    currentRoot = workInProgressRoot;
    workInProgressRoot = null;
}
function commitWork(currentFiber) {
    if (!currentFiber) {
        return;
    }
    let returnFiber = currentFiber.return;//先获取父Fiber
    while (returnFiber.tag !== TAG_HOST && returnFiber.tag !== TAG_ROOT && returnFiber.tag !== TAG_TEXT) {//如果不是DOM节点就一直向上找
        returnFiber = returnFiber.return;
    }
    const domReturn = returnFiber.stateNode;//获取父的DOM节点
    if (currentFiber.effectTag === PLACEMENT && currentFiber.stateNode != null) {//如果是新增DOM节点
        let nextFiber = currentFiber;
        while (nextFiber.tag !== TAG_HOST && nextFiber.tag !== TAG_TEXT) {//必须向下找到一个DOM节点
            nextFiber = nextFiber.child;
        }
        domReturn.appendChild(nextFiber.stateNode);
    } else if (currentFiber.effectTag === DELETION) {//如果是删除则删除并返回
        commitDeletion(currentFiber, domReturn);
    } else if (currentFiber.effectTag === UPDATE && currentFiber.stateNode != null) {//如果是更新
        if (currentFiber.type === ELEMENT_TEXT) {
            if (currentFiber.alternate.props.text !== currentFiber.props.text) {
                currentFiber.stateNode.textContent = currentFiber.props.text;
            }
        } else {
            updateDOM(currentFiber.stateNode, currentFiber.alternate.props, currentFiber.props);
        }
    }
    currentFiber.effectTag = null;
}
function commitDeletion(currentFiber, domReturn) {
    if (currentFiber.tag === TAG_HOST || currentFiber.tag === TAG_TEXT) {
        domReturn.removeChild(currentFiber.stateNode);
    } else {
        commitDeletion(currentFiber.child, domReturn);
    }
}
function performUnitOfWork(currentFiber) {
    beginWork(currentFiber);//开始渲染前的Fiber,就是把子元素变成子fiber

    if (currentFiber.child) {//如果子节点就返回第一个子节点
        return currentFiber.child;
    }

    while (currentFiber) {//如果没有子节点说明当前节点已经完成了渲染工作
        completeUnitOfWork(currentFiber);//可以结束此fiber的渲染了 
        if (currentFiber.sibling) {//如果它有弟弟就返回弟弟
            return currentFiber.sibling;
        }
        currentFiber = currentFiber.return;//如果没有弟弟让爸爸完成，然后找叔叔
    }
}

function beginWork(currentFiber) {
    if (currentFiber.tag === TAG_ROOT) {//如果是根节点
        updateHostRoot(currentFiber);
    } else if (currentFiber.tag === TAG_TEXT) {//如果是原生文本节点
        updateHostText(currentFiber);
    } else if (currentFiber.tag === TAG_HOST) {//如果是原生DOM节点
        updateHostComponent(currentFiber);
    } else if (currentFiber.tag === TAG_CLASS) {//如果是类组件
        updateClassComponent(currentFiber)
+    } else if (currentFiber.tag === TAG_FUNCTION) {//如果是函数组件
+        updateFunctionComponent(currentFiber);
+    }
}
+function updateFunctionComponent(currentFiber) {
+    const newChildren = [currentFiber.type(currentFiber.props)];
+    reconcileChildren(currentFiber, newChildren);
+}
function updateClassComponent(currentFiber) {
    if (currentFiber.stateNode === null) {
        currentFiber.stateNode = new currentFiber.type(currentFiber.props);
        currentFiber.stateNode.internalFiber = currentFiber;
        currentFiber.updateQueue = new UpdateQueue();
    }
    currentFiber.stateNode.state = currentFiber.updateQueue.forceUpdate(currentFiber.stateNode.state);
    const newChildren = [currentFiber.stateNode.render()];
    reconcileChildren(currentFiber, newChildren);
}
function updateHostText(currentFiber) {
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = createDOM(currentFiber);//先创建真实的DOM节点
    }
}
function updateHostRoot(currentFiber) {//如果是根节点
    const newChildren = currentFiber.props.children;//直接渲染子节点
    reconcileChildren(currentFiber, newChildren);
}

function updateHostComponent(currentFiber) {//如果是原生DOM节点
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = createDOM(currentFiber);//先创建真实的DOM节点
    }
    const newChildren = currentFiber.props.children;
    reconcileChildren(currentFiber, newChildren);
}
function createDOM(currentFiber) {
    if (currentFiber.type === ELEMENT_TEXT) {
        return document.createTextNode(currentFiber.props.text);
    }
    const stateNode = document.createElement(currentFiber.type);
    updateDOM(stateNode, {}, currentFiber.props);
    return stateNode;
}

function reconcileChildren(currentFiber, newChildren) {
    let newChildIndex = 0;//新虚拟DOM数组中的索引
    let oldFiber = currentFiber.alternate && currentFiber.alternate.child;//父Fiber中的第一个子Fiber
    let prevSibling;
    while (newChildIndex < newChildren.length || oldFiber) {
        const newChild = newChildren[newChildIndex];
        let newFiber;
        const sameType = oldFiber && newChild && newChild.type === oldFiber.type;//新旧都有，并且元素类型一样
        let tag;
        if (newChild && typeof newChild.type === 'function' && newChild.type.prototype.isReactComponent) {
            tag = TAG_CLASS;//类组件
+        } else if (newChild && typeof newChild.type === 'function') {
+            tag = TAG_FUNCTION;//函数组件
+        } else if (newChild && newChild.type === ELEMENT_TEXT) {
            tag = TAG_TEXT;//文本
        } else if (newChild && typeof newChild.type === 'string') {
            tag = TAG_HOST;//原生DOM组件
        }
        if (sameType) {
            newFiber = {
                tag,//标记Fiber类型，例如是函数组件或者原生组件
                type: oldFiber.type,//具体的元素类型
                props: newChild.props,//新的属性对象
                stateNode: oldFiber.stateNode,//原生组件的话就存放DOM节点，类组件的话是类组件实例，函数组件的话为空，因为没有实例
                return: currentFiber,//父Fiber
                updateQueue: oldFiber.updateQueue || new UpdateQueue(),
                alternate: oldFiber,//上一个Fiber 指向旧树中的节点
                effectTag: deepEquals(oldFiber.props, newChild.props) ? null : UPDATE,//副作用标识
            }
        } else {
            if (newChild) {//类型不一样，创建新的Fiber,旧的不复用了
                newFiber = {
                    tag,//原生DOM组件
                    type: newChild.type,//具体的元素类型
                    props: newChild.props,//新的属性对象
                    stateNode: null,//stateNode肯定是空的
                    return: currentFiber,//父Fiber
                    effectTag: PLACEMENT //副作用标识 
                }
            }
            if (oldFiber) {
                oldFiber.effectTag = DELETION;
                deletions.push(oldFiber);
            }
        }
        if (oldFiber) {  //比较完一个元素了，老Fiber向后移动1位
            oldFiber = oldFiber.sibling;
        }
        if (newFiber) {
            if (newChildIndex === 0) {
                currentFiber.child = newFiber;//第一个子节点挂到父节点的child属性上
            } else {
                prevSibling.sibling = newFiber;
            }
            prevSibling = newFiber;//然后newFiber变成了上一个哥哥了
        }
        newChildIndex++;
    }
}

function updateDOM(stateNode, oldProps, newProps) {
    setProps(stateNode, oldProps, newProps);
}
function completeUnitOfWork(currentFiber) {
    const returnFiber = currentFiber.return;
    if (returnFiber) {
        if (!returnFiber.firstEffect) {
            returnFiber.firstEffect = currentFiber.firstEffect;
        }
        if (!!currentFiber.lastEffect) {
            if (!!returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = currentFiber.firstEffect;
            }
            returnFiber.lastEffect = currentFiber.lastEffect;
        }

        const effectTag = currentFiber.effectTag;
        if (effectTag) {
            if (!!returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = currentFiber;
            } else {
                returnFiber.firstEffect = currentFiber;
            }
            returnFiber.lastEffect = currentFiber;
        }
    }
}

function workLoop(deadline) {
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);//执行一个任务并返回下一个任务
        shouldYield = deadline.timeRemaining() < 1;//如果剩余时间小于1毫秒就说明没有时间了，需要把控制权让给浏览器
    }
    //如果没有下一个执行单元了，并且当前渲染树存在，则进行提交阶段
    if (!nextUnitOfWork && workInProgressRoot) {
        commitRoot();
    }
    requestIdleCallback(workLoop);
}
//开始在空闲时间执行workLoop
requestIdleCallback(workLoop);
```

## 6.实现hooks

### 6.1 src\index.js

src\index.js

```
import React from './react';
import ReactDOM from './react-dom';

+function reducer(state, action) {
+  switch (action.type) {
+    case 'ADD':
+      return { count: state.count + 1 };
+    default:
+      return state;
+  }
+}
+function FunctionCounter() {
+  const [numberState, setNumberState] = React.useState({ number: 0 });
+  const [countState, dispatch] = React.useReducer(reducer, { count: 0 });
+  return (
+    <div>
+      <h1 onClick={() => setNumberState(state => ({ number: state.number + 1 }))}>
+        Count: {numberState.number}
+      </h1 >
+      <hr />
+      <h1 onClick={() => dispatch({ type: 'ADD' })}>
+        Count: {countState.count}
+      </h1 >
+    </div>
+  )
+}
ReactDOM.render(
  <FunctionCounter />,
  document.getElementById('root')
);
```

### 6.2 src\react.js

src\react.js

```
import { ELEMENT_TEXT } from './constants';
import { Update, UpdateQueue } from './updateQueue';
+import { scheduleRoot,useState,useReducer} from './scheduler';
function createElement(type, config, ...children) {
    delete config.__self;
    delete config.__source;
    return {
        type,
        props: {
            ...config,
            children: children.map(
                child => typeof child === "object" ?
                    child :
                    { type: ELEMENT_TEXT, props: { text: child, children: [] } })
        }
    }
}
class Component {
    constructor(props) {
        this.props = props;
        this.updateQueue = new UpdateQueue();
    }
    setState(payload) {
        this.internalFiber.updateQueue.enqueueUpdate(new Update(payload));
        scheduleRoot();
    }
}
Component.prototype.isReactComponent = true;
let React = {
    createElement,
    Component,
+    useState,
+    useReducer
}
export default React;
```

### 6.3 src\scheduler.js

src\scheduler.js

```
import { setProps, deepEquals } from './utils';
+import { UpdateQueue, Update } from './updateQueue';
import {
    ELEMENT_TEXT, TAG_ROOT, TAG_HOST, TAG_TEXT, TAG_CLASS, TAG_FUNCTION, PLACEMENT, DELETION, UPDATE
} from './constants';
let currentRoot = null;         //当前的根Fiber
let workInProgressRoot = null;  //正在渲染中的根Fiber
let nextUnitOfWork = null;      //下一个工作单元
let deletions = [];             //要删除的fiber节点
+let workInProgressFiber = null; //正在工作中的fiber
+let hookIndex = 0;              //hook索引
export function scheduleRoot(rootFiber) {
    if (rootFiber) {
        workInProgressRoot = rootFiber; //把当前树设置为nextUnitOfWork开始进行调度
    } else {
        if (currentRoot.alternate) {
            workInProgressRoot = currentRoot.alternate;
            workInProgressRoot.alternate = currentRoot;
        } else {
            workInProgressRoot = {
                ...currentRoot,
                alternate: currentRoot
            }
        }
    }
    deletions.length = 0;
    nextUnitOfWork = workInProgressRoot;
}

function commitRoot() {
    deletions.forEach(commitWork);
    let currentFiber = workInProgressRoot.firstEffect;
    while (currentFiber) {
        commitWork(currentFiber);
        currentFiber = currentFiber.nextEffect;
    }
    deletions.length = 0;//先把要删除的节点清空掉
    workInProgressRoot.firstEffect = workInProgressRoot.lastEffect = null;
    currentRoot = workInProgressRoot;
    workInProgressRoot = null;
}
function commitWork(currentFiber) {
    if (!currentFiber) {
        return;
    }
    let returnFiber = currentFiber.return;//先获取父Fiber
    while (returnFiber.tag !== TAG_HOST && returnFiber.tag !== TAG_ROOT && returnFiber.tag !== TAG_TEXT) {//如果不是DOM节点就一直向上找
        returnFiber = returnFiber.return;
    }
    const domReturn = returnFiber.stateNode;//获取父的DOM节点
    if (currentFiber.effectTag === PLACEMENT && currentFiber.stateNode != null) {//如果是新增DOM节点
        let nextFiber = currentFiber;
        while (nextFiber.tag !== TAG_HOST && nextFiber.tag !== TAG_TEXT) {//必须向下找到一个DOM节点
            nextFiber = nextFiber.child;
        }
        domReturn.appendChild(nextFiber.stateNode);
    } else if (currentFiber.effectTag === DELETION) {//如果是删除则删除并返回
        commitDeletion(currentFiber, domReturn);
    } else if (currentFiber.effectTag === UPDATE && currentFiber.stateNode != null) {//如果是更新
        if (currentFiber.type === ELEMENT_TEXT) {
            if (currentFiber.alternate.props.text !== currentFiber.props.text) {
                currentFiber.stateNode.textContent = currentFiber.props.text;
            }
        } else {
            updateDOM(currentFiber.stateNode, currentFiber.alternate.props, currentFiber.props);
        }
    }
    currentFiber.effectTag = null;
}
function commitDeletion(currentFiber, domReturn) {
    if (currentFiber.tag === TAG_HOST || currentFiber.tag === TAG_TEXT) {
        domReturn.removeChild(currentFiber.stateNode);
    } else {
        commitDeletion(currentFiber.child, domReturn);
    }
}
function performUnitOfWork(currentFiber) {
    beginWork(currentFiber);//开始渲染前的Fiber,就是把子元素变成子fiber

    if (currentFiber.child) {//如果子节点就返回第一个子节点
        return currentFiber.child;
    }

    while (currentFiber) {//如果没有子节点说明当前节点已经完成了渲染工作
        completeUnitOfWork(currentFiber);//可以结束此fiber的渲染了 
        if (currentFiber.sibling) {//如果它有弟弟就返回弟弟
            return currentFiber.sibling;
        }
        currentFiber = currentFiber.return;//如果没有弟弟让爸爸完成，然后找叔叔
    }
}

function beginWork(currentFiber) {
    if (currentFiber.tag === TAG_ROOT) {//如果是根节点
        updateHostRoot(currentFiber);
    } else if (currentFiber.tag === TAG_TEXT) {//如果是原生文本节点
        updateHostText(currentFiber);
    } else if (currentFiber.tag === TAG_HOST) {//如果是原生DOM节点
        updateHostComponent(currentFiber);
    } else if (currentFiber.tag === TAG_CLASS) {//如果是类组件
        updateClassComponent(currentFiber)
    } else if (currentFiber.tag === TAG_FUNCTION) {//如果是函数组件
        updateFunctionComponent(currentFiber);
    }
}
function updateFunctionComponent(currentFiber) {
+    workInProgressFiber = currentFiber;
+    hookIndex = 0;
+    workInProgressFiber.hooks = [];
    const newChildren = [currentFiber.type(currentFiber.props)];
    reconcileChildren(currentFiber, newChildren);
}
function updateClassComponent(currentFiber) {
    if (currentFiber.stateNode === null) {
        currentFiber.stateNode = new currentFiber.type(currentFiber.props);
        currentFiber.stateNode.internalFiber = currentFiber;
        currentFiber.updateQueue = new UpdateQueue();
    }
    currentFiber.stateNode.state = currentFiber.updateQueue.forceUpdate(currentFiber.stateNode.state);
    const newChildren = [currentFiber.stateNode.render()];
    reconcileChildren(currentFiber, newChildren);
}
function updateHostText(currentFiber) {
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = createDOM(currentFiber);//先创建真实的DOM节点
    }
}
function updateHostRoot(currentFiber) {//如果是根节点
    const newChildren = currentFiber.props.children;//直接渲染子节点
    reconcileChildren(currentFiber, newChildren);
}

function updateHostComponent(currentFiber) {//如果是原生DOM节点
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = createDOM(currentFiber);//先创建真实的DOM节点
    }
    const newChildren = currentFiber.props.children;
    reconcileChildren(currentFiber, newChildren);
}
function createDOM(currentFiber) {
    if (currentFiber.type === ELEMENT_TEXT) {
        return document.createTextNode(currentFiber.props.text);
    }
    const stateNode = document.createElement(currentFiber.type);
    updateDOM(stateNode, {}, currentFiber.props);
    return stateNode;
}

function reconcileChildren(currentFiber, newChildren) {
    let newChildIndex = 0;//新虚拟DOM数组中的索引
    let oldFiber = currentFiber.alternate && currentFiber.alternate.child;//父Fiber中的第一个子Fiber
    let prevSibling;
    while (newChildIndex < newChildren.length || oldFiber) {
        const newChild = newChildren[newChildIndex];
        let newFiber;
        const sameType = oldFiber && newChild && newChild.type === oldFiber.type;//新旧都有，并且元素类型一样
        let tag;
        if (newChild && typeof newChild.type === 'function' && newChild.type.prototype.isReactComponent) {
            tag = TAG_CLASS;//类组件
        } else if (newChild && typeof newChild.type === 'function') {
            tag = TAG_FUNCTION;//函数组件
        } else if (newChild && newChild.type === ELEMENT_TEXT) {
            tag = TAG_TEXT;//文本
        } else if (newChild && typeof newChild.type === 'string') {
            tag = TAG_HOST;//原生DOM组件
        }
        if (sameType) {
            newFiber = {
                tag,//标记Fiber类型，例如是函数组件或者原生组件
                type: oldFiber.type,//具体的元素类型
                props: newChild.props,//新的属性对象
                stateNode: oldFiber.stateNode,//原生组件的话就存放DOM节点，类组件的话是类组件实例，函数组件的话为空，因为没有实例
                return: currentFiber,//父Fiber
                updateQueue: oldFiber.updateQueue || new UpdateQueue(),
                alternate: oldFiber,//上一个Fiber 指向旧树中的节点
                effectTag: deepEquals(oldFiber.props, newChild.props) ? null : UPDATE,//副作用标识
            }
        } else {
            if (newChild) {//类型不一样，创建新的Fiber,旧的不复用了
                newFiber = {
                    tag,//原生DOM组件
                    type: newChild.type,//具体的元素类型
                    props: newChild.props,//新的属性对象
                    stateNode: null,//stateNode肯定是空的
                    return: currentFiber,//父Fiber
                    effectTag: PLACEMENT //副作用标识 
                }
            }
            if (oldFiber) {
                oldFiber.effectTag = DELETION;
                deletions.push(oldFiber);
            }
        }
        if (oldFiber) {  //比较完一个元素了，老Fiber向后移动1位
            oldFiber = oldFiber.sibling;
        }
        if (newFiber) {
            if (newChildIndex === 0) {
                currentFiber.child = newFiber;//第一个子节点挂到父节点的child属性上
            } else {
                prevSibling.sibling = newFiber;
            }
            prevSibling = newFiber;//然后newFiber变成了上一个哥哥了
        }
        newChildIndex++;
    }
}

function updateDOM(stateNode, oldProps, newProps) {
    setProps(stateNode, oldProps, newProps);
}
function completeUnitOfWork(currentFiber) {
    const returnFiber = currentFiber.return;
    if (returnFiber) {
        if (!returnFiber.firstEffect) {
            returnFiber.firstEffect = currentFiber.firstEffect;
        }
        if (!!currentFiber.lastEffect) {
            if (!!returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = currentFiber.firstEffect;
            }
            returnFiber.lastEffect = currentFiber.lastEffect;
        }

        const effectTag = currentFiber.effectTag;
        if (effectTag) {
            if (!!returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = currentFiber;
            } else {
                returnFiber.firstEffect = currentFiber;
            }
            returnFiber.lastEffect = currentFiber;
        }
    }
}
+export function useReducer(reducer, initialValue) {
+    let oldHook =
+        workInProgressFiber.alternate &&
+        workInProgressFiber.alternate.hooks &&
+        workInProgressFiber.alternate.hooks[hookIndex];
+    let newHook = oldHook;
+    if (oldHook) {
+        oldHook.state = oldHook.updateQueue.forceUpdate(oldHook.state);
+    } else {
+        newHook = {
+            state: initialValue,
+            updateQueue: new UpdateQueue()
+        };
+    }
+    const dispatch = action => {
+        newHook.updateQueue.enqueueUpdate(
+            new Update(reducer ? reducer(newHook.state, action) : action)
+        );
+        scheduleRoot();
+    }
+    workInProgressFiber.hooks[hookIndex++] = newHook;
+    return [newHook.state, dispatch];
+}
+export function useState(initState) {
+    return useReducer(null, initState)
+}
function workLoop(deadline) {
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);//执行一个任务并返回下一个任务
        shouldYield = deadline.timeRemaining() < 1;//如果剩余时间小于1毫秒就说明没有时间了，需要把控制权让给浏览器
    }
    //如果没有下一个执行单元了，并且当前渲染树存在，则进行提交阶段
    if (!nextUnitOfWork && workInProgressRoot) {
        commitRoot();
    }
    requestIdleCallback(workLoop);
}
//开始在空闲时间执行workLoop
requestIdleCallback(workLoop);
```