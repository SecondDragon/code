# 02-Vue 常用指令

## 一 指令概念

类似 `v-for` 这样在 Vue 中具备特殊作用的标识即为 Vue 指令，其本质是自定义属性。

## 二 常见指令

### 2.1 v-cloak 解决闪烁问题

插值表达式具有闪烁问题：当网速较慢时，`{{}}`的花括号会被显示在浏览器上，过一段很小的时间后才会被替换为真实的 data 内的数据。

`v-cloak`指令可以解决上述问题：

```html
<style>
  [v-cloak] {
    display: none;
  }
</style>

<div v-cloak>{{msg}}</div>
```

由于设置了元素隐藏，所以插值表达式就不会再显示，但是当 vue 得到数据后，会将该 class 抹除，插值表达式就会显示。

### 2.2 v-text v-html v-pre 数据绑定

`v-text`，`v-html`，`v-pre`的作用与`{{}}`作用一样，都可以用来插入数据：

```html
<div id="app" v-text="msg"></div>

<script>
  new Vue({
    el: '#app',
    data: {
      msg: 'hello ',
    },
  })
</script>
```

注意：

- `v-text`：填充普通文本，不会出现闪烁问题
- `v-html`：填充 html 文本，能够额外将数据中的标签文本解析出来，所以很容易引起安全问题（XSS 攻击）。
- `v-pre`：直接填充原始数据，作用是跳过编译，直接显示原始文本。比如要在界面中显示 `{{}}` 这 2 个括号，就需要该指令

### 2.3 v-bind 绑定属性

```html
<input type="button" v-bind:title="mytitle" />

<script>
  new Vue({
    el: '#app',
    data: {
      mytitle: '自定义 title',
    },
  })
</script>
```

注意：

- v-bind 可以省略，直接写冒号即可 `:title="mytitle"`
- v-bind 中可以使用表达式： `:title="mytitle + '123'"`

### 2.4 v-for 循环列表

当在组件中使用 v-for 时，key 现在是必须的，每次 for 循环的时候，通过指定的 key 来标识唯一身份：

```html
<div id="app">
  <!--推荐写法-->
  <h2 v-for="item in arr" :key="item.id">{{item}}</h2>
  <h5 v-for="(item, index) of arr" :key="item.id">{{item}}</h5>

  <!--不推荐该写法-->
  <h5 v-for="(item, index) in arr" :key="index">{{item}}</h5>
</div>
```

如果没有写 key，vue 默认会使用示例中第三个案例 index 作为默认 key，但是不推荐使用循环索引 index 作为 key。 原因是：在一些特殊场景下会产生 BUG，且存在性能问题，如图所示：

![vue key原理](../images/vue/key-01.jpg)

如图所示，左侧的数据在虚拟 DOM 中准备好后渲染在了真实 DOM 上，且用户在真实 DOM 上输入了对应数据。当我们为添加一行数据，且该数据添加在第一行后，新的虚拟 DOM 与旧的虚拟 DOM 对比时就会发现第一行的数据发生了变化，但是 input 输入框没有变化，在渲染时，第一行的用户名被正确渲染，但是输入框部分仍然使用了旧虚拟 DOM 中的输入框。且这种插入顺序也会导致所有的数据被重新渲染了一遍，性能较低。

### 2.5 v-if 与 v-show 条件渲染

v-if 每次都会重新创建或移除元素，切换性能消耗高。v-show 只是切换 display:none 的样式，初始渲染消耗高。

```html
<!-- 每次都会重新创建或移除元素，切换性能消耗高 -->
<h2 v-if="flag">test1</h2>

<!-- 只是切换 display:none 的样式，初始渲染消耗高  -->
<h2 v-show="flag">test1</h2>

<button @click="flag=!flag">点击</button>
```

**如果元素涉及到频繁的切换推荐使用 v-show；**

**如果元素可能永远也不会被显示出来被用户看到推荐使用 v-if；**

## 三 事件绑定

### 3.1 v-on 绑定事件

```html
<input type="button" v-on:click="show" />

<script>
  new Vue({
    el: '#app',
    data: {
      mytitle: '自定义 title',
    },
    methods: {
      show: function () {
        alert(this.mytitle)
      },
    },
  })
</script>
```

v-on 可以缩写为 `@`，绑定的事件函数可以写函数名，也可以书写函数调用：

```js
@click='do'                         // 该方式默认会携带事件对象，do 函数的第一个参数就是事件对象
@click='do("hello", $event)'        // $event 只有显式传递才能获取到，顺序可在前在后，vue 会对参数进行扫描
```

### 3.2 事件修饰符

开发者可以在事件处理函数中对事件进行阻止冒泡、阻止默认事件等操作，vue 也提供了更简便的工具-事件修饰符。示例：

```html
<a @click.stop="handle">跳转</a>
```

事件修饰符是可以串联写的：如：`@click.prevent.once="clickHandler"`。常见事件修饰符有：

- stop：阻止冒泡，所有冒泡行为都被阻止
- self：只有 event.target 是当前操作的元素时才会触发
- prevent：阻止默认事件
- capture：使事件在捕获阶段即可触发
- once：事件只触发一次
- 一些特殊标签也拥有自身专属的事件修饰符，如按键修饰符：`@keyup.enter=''`等
- passive：事件的默认行为立即执行，无需等待事件回调完毕

### 3.3 键盘事件

Vue 为一些常用键盘事件提供了别名：

- enter：回车
- delete：删除
- esc：退出
- space：空格
- tab：换行
- up：上
- down：下
- left：左
- right：右

使用示例：

```js
<input @keyup.enter="show">
```

未提供别名的按键，可以使用键盘事件进行自定义：

```html
<div id="app">
  <button @keyup.move="handle"></button>
</div>

<script>
  // 全局中使用 Vue 类本身
  Vue.config.keyCodes.move = 65 // 65 代表 a 键 按该键触发函数
</script>
```

## 四 双向绑定 `v-model`

### 4.1 `v-model`基础使用

插值、绑定属性、`v-text`等显示数据的方式是单向绑定的，其作用仅仅是将数据填充到标签上，即 vue 实例中的数据模型发生变化，则界面发生改变。

在表单中，我们经常需要在用户修改界面中的数据时也能实时替换对应的 vue 实例中的数据，这就需要双向绑定指令`v-model`。

```html
<div id="div">
  <input type="text" v-model="msg" />
  插值数据：{{msg}}
</div>

<script>
  let app = new Vue({
    el: '#div',
    data: {
      msg: 1,
    },
  })
</script>
```

示例一：radio 中使用 v-model

```html
<label for="gender">
  <input type="radio" v-model="gender" />
  男
  <input type="radio" v-model="gender" />
  女
</label>
```

示例二：select 中使用 v-model

```html
<select v-model="fruit">
  <option>苹果</option>
  <option>香蕉</option>
  <option>葡萄</option>
</select>
```

### 4.2 `v-once`

`v-once`：用于显示内容后不再具有数据响应功能，其目的是提高性能，原理是只编译一次，比如可以用于显示初始化的 vue 的 data 数据。

### 4.3 表单修饰符

表单中的数据往往需要做一些特殊处理，如年龄强制转换为数值类型，电话号码需要去掉开始结尾空格，input 事件需要切换为 change 事件 (失去焦点才触发) 等等。

vue 提供了简便的方式，即表单修饰符：

```html
<input type="text" v-model.number="age" />
<input type="text" v-model.lazy="msg" />
```

### 4.4 `v-model`原理

`v-model`的底层其实是利用了事件绑定、属性绑定的机制：

```html
<input type="text" :value="msg" @input="msg=$event.target.value" />
```

## 五 自定义指令

类似 `v-model`、`v-for`等指令是 vue 默认提供的内置指令，用户也可以自定义指令。

示例：自定义指令用户获取元素焦点

```html
<div id="div">
  <!--自动获取了焦点-->
  <input type="text" v-focus />
</div>

<script>
  Vue.directive('focus', {
    inserted: function (el) {
      el.focus()
    },
  })
</script>
```

带参数的指令：

```html
<div id="div">
  <input type="text" v-color='{color:"red"}' />
</div>

<script>
  Vue.directive('color', {
    inserted: function (el, binding) {
      el.style.backgroundColor = binding.value.color
    },
  })
</script>
```

指令也可以局部定义，只能用于当前组件：

```js
new Vue({
  //..其他选项对象
  directive: {
    color: {
      bind: function (el, binding) {
        el.style.backgroundColor = binding.value.color
      },
    },
    focus: {
      inserted: function (el, binding) {
        el.style.backgroundColor = binding.value.color
      },
    },
  },
})
```
