import React, { useState } from "react";
import { Button } from 'antd';
import './Demo.less';
import { flushSync } from 'react-dom';

/*
  useState自带了性能优化的机制：
    + 每一次修改状态值的时候，会拿最新要修改的值和之前的状态值做比较「基于Object.is作比较」
    + 如果发现两次的值是一样的，则不会修改状态，也不会让视图更新「可以理解为：类似于PureComponent，在shouldComponentUpdate中做了浅比较和优化」
 */

// 需求：让函数只更新一次，但是最后的结果是20
const Demo = function Demo() {
    console.log('RENDER渲染');
    let [x, setX] = useState(10);

    const handle = () => {
        for (let i = 0; i < 10; i++) {
            setX(prev => {
                // prev:存储上一次的状态值
                console.log(prev);
                return prev + 1; //返回的信息是我们要修改的状态值
            });
        }
    };
    return <div className="demo">
        <span className="num">x:{x}</span>
        <Button type="primary"
            size="small"
            onClick={handle}>
            新增
        </Button>
    </div>;
};

export default Demo;