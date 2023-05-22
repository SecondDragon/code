# 03-React 组件化开发

## 一 React 组件创建化开发思想

### 1.1 组件化思想

组件化是指从 UI 界面角度出发，合理重用 UI 组件。如果将一个页面中的业务逻辑放在一起，将会让项目变得难以维护、扩展，将页面拆分为一个个小的功能块，每个功能块具有完全独立的功能，不同功能块之间通过一些方法进行关联，这样更便于扩展、维护。

具体的实现细则：

```txt
将一个完整的页面拆分为多个功能块组件，每个组件用于实现页面的一个功能块
每个组件内部可以进一步进行划分为更加细小的组件
```

组件化为页面的开发实现了更好的抽象，达到复用效果，任何应用都可以被抽象为一棵组件树：

![组价树](../images/mvvm/vue-02.png)

### 1.2 react 中的组件化

组件都拥有自己独立的数据、行为，与其他组件之间互相独立，甚至相同组件的不同实例之间也是互相独立的。

组件的样式、行为等都会因为组件数据的改变而发生改变，维护组件这些数据的对象称为组件的状态（state）。

react 中定义组件有两种方式：

- 函数组件：定义组件简单方便，但是 React16 之前无法使用状态，只能用来作为基础模板使用，在 React16 hooks API 出来之后，函数组件逐渐兴起
- 类组件：使用 class 语法定义的组件，能够使用状态，但是书写较为臃肿

## 二 React 组件化开发初识

### 2.1 React 定义组件

组件放在根目录的 components 文件夹。

在 components 文件中新建 `FuncComp.js` 文件，内部导出一个函数组件：

```js
function FuncComp() {
  return <div>函数组件</div>
}

export default FuncComp
```

在 components 文件中新建 `ClaComp.js` 文件，内部导出一个类组件：
定义一个类组件：

```js
import React from 'react'

class ClaComp extends React.Component {
  render() {
    return <div>类组件</div>
  }
}

export default ClaComp
```

在页面中中使用组件，下列示例在 App.js 根组件中使用：

```js
import React from 'react'

import FuncComp from './components/FuncComp'
import ClaComp from './components/ClaComp'

function App() {
  return (
    <div className="App">
      <FuncComp></FuncComp>
      <ClaComp></ClaComp>
    </div>
  )
}

export default App
```

贴士：Reac 的组件文件后缀名也可以是 jsx。

### 2.2 标签额外引入问题

脚手架中引入组件时，如果不想因为需要一个额外的单独标签包裹，改变了页面结构，可以如下书写：

```js
return (
  <>
    <MyComp1 />
    <MyComp2 />
  </>
)
```

或者从 react 中引入 Fragment，使用 `<Fragment></Fragment>`包裹：

```js
return (
  <Fragment>
    <MyComp1 />
    <MyComp2 />
  </Fragment>
)
```

使用 Fragment 可以指定遍历时的唯一标识 key，而空标签不能书写任何属性。

### 2.3 使用 css

推荐使用 `import comp1.css` 的方式引入 css。在 React 项目中，每个组件都有自己独立的文件夹，往往其自身的 CSS 文件也在其中，这时使用 import 方式引入 css，容易引起组件之间 CSS 冲突，这里 CSS 的引入也可以实现模块化。

实现方式一：如果脚手架目录并未显示 webpack 配置，可以直接在对 css 文件进行重命名为 `comp1.module.css`。使用方式：

```js
import comp1 from './comp1.module.css'

export default class Comp1 extends Component {
  render() {
    return <div className={comp1.box}>hello</div>
  }
}
```

方式二：在 webpack 中开启模块化，开启后使用方式与方式一相同。

```txt
    {test:/\.css$/, use:['style-loader','css-loader?modules']}
```

方式三：直接使用 less 等 css 库。

CSS 引入顺序注意事项：

- 应该在样式导入之后引入组件，以避免样式覆盖问题
- 我们自己书写的全局样式应该在组件库样式后导入，才会生效、覆盖库里的样式

### 2.4 图片引入

若图片位于 public 目录，引入方式为：

```html
<img src="1.jpg" />
```

若图片位于 src 下，如 assets 目录中，引入方式为：

```js
import imgA from '../assets/1.jpg'
export default class Demo extends React.Component {
  render(){
    return (
      <div>
        <img src={imgA}>
        <img src={require('../assets/1.jpg')}>
      </div>
    )
  }
}
```

## 三 组件抽象

### 3.1 高阶组件 Higher-Order Components

高阶组件只是一个函数，接收组件作为参数，返回一个新的组件。

高阶组件一般用于将组件增强，比如为组件添加新的内容：

```js
const CustomHighComp = (Comp) => {
  return class extends Component {
    render() {
      // 添加新属性
      return <Comp title="hello" />
    }
  }
}
```

## 四 受控组件与非受控组件

### 4.1 受控组件

在表单中，input 输入框往往需要绑定一个 change 事件，每当表单状态发生改变时，都会通过该事件写入到组件的 state 中，在 React 中这种组件称为受控组件（controlled component），在受控组件中，组件渲染出的状态与它的 value 或 checked prop 相对应。React 通过这种方式消除了组件的局部状态，使得应用的整个状态更加可控。

React 官方同样推荐使用受控表单组件：

```js
import React, { Component } from 'react'
class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      area: '',
    }
  }
  handleChange(e) {
    this.setState({
      area: e.target.value,
    })
  }
  render() {
    const { area } = this.state
    return (
      <select value={area} onChange={this.handleChange}>
        <option value="beijing">北京</option>
        <option value="shanghai">上海</option>
        <option value="hangzhou">杭州</option>
      </select>
    )
  }
}
```

总结下 React 受控组件更新 state 的流程：

- (1) 可以通过在初始 state 中设置表单的默认值。
- (2) 每当表单的值发生变化时，调用 onChange 事件处理器。
- (3) 事件处理器通过合成事件对象 e 拿到改变后的状态，并更新应用的 state。
- (4) setState 触发视图的重新渲染，完成表单组件值的更新

在 React 中，数据是单向流动的。一般通过 props 传递给组件的 state，现在又通过 onChange 事件处理器将新的表单数据写回到组件的 state，完成了双向数据绑定。

### 4.2 非受控组件

如果一个表单组件没有 value props（单选按钮和复选框对应的是 checked prop）时，就可以称为非。相应地，你可以使用 defaultValue 和 defaultChecked prop 来表示组件的默认状态。

```js
import React, { Component } from 'react'
class App extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    // 这里使用 React 提供的 ref prop 来操作 DOM
    // 当然，也可以使用原生的接口，如 document.querySelector
    const { value } = this.refs.name
    console.log(value)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input ref="name" type="text" defaultValue="Hangzhou" />
        <button type="submit">Submit</button>
      </form>
    )
  }
}
```

在 React 中，非受控组件是一种反模式，它的值不受组件自身的 state 或 props 控制。通常，需要通过为其添加 ref prop 来访问渲染后的底层 DOM 元素。

### 4.3 对比受控组件和非受控组件

我们刚才看到通过 defaultValue 或者 defaultChecked 来设置表单的默认值，它仅会被渲染
一次，在后续的渲染时并不起作用。下面对比以下两个示例。

```js
// 将输入的字母转化为大写展示：
<input
  value={this.state.value}
  onChange={e => {
  this.setState({ value: e.target.value.toUpperCase() })
}}
/>
// 直接展示输入的字母：
<input
  defaultValue={this.state.value}
  onChange={e => {
  this.setState({ value: e.target.value.toUpperCase() })
}}
/>
```

在受控组件中，可以将用户输入的英文字母转化为大写后输出展示，而在非受控组件中则不会。而如果不对受控组件绑定 change 事件，我们在文本框中输入任何值都不会起作用。多数情况下，对于非受控组件，我们并不需要提供 change 事件。通过上面的示例可以看出，受控组件和非受控组件的最大区别是：非受控组件的状态并不会受应用状态的控制，应用中也多了局部组件状态，而受控组件的值来自于组件的 state。

### 4.4 react 表单属性

React 的 form 组件提供了几个重要的属性，用于展示组件的状态。

- value：类型为 text 的 input 组件、textarea 组件以及 select 组件都借助 value prop 来展示应用的状态。
- checked：类型为 radio 或 checkbox 的组件借助值为 boolean 类型的 selected prop 来展示应用的状态。
- selected：该属性可作用于 select 组件下面的 option 上，React 并不建议使用这种方式表示状态，而推荐在 select 组件上使用 value 的方式。

### 4.5 受控组件输入中文 BUG

受控组件使用 onChange 时，经常会出现中文未输入完就触发了 onChange 事件，这是因为 input 输入框其实还有三个事件未做处理：

```js
class Demo extends React.Component {
  constructor(props) {
    super(props)
  }

  compositionstart(event) {
    console.log('开始输入', event.data)
  }

  compositionupdate(event) {
    document.getElementById('data').innerHTML = event.data
    console.log('正在输入的数据', event.data)
  }

  compositionend(event) {
    console.log('结束输入', event.data)
  }

  changeEvent() {
    console.log('改变')
  }

  render() {
    return (
      <div>
        <input
          type="text"
          id="test"
          onChange={this.changeEvent.bind(this)}
          onCompositionStart={this.compositionstart.bind(this)}
          onCompositionUpdate={this.compositionupdate.bind(this)}
          onCompositionEnd={this.compositionend.bind(this)}
        />
        输入的数据为 <span id="data"></span>
      </div>
    )
  }
}
```

定义一个中间变量 isOncomposition，默认为 true，当触发 compositionend 事件时，我们把它赋为 false，这样 change 事件就会执行，但是在 Chrome 浏览器中，compositionend 事件是后于 change 事件触发的，所以还要考虑该情况：

```js
let isOnComposition = false;
const isChrome = !!window.chrome && !!window.chrome.webstore

class App extends React.Component {

	handleComposition(e) {
		if (e.type === 'compositionend') {
			// composition is end
			isOnComposition = false

			if (!isOnComposition && isChrome) {
				// fire onChange
				this.changeEvent(e);
			}
		} else {
			// in composition
			isOnComposition = true
		}
	}

	changeEvent() {
		if (!isOnComposition) {
			console.log('改变');
		}
	}
  render() {
		return (
          <div>
              <input type="text" id="test" onChange={this.changeEvent.bind(this)}
                     onCompositionStart={this.handleComposition.bind(this)}
                     onCompositionUpdate={this.handleComposition.bind(this)}
                     onCompositionEnd={this.handleComposition.bind(this)}/>
          </div>
		)
	}
```

## 五 组件性能优化

### 5.0 性能优化经验

Web 中，浏览器的重绘、重排是对性能影响的最大因素，React 的虚拟 DOM 就是尽可能的减少重绘、重排。为了防止不必要的渲染 React 还提供了便捷的方法：PureRender。

这里涉及纯函数的概念：

- 给定相同的输入，总是返回相同的输出：给定相加的函数 f(2,5)，无论任何时间、执行多少次，都只有一个结果 7。而` Math.random()``new Date() ` `slice()`则不是纯函数。
- 过程没有副作用（side effect）：函数不会改变外部状态。比如方法的参数是对象、数组等，执行时就有可能改变外部的该对象、数组。
- 没有额外的状态依赖：指方法内的状态都只在方法的生命周期内存活，这意味着我们不能在方法内使用共享变量，因为这会给方法带来不可知因素。

React 在设计时带有函数式编程的基因，因为 React 组件本身就是纯函数。React 的 createElement 方法保证了组件是纯净的，即传入指定 props 得到一定的 Virtual DOM，整个过程都是可预测的。

我们可以通过拆分组件为子组件，进而对组件做更细粒度的控制。这也是函数式编程的魅力之一，保持纯净状态，可以让方法或组件更加专注（focused），体积更小（small），更独立（independent），更具有复用性（reusability）和可测试性（testability）

### 5.1 Component 类的问题

使用 Component 实现的组件，在状态更新后会有以下问题：

- 只要执行了 setState()，即使该函数内没做任何事情，组件依然会重新 render
- 父组件 render 之后，子组件即使没有用到父组件数据也会 render！

Component 组件只有在组件的 state 或者 props 真正发生改变触发 render 时，效率才会变高。

render 一直被触发的原因是：shouldComponentUpdate() 这个阀门总是返回 true。所以我们可以在该生命周期内手动进行原状态、修改状态的对比，决定是否返回 true。

但是对于一些引用数据，对比起来较为复杂，React 已经提供了代替 Component 的方案，其内部原理也是对比状态的变化情况。

```js
export default Comp extends PureComponent {}
```

### 5.2 Immutable

Immutable Data 就是一旦创建，就不能再更改的数据。对 Immutable 对象进行修改、添加或删除操作，都会返回一个新的 Immutable 对象。Immutable 实现的原理是持久化的数据结构（persistent data structure），也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。同时为了避免深拷贝把所有节点都复制一遍带来的性能损耗，Immutable 使用了结构共享（structuralsharing），即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其他节点则进行共享。

Immutable.js 库也是 Facebook 出品的，内部实现一套完整的持久化数据结构，还有很多易用的数据类型，比如 Collection、List、Map、Set、Record、Seq。有非常全面的 map、filter、groupBy、reduce、find 等函数式操作方法。同时，API 也尽量与 JavaScript 的 Object 或 Array 类似。

Immutable 的优点：

- 降低了“可变”带来的复杂度。可变数据耦合了 time 和 value 的概念，造成了数据很难被回溯。
- 节省内存。Immutable 使用结构共享尽量复用内存。没有被引用的对象会被垃圾回收
- 撤销/重做，复制/粘贴，甚至时间旅行这些功能做起来都是小菜一碟。因为每次数据都是不一样的，那么只要把这些数据放到一个数组里存储起来，想回退到哪里，就拿出对应的数据，这很容易开发出撤销及重做这两种功能。
- 并发安全。传统的并发非常难做，因为要处理各种数据不一致的问题，所以“聪明人”发明了各种锁来解决。但使用了 Immutable 之后，数据天生是不可变的，并发锁就不再需要了。然而现在并没有用，因为 JavaScript 还是单线程运行的。
- 拥抱函数式编程。Immutable 本身就是函数式编程中的概念。只要输入一致，输出必然一致，这样开发的组件更易于调试和组装。

节省内存示例：

```js
//  a 和 b 共享了没有变化的 filter 节点
import { Map } from 'immutable'
let a = Map({
  select: 'users',
  filter: Map({ name: 'Cam' }),
})
let b = a.set('select', 'people')
a === b // => false
a.get('filter') === b.get('filter') // => true
```

Immutable 的缺点：容易与原生对象混淆。

注意：两个 Immutable 对象可以使用 === 来比较，这样是直接比较内存地址，其性能最好。但是即使两个对象的值是一样的，也会返回 false：

```js
let map1 = Immutable.Map({ a: 1, b: 1, c: 1 })
let map2 = Immutable.Map({ a: 1, b: 1, c: 1 })
map1 === map2 // => false
// 为了直接比较对象的值，Immutable 提供了 Immutable.is 来作“值比较”：
Immutable.is(map1, map2) // => true
```
