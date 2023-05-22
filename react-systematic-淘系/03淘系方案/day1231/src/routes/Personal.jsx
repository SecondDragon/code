import React from "react";
import { NavLink } from 'dva/router';
import styled from "styled-components";
import { LevelTwoRouterConfig } from '../router';

/* 样式处理 */
const PersonalBox = styled.div`
    display: flex;
    .menu{
        width: 60px;
        a{
            display: block;
            color: #000;
            line-height: 35px;
            font-size: 14px;
            &.active{
                color: red;
            }
        }
    }
`;

const Personal = function Personal() {
    return <PersonalBox>
        <div className="menu">
            <NavLink to="/personal/order">我的订单</NavLink>
            <NavLink to="/personal/profile">我的信息</NavLink>
        </div>
        <div className="content">
            <LevelTwoRouterConfig path="/personal" />
        </div>
    </PersonalBox>;
};
export default Personal;