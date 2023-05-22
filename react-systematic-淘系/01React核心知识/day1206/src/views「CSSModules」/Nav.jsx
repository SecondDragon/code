import React from "react";
import sty from './Nav.module.css';
import common from './common.module.css';

const Nav = function Nav() {
    return <nav className={sty.box}>
        <h2 className={`${sty.title} ${common.hoverColor}`}>购物商城</h2>
        <div className={sty.list}>
            <a href="">首页</a>
            <a href="">秒杀</a>
            <a href="">我的</a>
        </div>
        <span className={sty.link}></span>
    </nav>;
};

export default Nav;