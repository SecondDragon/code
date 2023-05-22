# 05-重要属性 -2-数据 props

## 一 props 概念

props 属性用于接收外部传入组件的数据。

react 组件内可以引用其他组件，这就形成了组件树，下层组件可以利用 props 来使用上层组件传递过来的数据，所以 props 数据对当前组件来说是只读的，如果要修改 props 数据，只能由其父组件修改。

## 二 props 使用示例

```js
// 外部向组件内部传递数据示例
function App() {
  let data = 'lisi'
  return (
    <div className="App">
      <FuncComp name={data}></FuncComp>
      <ClasComp name={data}></ClasComp>
    </div>
  )
}

// 函数组件接收数据
function FuncComp(props) {
  return <div>传递过来的数据：{props.name}</div>
}

// 类组件接收数据
class ClaComp extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div>组件 props 数据：{this.props.name}</div>
  }
}
```

## 三 props 使用注意事项

### 3.1 props 默认值

类组件设定默认值：

```js
// 方式一：浏览器编译以后才会生效
class ClaComp extends React.Component {
    static defaultProps = {
        name: 'ryj',
    }
    constructor(props) {
        super(props)
    }
    render() {
        return <div>组件 props 数据：{this.props.name}</div>
    }
}

// 方式二：一直生效
ClaComp。defaultProps = {
    name: 'yy'
}
```

函数类型组件定默认值：

```js
function FuncComp(props) {
  // 若参数 props 无 name 属性，则显示默认属性值
  return <div>默认数据：{props.name}</div>
}

FuncComp.defaultProps = {
  name: 'zs',
}
```

贴士：在 React15 版本及其之前，默认参数使用 `||`方式，如下所示：

```js
props.name = props.name || '默认值'
```

### 3.2 批量传递标签属性 props

传递多个参数时可以使用 ES6 的扩展运算符：

```js
// 传递 name、age
let data = {
  name: 'lisi',
  age: 30,
}

// 传递方式
;<Comp {...data}></Comp>
```

### 3.3 props 验证

props 验证用来验证传递的数据类型是否符合要求。验证不会对运行产生影响，而是会在控制台打印错误信息，推荐在生产环境中取消 props 验证。

使用 props 验证需要先下载 prop-types 包：

```txt
npm i prop-types -S
```

验证示例：

```js
import PropTypes from 'prop-types'

// 类组件属性验证示例
class Comp extends React.Component {
  // 类型限制
  static propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    info: PropTypes.func,
  }
}

// 函数组件属性验证示例
function FuncComp(props) {
  return <div>默认数据：{props.name}</div>
}
FuncComp.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  info: PropTypes.func,
}
```

### 3.4 构造器中的 props

构造器 props 的书写与否并不会影响组件的创建于使用，但是构造器只有接受了 props，且使用`super(props)`，组件的实例才能获取到 props，该用方法几乎用不到。
