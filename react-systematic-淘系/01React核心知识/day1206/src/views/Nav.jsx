import React from "react";
import { createUseStyles } from 'react-jss';
/* 
基于createUseStyles方法，构建组件需要的样式；返回结果是一个自定义Hook函数！ 
  + 对象中的每个成员就是创建的样式类名
  + 可以类似于less等预编译语言中的“嵌套语法”，给其后代/伪类等设置样式！！
自定义Hook执行，返回一个对象，对象中包含：
  + 我们创建的样式类名，作为属性名
  + 编译后的样式类名「唯一的」，作为属性值
  {box: 'box-0-2-1', title: 'title-0-2-2', list: 'list-0-2-3'}
而我们在JS中编写的样式，最后会编译为：
    .box-0-2-1 {
        width: 300px;
        background-color: lightblue;
    }
    .title-0-2-2 {
        color: red;
        font-size: 20px;
    }
    .title-0-2-2:hover {
        color: green;
    }
    .list-0-2-3 a {
        color: #000;
        font-size: 16px;
    }

相对于CSSModules的好处：因为样式是写在JS中的，我们就可以基于一些逻辑操作，实现样式的动态化管理！！
*/
const useStyles = createUseStyles({
    box: {
        backgroundColor: 'lightblue',
        width: '300px'
    },
    title: {
        fontSize: '20px',
        color: 'red',
        '&:hover': {
            color: props => props.color
        }
    },
    list: props => {
        return {
            '& a': {
                fontSize: props.size + 'px',
                color: '#000'
            }
        };
    }
});

const Nav = function Nav() {
    let { box, title, list } = useStyles({
        size: 14,
        color: 'orange'
    });
    return <nav className={box}>
        <h2 className={title}>购物商城</h2>
        <div className={list}>
            <a href="">首页</a>
            <a href="">秒杀</a>
            <a href="">我的</a>
        </div>
    </nav>;
};

export default Nav;