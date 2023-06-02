export default {
    functional: true, // 函数式组件， 会导致render函数中没有this了
    // 正常组件是一个类 this._init()   如果是函数式组件就是一个普通函数
    props: { // 属性校验
        to: {
            type: String,
            required: true
        }
    },

    // render的第二个函数 是内部自己声明一个对象
    render(h, { props, slots, data, parent }) { // render 方法和 template 等价的 -> template语法需要被编译成render函数
        const click = () => {

            // 组件中的$router
            parent.$router.push(props.to)
        }
        // jsx  和 react语法一样 < 开头的表示的是html {} js属性
        return <a onClick = { click } > { slots().default } </a>
    }
}