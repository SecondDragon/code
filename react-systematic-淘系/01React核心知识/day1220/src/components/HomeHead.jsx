import React from "react";
import { NavLink } from 'react-router-dom';
import { withRouter } from '../router';

/* 样式处理 */
import styled from "styled-components";
const NavBox = styled.nav`
   a{
    margin-right: 10px;
    color: #000;
    &.active{
        color: #ff0000;
    }
   }
`;

const HomeHead = function HomeHead(props) {
    // console.log(props); //也具备了路由信息
    return <NavBox>
        <NavLink to="/a">A</NavLink>
        <NavLink to="/b">B</NavLink>
        <NavLink to="/c">C</NavLink>
    </NavBox>;
};
export default withRouter(HomeHead);