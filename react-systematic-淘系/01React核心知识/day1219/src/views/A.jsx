import React from "react";
import { Link, NavLink } from 'react-router-dom';
import RouterView from "../router";
import routes from "../router/aRoutes";

/* 基础样式 */
import styled from "styled-components";
const DemoBox = styled.div`
    display: flex;
    font-size: 12px;
    .menu{
        a{
            font-size: 12px;
            color: #000;
            display: block;
            
            &.active{
                color: green;
            }
        }
    }
`;

const A = function A() {
    return <DemoBox>
        <div className="menu">
            <NavLink to="/a/a1">A1</NavLink>
            <NavLink to="/a/a2">A2</NavLink>
            <NavLink to="/a/a3">A3</NavLink>
        </div>

        <div className="view">
            <RouterView routes={routes} />
        </div>
    </DemoBox>;
};
export default A;