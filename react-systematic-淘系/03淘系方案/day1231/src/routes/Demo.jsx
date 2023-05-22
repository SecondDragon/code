import React from "react";
import styled from "styled-components";
import { Button } from 'antd';
import { connect } from 'dva';

/* 样式处理 */
const DemoBox = styled.div`
    margin: 40px auto;
    padding: 20px;
    width: 300px;
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

const Demo = function Demo({ num, loading, dispatch }) {
    loading = loading.effects['demo/incrementAsync'];

    return <DemoBox>
        <span className="num">{num}</span>
        <Button type="primary"
            onClick={() => {
                dispatch({
                    type: 'demo/increment',
                    payload: 5
                });
            }}>
            同步按钮
        </Button>

        <Button type="primary" danger loading={loading}
            onClick={() => {
                dispatch({
                    type: 'demo/incrementAsync',
                    payload: 10
                });
            }}>
            异步按钮
        </Button>
    </DemoBox>;
};
export default connect(
    state => {
        return {
            ...state.demo,
            loading: state.loading
        };
    }
)(Demo);