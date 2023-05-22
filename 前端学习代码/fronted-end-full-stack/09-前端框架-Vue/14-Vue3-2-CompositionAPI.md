# 14-Vue3-2-CompositionAPI

## 一 ref()、reactive() 实现响应式

在 vue2 中，针对对象，使用 defineProperty 方法对对象的属性值进行拦截，针对数组则重写数组的更新元素方法实现劫持。**Vue2 的问题是对对象新增、删除属性，对数组进行下标替换元素、更新 length 都不会触发界面的更新**！

Vue3 的 setup() 中直接返回的数据并不是响应式的，必须通过 ref()、reactive() 函数的包装，其底层利用 Proxy 方式解决了上述问题。

### 1.1 ref() 包装数据为响应式数据

ref() 用来包装基本类型：

```html
<template>
  <!-- ref 包装的数据在模板中有语法糖支持，无需使用 count.value -->
  <h1>count:{{ count }}</h1>
  <button @click="updCount">count++</button>
</template>

<script>
  import { ref } from 'vue'
  export default {
    name: 'HelloWorld',
    setup() {
      let count = ref(10)

      function updCount() {
        count.value++ // 基本类型被包装为了对象，键名即 value
      }

      return {
        count,
        updCount,
      }
    },
  }
</script>
```

ref() 用来包装引用类型：

```html
<template>
  <h1>{{obj.age}}</h1>
  <h1>{{ obj.p.id }}</h1>
  <button @click="updObj">changeObj</button>
</template>

<script>
  import { ref } from 'vue'
  export default {
    name: 'HelloWorld',
    setup() {
      let obj = ref({
        name: 'zs',
        age: 10,
        p: {
          id: 1,
        },
      })

      function updObj() {
        obj.value.age++
        obj.value.p.id++
      }

      return {
        obj,
        updObj,
      }
    },
  }
</script>
```

### 1.2 reactive() 包装引用类型

```html
<template>
  <h1>{{obj.age}}</h1>
  <h1>{{ obj.p.id }}</h1>
  <button @click="updObj">changeObj</button>
</template>

<script>
  import { reactive } from 'vue'
  export default {
    name: 'HelloWorld',
    setup() {
      let obj = reactive({
        name: 'zs',
        age: 10,
        p: {
          id: 1,
        },
      })

      function updObj() {
        obj.value.age++
        obj.value.p.id++
      }

      return {
        obj,
        updObj,
      }
    },
  }
</script>
```

注意：ref() 内部的响应式依然是靠 `Object.defineProperty()`的 get 与 set 实现的。但是当传入的是引用类型，需要借助 Proxy。reactive() 的响应式是深层次的，借助了 Proxy 实现，通过代理对象操作源对象内部数据，reactive 只能操作数组、对象类型的数据。

### 1.3 ref() 与 reactive() 原理

ref() 的内部仍然是 reactive() 函数，所以响应式的核心是 reactive() 函数，该函数将传入的数据包裹为了 ES6 的 Proxy 对象并返回，开发者修改 Proxy 代理对象，就可以让源数据同步修改，触发响应式更新。

```js
let person = {
  name: 'lisi',
  age: 30,
}
// person 作为源数据，对其操作是无法实现响应式的
// 只有操作 proxy 才能实现响应式
let proxy = reactive(person)
```

贴士：ref 也是可以传入引用类型数据的，只不过需要利用 value 获取属性。

### 1.4 shallowReactive()、shallowRef()

`shallowRef()` 只用来实现基本数据类型的响应式，当参数为引用类型则无法实现响应式。应用场景：对象数据在后续使用中不会修改器属性，而是产生新对象来替换。

`shallowReactive()` 只用来保障对象的最外层实现响应式，深层次的对象成员不会被实现响应式。应用场景：应用只有外层属性变化的结构较深的引用类型数据。

浅劫持存在的原因：reactive 内部需要使用递归对嵌套结构的数据进行层层包装为 Proxy 对象，这会造成性能问题，`shallowReactive()`、`shallowRef()`是非递归的。

贴士：shallowRef() 创建的监听数据，同样监听的是 .value 的变化，value 才是第一层。

### 1.5 实现 shallowReative() reactive()

shallowReative() 是最简单的响应式函数，因为其无需递归响应，且参数为对象：

```js
function shallowReactive(target) {
  let flag = target && typeof target === 'object'
  if (!flag) {
    // 基本类型可以直接 return
    return
  }

  return new Proxy(target, reactiveHandler)
}

const reactiveHandler = {
  get(target, prop) {
    return Reflect.get(target, prop)
  },
  set(target, prop, value) {
    return Reflect.set(target, prop, value)
  },
  deleteProperty(target, prop) {
    return Reflect.deleteProperty(target, prop)
  },
}

function reactive(target) {
  if (Array.isArray(target)) {
    target.forEach((item, index) => {
      target[index] = reactive(item)
    })
  } else {
    Object.keys(target).forEach((key) => {
      target[key] = reactive(target[key])
    })
  }

  return new Proxy(target, reactiveHandler)
}
```

## 二 toRef() toRefs() 实现返回值响应式

### 2.1 toRef()

如下场景的响应式是无法实现的，需要借助 toRef()：

```html
<template>
  <h1>{{ age }}</h1>
  <h1>{{ id }}</h1>
  <button @click="updObj">changeObj</button>
</template>

<script>
  import { reactive, toRef } from 'vue'
  export default {
    name: 'HelloWorld',
    setup() {
      let obj = reactive({
        name: 'zs',
        age: 10,
        p: {
          id: 1,
        },
      })

      function updObj() {
        obj.value.age++
        obj.value.p.id++
      }

      // 这里返回的是普通字符串，而不是响应式数据
      //   return {
      //     obj.value.age,
      //     obj.value.p.id,
      //   }

      // 不嫩使用 ref(obj.age),在响应式关系中，如果是用户修改了界面，被响应的数据是 age，而不是 obj,age
      // toRef() 是引用，ref() 是引用
      const age = toRef(obj, 'age')
      const id = toRef(obj.p, 'id')
      return {
        age,
        id,
      }
    },
  }
</script>
```

toRef() 用于创建一个 ref 对象，其 value 值指向另一个对象中的某个属性。一般使用场景为：要将响应式对象中的某个属性单独提供给外部使用时才会使用到 toRef()。

### 2.2 toRefs()

toRefs() 用于引用多个属性：

```js
setup(){

    // ,,,

    return {
        ...toRefs(obj)
    }
}
```

## 三 只读 readonly()、shallowReadonly()

readonly()、shallowReadonly() 函数均接收一个响应式数据，返回一个新的数据：

```js
let p = reactive({ age: 10, name: 'zs' })

p = readonly(p)
```

经过 readonly() 加工的响应式数据是只读的，shallowReadonly() 只会加工对象的最外层。

## 四 toRaw()、markRow() 转变响应式数据为普通对象

toRow()：将 reactive() 生成的响应式对象转化为普通对象。一般用于操作数据时不想造成页面更新的场景。

markRow()：标记一个对象，使其永远不会成为响应式对象。一般用于一些复杂的第三方库、渲染不可变数据源的大列表。

## 五 customRef() 显式控制 ref

`customRef()` 用于创建一个自定义 ref，并对其依赖项进行跟踪，以及对其更新触发进行显式控制。

实现防抖效果：

```html
<template>
  <input type="text" v-model="keyword" />
  <h3>{{keyword}}</h3>
</template>

<script>
  import { ref, customRef } from 'vue'
  export default {
    name: 'Demo',
    setyp() {
      // let keyword = ref('hello')
      function myRef(val, delay = 300) {
        let timer
        return customRef((track, trigger) => {
          return {
            get() {
              track()
              return val
            },
            set(newVal) {
              clearTimeout(timer)
              timer = setTimeout(() => {
                val = newVal
                trigger()
              }, delay)
            },
          }
        })
      }

      // 自定义 myRef
      let keyword = myRef('hello')
      return { keyword }
    },
  }
</script>
```

## 六 响应式数据判断

- isRef()：检查值是否由 ref() 创建
- isReactive()：检查对象是否由 reactive() 创建
- isReadonly()：检查对象是否由 readonly() 创建
- isProxy()：检查对象是否由 readonly()/readonly() 创建

## 七 自定义 hook 函数

vue3 的组合 api 可以封装为复杂的可复用的功能函数，类似 vue2 中的 mixin，但是更加清晰：

```js
// 新建一个 hook 文件夹，内部创建多个 hookapi 文件，如下示例
import { ref, onMounted, onUnmounted } from 'vue'

export default function useShowMousePosition() {
  const x = ref(-1)
  const y = ref(-1)

  const run = (e: MouseEvent) => {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => {
    document.addEventListener('click', updPos)
  })

  onUnMounted(() => {
    document.addEventListener('click', updPos)
  })
}

// 业务代码中使用
export default {
  name: 'HelloWorld',
  setup() {
    const { x, y } = useMousePosition()
  },
}
```
