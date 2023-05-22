import React from "react";
import styled from "styled-components";
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import * as TYPES from '../store/action-types';

/* 样式处理 */
const DemoBox = styled.div`
    margin: 40px auto;
    padding: 20px;
    width: 200px;
    border: 1px solid #DDD;

    .num{
        display: block;
        font-size: 20px;
        line-height: 40px;
    }

    .ant-btn{
        border-radius: 0;
    }
`;

const Demo = function Demo() {
    const dispatch = useDispatch(),
        { num } = useSelector(state => state.demo);

    return <DemoBox>
        <span className="num">{num}</span>
        <Button type="primary"
            onClick={() => {
                dispatch({
                    type: TYPES.DEMO_COUNT,
                    payload: 5
                });
            }}>
            按钮
        </Button>

        <Button type="primary" danger
            onClick={() => {
                dispatch({
                    type: TYPES.DEMO_COUNT + '@SAGA@',
                    payload: 10
                });
            }}>
            异步按钮
        </Button>
    </DemoBox>
};
export default Demo;