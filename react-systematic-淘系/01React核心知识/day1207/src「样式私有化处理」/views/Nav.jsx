import React from "react";
import { NavBox, NavBarBox } from './NavStyle';

const Nav = function Nav() {
    return <NavBox>
        <h2 className="title">购物商城</h2>
        <NavBarBox hover="#ffe58f">
            <a href="/home">首页</a>
            <a href="/rush">秒杀</a>
            <a href="/my">我的</a>
        </NavBarBox>
    </NavBox>;
};

export default Nav;