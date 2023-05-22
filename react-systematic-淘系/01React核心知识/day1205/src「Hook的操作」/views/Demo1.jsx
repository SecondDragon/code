import React, { useState, useMemo } from "react";
import { Button } from 'antd';
import './Demo.less';

const Demo = function Demo() {
    let [supNum, setSupNum] = useState(10),
        [oppNum, setOppNum] = useState(5),
        [x, setX] = useState(0);

    /* 
     let xxx = useMemo(callback,[dependencies])
       + 第一次渲染组件的时候，callback会执行
       + 后期只有依赖的状态值发生改变，callback才会再执行
       + 每一次会把callback执行的返回结果赋值给xxx
       + useMemo具备“计算缓存”，在依赖的状态值没有发生改变，callback没有触发执行的时候，xxx获取的是上一次计算出来的结果
       和Vue中的计算属性非常的类似！！
     */
    let ratio = useMemo(() => {
        let total = supNum + oppNum,
            ratio = '--';
        if (total > 0) ratio = (supNum / total * 100).toFixed(2) + '%';
        return ratio;
    }, [supNum, oppNum]);

    return <div className="vote-box">
        <div className="main">
            <p>支持人数：{supNum}人</p>
            <p>反对人数：{oppNum}人</p>
            <p>支持比率：{ratio}</p>
            <p>x:{x}</p>
        </div>
        <div className="footer">
            <Button type="primary" onClick={() => setSupNum(supNum + 1)}>支持</Button>
            <Button type="primary" danger onClick={() => setOppNum(oppNum + 1)}>反对</Button>
            <Button onClick={() => setX(x + 1)}>干点别的事</Button>
        </div>
    </div>;
};

export default Demo;