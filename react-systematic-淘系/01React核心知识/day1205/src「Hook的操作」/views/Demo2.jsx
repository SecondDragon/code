import React, { useState, useCallback } from "react";
import { Button } from 'antd';
import './Demo.less';

/* 子组件 */
/* class Child extends React.PureComponent {
    render() {
        console.log('Child Render');
        return <div>
            我是子组件
        </div>;
    }
} */

const Child = React.memo(function Child(props) {
    console.log('Child Render');
    return <div>
        我是子组件
    </div>;
});

/* 父组件 */
// 诉求：当父组件更新的时候，因为传递给子组件的属性仅仅是一个函数「特点：基本应该算是不变的」，所以不想再让子组件也跟着更新了！
//   + 第一条：传递给子组件的属性（函数），每一次需要是相同的堆内存地址(是一致的) . 基于useCallback处理！！
//   + 第二条：在子组件内部也要做一个处理，验证父组件传递的属性是否发生改变，如果没有变化，则让子组件不能更新，有变化才需要更新 . 继承React.PureComponent即可「在shouldComponentUpdate中对新老属性做了浅比较」!! 函数组件是基于 React.memo 函数，对新老传递的属性做比较，如果不一致，才会把函数组件执行，如果一致，则不让子组件更新！！
const Demo = function Demo() {
    let [x, setX] = useState(0);

    // const handle = () => { };  //第一次:0x001  第二次:0x101  第三次:0x201 ...
    const handle = useCallback(() => { }, []); //第一次:0x001  第二次:0x001  第三次:0x001 ...

    return <div className="vote-box">
        <Child handle={handle} />
        <div className="main">
            <p>{x}</p>
        </div>
        <div className="footer">
            <Button type="primary" onClick={() => setX(x + 1)}>累加</Button>
        </div>
    </div>;
};


/* let prev;
const Demo = function Demo() {
    let [x, setX] = useState(0);

    /!*
     const xxx = useCallback(callback,[dependencies])
       + 组件第一次渲染，useCallback执行，创建一个函数“callback”，赋值给xxx
       + 组件后续每一次更新，判断依赖的状态值是否改变，如果改变，则重新创建新的函数堆，赋值给xxx；但是如果，依赖的状态没有更新「或者没有设置依赖“[]”」则xxx获取的一直是第一次创建的函数堆，不会创建新的函数出来！！
       + 或者说，基于useCallback，可以始终获取第一次创建函数的堆内存地址(或者说函数的引用)
     *!/
    const handle = useCallback(() => {
        // ...
    }, []); //第一次：0x001  第二次：0x001 .....

    if (!prev) {
        prev = handle;
    } else {
        console.log(handle === prev); //true
    }

    return <div className="vote-box">
        <div className="main">
            <p>{x}</p>
        </div>
        <div className="footer">
            <Button type="primary" onClick={() => setX(x + 1)}>累加</Button>
        </div>
    </div>;
}; */

export default Demo;