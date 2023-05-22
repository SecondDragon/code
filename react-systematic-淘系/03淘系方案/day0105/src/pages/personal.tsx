import React from "react";
import { NavLink, Outlet } from 'umi';
import styled from 'styled-components';

/* 组件样式 */
const StylePersonalBox = styled.div`
    display: flex;
    .menu{
        a{
            display: block;
            line-height: 35px;
            font-size: 16px;
            color: #000;
            &.active{
                color: green;
            }
        }
    }
    .content{
        padding: 20px;
        font-size: 14px;
    }
`;

const PersonalPage = () => {
    return <StylePersonalBox>
        <div className="menu">
            <NavLink to="/personal/order">订单管理</NavLink>
            <NavLink to="/personal/profile">个人信息</NavLink>
        </div>
        <div className="content">
            <Outlet />
        </div>
    </StylePersonalBox>;
};
export default PersonalPage;