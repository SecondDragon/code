# 03-Vue 常见成员

## 一 方法 methods

方法是绑定的事件的合集：

```js
new Vue({
  // ... 其他选项属性
  methods: {
    changeAge() {
      return this.age++
    },
  },
})
```

注意：这里不推荐使用箭头函数，因为箭头函数没有 this，会向外查找将 this 绑定为 window。this 代表 new 出来的 vm 实例（在组件中为组件实例）。

贴士：函数是可以卸载 `data` 属性上的，但是由函数不需要代理，不需要劫持，挂载在 data 上会为该函数添加 setter/getter 方法，会造成 Vue 实例的臃肿。

## 二 计算属性 computed

计算属性可以简化直接书写表达式带来的代码繁杂性。比如在实际开发中，后端返回的数据并不符合前端展示的需要，需要对这些数据进行处理：

```html
<div>{{msg.toUpperCase()}}</div>
```

如果表达式过长，这里将该操作写入方法中，也可以实现：

```js
<div>{{getMsg()}}</div>
<div>{{getMsg()}}</div>
<div>{{getMsg()}}</div>

new Vue({
    el: "#app",
    data: {
        msg: "hello"
    },
    methods: {
        getMsg(){
            console.log('函数执行！')
            return this.msg.toUpperCase()
        }
    }
})
```

上述示例中使用函数实现了代码的简化，但是当多个地方都需要该结果时，就会让函数执行多数，比如示例中函数执行了三次。在 Vue 中，为了简化、美观上述操作，Vue 给出了计算属性，用来做数据的处理。计算属性也会挂载在 Vue 实例上（`_data` 中没有！），依赖于原有属性进行计算，底层借助了 `defineproperty` 方法提供的 getter/setter。如下所示：

```html
<div>{{ realMsg }}</div>
<div>{{ realMsg }}</div>
<div>{{ realMsg }}</div>

<script>
  new Vue({
    el: '#app',
    data: {
      msg: 'hello',
    },
    computed: {
      realMsg: {
        // 当依赖的计算源 msg 被修改时，get() 就会调用（初次显示也会调用）
        get() {
          console.log('get...')
          return this.msg.toUpperCase()
        },
        // 如果要修改计算属性，必须使用 set() 修改
        set(val) {
          console.log('set...')
          this.msg = val
        },
      },
    },
  })
</script>
```

贴士：computed 中的函数也存在 this 问题，不推荐使用箭头函数。计算属性会将计算的结果保存在内存缓存中，视图需要的数据直接从缓存中获取，只有依赖的数据改变才会重新计算一次。

计算属性经常用于展示，get 函数即可应用于大多场景，所以计算属性的 set 函数没有必要，在只考虑读取时可以简写：：

```html
<!-- 计算属性使用 getMsg 无需 () -->
<div>{{ getMsg }}</div>

<script>
  new Vue({
    el: '#app',
    data: {
      msg: 'hello',
    },
    computed: {
      getMsg() {
        console.log('函数执行！')
        return this.msg.toUpperCase()
      },
    },
  })
</script>
```

## 三 侦听属性 watch

### 3.1 watch 的简单使用

侦听器用来监听 data 数据、计算属性，数据一旦发生变化，就会`通知`侦听器绑定的方法。

```js
new Vue({
  el: '#app',
  data: {
    msg: 'hello',
  },
  watch: {
    msg: {
      immediate: true, // 可选配置：初始化时让 handler 调用一下
      handler(newVal, oldVal) {
        console.log('msg 被修改了，新值：', newVal)
      },
    },
  },
})
```

侦听器也可以直接书写在 vue 实例上：

```js
const vm = new Vue()

vm.$watch('msg', {})
```

### 3.2 深度监听

深度监听：

```js
new Vue({
  el: '#app',
  data: {
    obj: {
      name: 'lisi',
      age: 30,
    },
  },
  watch: {
    // 只监听 name 属性
    'obj.name': {
      handler() {},
    },
    // 深度监听：监听对象的改变
    obj: {
      deep: true, // 默认为 false
      handler() {},
    },
  },
})
```

### 3.3 侦听属性简写

当侦听属性只需要一个 handler，不用配置 deep 等时，可以简写：

```js
new Vue({
  el: '#app',
  data: {
    obj: {
      name: 'lisi',
      age: 30,
    },
  },
  watch: {
    // 函数名即侦听属性名
    obj() {
      console.log('obj 改变了')
    },
  },
})

// 对应实例简写方式
const vm = new Vue()
vm.$watch('obj', function () {})
```

### 3.5 侦听属性与计算属性区别

侦听属性与计算属性实现的功能类似，计算属性写起来更精简，但是一些场景只与侦听器适合，如：异步、开销较大的操作，如下所示：

```js
new Vue({
  data: {
    count: 0,
  },
  // 不生效，因为 计算属性 依赖于返回值，这里返回值是 null
  computed: {
    count() {
      setTimeout(() => {
        return 10
      })
      // 这里没写 return 但是其实是返回了 null
    },
  },
  // 生效
  watch: {
    count() {
      setTimeout(() => {
        this.count = 100
      })
    },
  },
})
```

## 四 过滤器 fliters

过滤器可以对传递过来的值进行过滤：

```html
<!--过滤器由管道符 `|` 表示，也支持多次调用：`{{count | myFormat(3,1) | test }}`-->
<div id="app">{{count | myFormat(3,1) }}</div>

<script>
  new Vue({
    el: "#app",
    data: {
      count: 2,
    },
    filters:{
      myFormat: function (count, num1, num2) {
        return count + num1 - num2;
      };
    }
  });
</script>
```

注意：如果出现了同名过滤器，将会依据就近原则调用（私有为准）

贴士：过滤器也可以全局使用：

```js
Vue.filter('myFormat', function (count, num1, num2) {
  return count + num1 - num2
})
```

## 五 mixins 混入

组件之间如果共享一些选项，可以使用 mixins。

通用选项：

```js
export const show = {
  methods: {
    showInfo() {
      console.log(this)
    },
  },
}
```

使用 mixin：

```js
import { show } from '../mixin/show'

export default {
  data: {},
  mixins: [show],
}
```

贴士：

- 混合后，如果当前成员中已经有混合的属性，则以当前选项为主
- `Vue.mixin(options)` 是全局混合方式

## 六 Vue 静态方法

### 6.1 set() 追加响应式属性

当数据已经在页面渲染后，还需要新增一个数据进行响应式渲染，仅仅将数据追加进 data 中是不合适的，如下所示：

```js
data(){
  return {
    student: {
      name: "lisi",
      age: 18
    }
  }
}
```

我们如果想在 student 上追加 sex 属性，直接赋值后的 sex 属性与 name、age 不同，他不具备 setter/getter 方法，无法实现响应式。正确的设置方式是：

```js
Vue.set(vm.student, 'sex', '男')
// 或者使用当前实例，this的本质是 vm
this.$set(this.student, 'sex', '男')
```

注意：当我们想增加 student 平级的 data 下的成员时，set 是不可以实现的，因为 target 不能是 vm、vm 的根数据。

### 6.2 $nextTick()

下面这个需求是：点击按钮后，显示输入框，并且将焦点聚集在输入框上:

```vue
<template>
  <button @click="handle"></button>
  <input v-show="isShow" ref="info" />
</template>

<script>
new Vue({
  data: {
    isShow: false,
  },
  methods: {
    handle() {
      this.isShow = true
      this.$refs.info.focus()
    },
  },
})
</script>
```

这里点击按钮输入框显示后，却不会发生焦点聚焦，这是因为 在 handle 方法执行到聚焦时，界面还没有刷新，input 输入框还不存在，真实的流程应该是：界面刷新完毕后才执行聚焦：

```js
    handle() {
      this.isShow = true
      // 定时器setTimeout 是可以实现的，但是vue提供了 更好的
      this.$nextTick(()=>{
        this.$refs.info.focus()
      })
    },
```

$nextTick 表示下一轮，其指定的回调会在 DOM 更新完毕后进入其指定的回调函数。所以其使用时机是：

当数据改变后，要基于更新后的新 DOM 进行操作！

## 七 数组元素更新

由于 data 中的成员都具备 setter/getter 方法，修改他们的值具有触发页面更新的功能，但是数组内的元素是无法都添加 setter 方法的：

```js
data(){
  return {
    student: {
      name: "lisi",
      age: 18,
      hobby:['足球', '绘画', '唱歌']
    }
  }
}
```

此时通过索引值修改 hobby 属性无法触发页面更新，因为 Vue 作者认为只有调用了数组上的 `push、pop、shift、unshift、splice、sort、reverse` 7 个方法，才是开发者想修改数组中的数据，此时才会触发界面更新。所以修改元素让页面触发更新的方式应该是：

```js
student.hobby.splice(0, 1, '书法')
```

贴士：Vue 能检测到数组变更，是因为 Vue 对杉树 7 个方法进行了包裹，所以相应的 filter、concat、slice 等方法没有改变原数组，也就无法触发更新。
