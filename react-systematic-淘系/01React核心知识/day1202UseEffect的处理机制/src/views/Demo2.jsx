import React, { useState } from "react";
import { Button } from 'antd';
import './Demo.less';

/*
 函数组件的每一次渲染(或者是更新)，都是把函数(重新)执行，产生一个全新的“私有上下文”!
   + 内部的代码也需要重新执行
   + 涉及的函数需要重新的构建{这些函数的作用域(函数执行的上级上下文)，是每一次执行DEMO产生的闭包}
   + 每一次执行DEMO函数，也会把useState重新执行，但是：
     + 执行useState，只有第一次，设置的初始值会生效，其余以后再执行，获取的状态都是最新的状态值「而不是初始值」
     + 返回的修改状态的方法，每一次都是返回一个新的

var _state;
function useState(initialValue) {
    if (typeof _state === "undefined") {
        if(typeof initialValue==="function"){
            _state = initialValue();
        }else{
            _state = initialValue
        }
    };
    var setState = function setState(value) {
        if(Object.is(_state,value)) return;
        if(typeof value==="function"){
            _state = value(_state);
        }else{
            _state = value;
        }
        // 通知视图更新
    };
    return [_state, setState];
}
let [num1, setNum] = useState(0); //num1=0  setNum=setState 0x001
setNum(100); //=>_state=100 通知视图更新
// ---
let [num2, setNum] = useState(0); //num2=100  setNum=setState 0x002
 */
const Demo = function Demo() {
    let [num, setNum] = useState(0);

    const handle = () => {
        setNum(100);
        setTimeout(() => {
            console.log(num); // 0
        }, 2000);
    };
    return <div className="demo">
        <span className="num">{num}</span>
        <Button type="primary"
            size="small"
            onClick={handle}>
            新增
        </Button>
    </div>;
};

export default Demo;