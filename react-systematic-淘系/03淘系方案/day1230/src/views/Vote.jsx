import React from "react";
import styled from "styled-components";
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import * as TYPES from '../store/action-types';

// 样式处理
const VoteBox = styled.div`
    box-sizing: border-box;
    margin: 0 auto;
    width: 400px;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #DDD;
        .title {
            font-size: 18px;
            line-height: 50px;
        }
        .num {
            font-size: 18px;
        }
    }

    .main {
        padding: 15px 0;
        p {
            line-height: 35px;
            font-size: 15px;
        }
    }

    .ant-btn {
        margin-right: 10px;
        border-radius: 0;
    }
`;

const Vote = function Vote() {
    const { supNum, oppNum } = useSelector(state => state.vote),
        dispatch = useDispatch();

    return <VoteBox>
        <div className="header">
            <h2 className="title">React是很棒的前端框架</h2>
            <span className="num">{supNum + oppNum}</span>
        </div>
        <div className="main">
            <p>支持人数：{supNum}人</p>
            <p>反对人数：{oppNum}人</p>
        </div>
        <div className="footer">
            <Button type="primary"
                onClick={() => {
                    dispatch({
                        type: TYPES.VOTE_SUP
                    });
                }}>
                支持
            </Button>
            <Button type="primary"
                onClick={() => {
                    dispatch({
                        type: TYPES.VOTE_SUP + '@SAGA@'
                    });
                }}>
                异步支持
            </Button>

            <Button type="primary" danger
                onClick={() => {
                    dispatch({
                        type: TYPES.VOTE_OPP
                    });
                }}>
                反对
            </Button>
            <Button type="primary" danger
                onClick={() => {
                    dispatch({
                        type: TYPES.VOTE_OPP + '@SAGA@'
                    });
                }}>
                反对异步
            </Button>
        </div>
    </VoteBox>;
};
export default Vote;