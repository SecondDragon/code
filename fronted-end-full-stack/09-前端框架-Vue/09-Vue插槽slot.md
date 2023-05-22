# 09-Vue 插槽 slot

## 一 插槽 slot 的作用

假设定义了一个组件 comp，在视图中还要额外添加信息：

```js
<comp>
    <div>新增内容<div>
</comp>
```

此时添加的 div 信息是不显示的，因为 Vue 在 new 的时候，去查找 comp 的 template 内容，从而直接对视图中的 `comp` 标签进行了替换。

slot 插槽可以解决上述问题，父组件中插入标签：

```html
<template>
  <Son><div>Hello</div></Son>
</template>
```

子组件中使用 slot，告知 Vue 插入的内容放置在子组建的位置（类似挖坑等待组件使用者填充）：

```html
<template>
  <div>
    插入内容：
    <!--使用者插槽位置未传递数据，则显示默认信息：未传入数据-->
    <slot>未传入数据</slot>
  </div>
</template>
```

## 二 具名插槽

多个插槽共同使用时，如果需要对单独的插槽进行个性设计，就需要给插槽命名 (不带 name 的插槽其 name 值是 default)。

父组件中定义具名插槽：

```html
<template>
  <div>
    <Son>
      <div slot="left">hello1</div>
      <div slot="right">hello2</div>
    </Son>
  </div>
</template>
```

子组件制作插槽：

```html
<template>
  <div>
    <slot name="left">默认值 left</slot>
    <slot name="right">默认值 right</slot>
  </div>
</template>
```

## 三 作用域插槽

组件在编译时，其数据的来源有作用域限制，如果现在父组件需要对子组件内容进行加工处理 (父使用子数据)，就需要设定作用域。

父组件传递数据：

```html
<template>
  <div>
    <Son>
      <template scope="data">
        <div v-for="(item, index) in data.users" :key="index">{{ item }}</div>
      </template>
    </Son>

    <Son>
      <template scope="data">
        <div v-for="(item, index) in data.users" :key="index">{{ item }}</div>
      </template>
    </Son>
  </div>
</template>
```

子组件使用：

```html
<template>
  <div>
    <!--传递数据给插槽使用者-->
    <slot :users="users">默认值 left</slot>
  </div>
</template>

<script>
  export default {
    name: 'Son',
    data() {
      return {
        users: ['a', 'b', 'c'],
        orders: [1, 2, 3],
      }
    },
  }
</script>
```

## 四 vue2.6 之后的插槽变化

在 vue2.6 之后，为了兼容性，普通插槽与作用域插槽基本没有了太大区别。

插槽在 vue2.6 前后的写法略有不同，在 `<template></template>` 元素中支持 `v-slot` 写法。

- 普通插槽：
  - 2.6 之前：`<template slot="user"></template>`
  - 2.6 之后：`<template v-slot:"user"></template>`
- 作用域插槽：
  - 2.6 之前：`<template scope="{users}"></template>`
  - 2.6 之后：`<template slot-scope="{users}"></template>`
