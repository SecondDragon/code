import React from "react";
import sty from './Menu.module.css';
import common from './common.module.css';

const Menu = function Menu() {
    return <div className={sty.box}>
        <ul className={sty.list}>
            <li className={common.hoverColor}>手机</li>
            <li>电脑</li>
            <li>家电</li>
        </ul>
    </div>;
};

export default Menu;