import React from "react";

// 检测是否为对象
const isObject = function isObject(obj) {
    return obj !== null && /^(object|function)$/.test(typeof obj);
};
// 对象浅比较的方法
const shallowEqual = function shallowEqual(objA, objB) {
    if (!isObject(objA) || !isObject(objB)) return false;
    if (objA === objB) return true;
    // 先比较成员的数量
    let keysA = Reflect.ownKeys(objA),
        keysB = Reflect.ownKeys(objB);
    if (keysA.length !== keysB.length) return false;
    // 数量一致，再逐一比较内部的成员「只比较第一级：浅比较」
    for (let i = 0; i < keysA.length; i++) {
        let key = keysA[i];
        // 如果一个对象中有这个成员，一个对象中没有；或者，都有这个成员，但是成员值不一样；都应该被判定为不相同！！
        if (!objB.hasOwnProperty(key) || !Object.is(objA[key], objB[key])) {
            return false;
        }
    }
    // 以上都处理完，发现没有不相同的成员，则认为两个对象是相等的
    return true;
};

class Demo extends React.PureComponent {
    state = {
        arr: [10, 20, 30] //0x001
    };

    render() {
        let { arr } = this.state; //arr->0x001
        return <div>
            {arr.map((item, index) => {
                return <span key={index} style={{
                    display: 'inline-block',
                    width: 100,
                    height: 100,
                    background: 'pink',
                    marginRight: 10
                }}>
                    {item}
                </span>;
            })}

            <br />

            <button onClick={() => {
                arr.push(40); //给0x001堆中新增一个40

                /* 
                // 无法更新的
                console.log(this.state.arr); //[10,20,30,40]
                this.setState({ arr }); //最新修改的转态地址，还是0x001「状态地址没有改」 
                */

                // this.forceUpdate(); //跳过默认加的shouldComponentUpdate，直接更新
                this.setState({
                    arr: [...arr] //我们是让arr状态值改为一个新的数组「堆地址」
                })
            }}>新增SPAN</button>
        </div >;
    }

    /* shouldComponentUpdate(nextProps, nextState) {
        let { props, state } = this;
        // props/state：修改之前的属性状态
        // nextProps/nextState：将要修改的属性状态
        return !shallowEqual(props, nextProps) || !shallowEqual(state, nextState);
    } */
}

export default Demo;


/* 
 PureComponent和Component的区别：
   PureComponent会给类组件默认加一个shouldComponentUpdate周期函数
     + 在此周期函数中，它对新老的属性/状态 会做一个钱浅比较
     + 如果经过浅比较，发现属性和状态并没有改变，则返回false「也就是不继续更新组建」；有变化才会去更新！！
*/