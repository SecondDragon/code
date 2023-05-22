import React from "react";
import { createUseStyles } from 'react-jss';
const useStyles = createUseStyles({
    box: {
        backgroundColor: 'lightpink',
        width: '400px'
    },
    list: {
        '& li': {
            lineHeight: '30px',
            '&:hover': {
                color: 'red'
            }
        }
    }
});

class Menu extends React.Component {
    render() {
        let { box, list } = this.props;
        return <div className={box}>
            <ul className={list}>
                <li>手机</li>
                <li>电脑</li>
                <li>家电</li>
            </ul>
        </div>;
    }
};

// 创建一个代理组件(函数组件)：获取基于ReactJSS编写的样式，把获取的样式基于属性传递给类组件
const ProxyComponent = function ProxyComponent(Component) {
    // Component:真实要渲染的组件「例如 Menu」
    // 方法执行要返回的一个函数组件：我们基于export default导出的是这个组件，在App调用的也是这个组件(HOC)
    return function HOC(props) {
        let sty = useStyles();
        return <Component {...props} {...sty} />;
    };
};

export default ProxyComponent(Menu);