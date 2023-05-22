import React from "react";
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

/* 创建一个容器 */
class Store {
    // 公共状态
    @observable num = 10;
    // 修改公共状态的方法
    @action change() {
        this.num++;
    }
}
let store = new Store;

/* @observer
class Demo extends React.Component {
    render() {
        return <div>
            <span>{store.num}</span>
            <br />
            <button onClick={() => {
                store.change();
            }}>按钮</button>
        </div>;
    }
} */

// 函数组件无法使用装饰器的语法，但是我们可以把observer执行，把组件传递进去「这样和装饰器有相同的效果」
const Demo = observer(function Demo() {
    return <div>
        <span>{store.num}</span>
        <br />
        <button onClick={() => {
            store.change();
        }}>按钮</button>
    </div>;
});

export default Demo;