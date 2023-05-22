import React from 'react';
import {Link} from 'umi';
export default class Layout extends React.Component{
    render(){
        return (
            <div>
                <ul>
                    <li><Link to="/user/list">用户列表</Link></li>
                    <li><Link to="/user/add">新增用户</Link></li>
                </ul>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}