import React from "react";
import styled from "styled-components";
import { CommonListBox, titleSize, colorRed } from './common';
/* 编写组件的样式：基于CSS-IN-JS思想中的styled-components插件 */
const MenuBox = styled.div`
    background-color: lightpink;
    width: 400px;

    .title{
        font-size: ${titleSize}px;
        line-height: 40px;

        &:hover{
            color: ${colorRed};
        }
    }

    li{
        font-size: 16px !important;
    }
`;

class Menu extends React.Component {
    render() {
        return <MenuBox>
            <h2 className="title">产品分类列表</h2>
            <CommonListBox>
                <li>手机</li>
                <li>电脑</li>
                <li>家电</li>
            </CommonListBox>
        </MenuBox>;
    }
};

export default Menu;