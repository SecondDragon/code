import React from 'react';
import {Layout,Menu} from 'antd';
import styles from './index.less';
import {Link} from 'dva/router';
let logo = require('../../assets/yay.jpg');
class NavBar extends React.Component{
  render(){
      return (
        <Layout.Header className={styles.header}>
            <img src={logo} alt="logo"/>
            <Menu 
              className={styles.menu} 
              mode="horizontal"
              selectedKeys={[this.props.location.pathname]}
            >
                <Menu.Item key="/home"><Link to="/home">首页</Link></Menu.Item>
                <Menu.Item key="/user"><Link to="/user">用户管理</Link></Menu.Item>
                <Menu.Item key="/profile"><Link to="/profile">个人中心</Link></Menu.Item>
                <Menu.Item key="/login"><Link to="/login">登录</Link></Menu.Item>
                <Menu.Item key="/register"><Link to="/register">注册</Link></Menu.Item>
            </Menu>
        </Layout.Header>
      )
  }
}
export default NavBar;