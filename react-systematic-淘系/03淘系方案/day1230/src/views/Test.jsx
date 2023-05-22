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

let n = 0;
const Test = function Test() {
    n++;
    let [state, setState] = useState(['A', 'B', 'C', 'D', 'E', 'F']);
    useEffect(() => {
        setTimeout(() => {
            setState(['A', 'C', 'E', 'B', 'G', 'F']);
        }, 2000);
    }, []);

    return <TestBox>
        {state.map(item => {
            return <div key={item}>
                {n > 1 ? `${item}-NEW` : item}
            </div>;
        })}
    </TestBox>;
};
export default Test;