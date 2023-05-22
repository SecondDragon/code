import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TestBox = styled.div`
    display: flex;
    div{
        margin-right: 10px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        background: lightpink;
        font-size: 18px;
    }
`;

const Test = function Test() {
    let [state, setState] = useState(['A', 'B', 'C', 'D', 'E', 'F']);
    useEffect(() => {
        setTimeout(() => {
            setState(['A', 'E', 'B', 'G', 'F']);
        }, 2000);
    }, []);

    return <TestBox>
        {state.map((item, index) => {
            return <div key={index}>
                {item}
            </div>;
        })}
    </TestBox>;
};
export default Test;

/*
 循环创建元素的时候，我们尽可能的不要用索引作为key值，而是用一个不会因为“位置或索引”改变而改变的值做key「例如：每一项唯一的ID值等」
 */