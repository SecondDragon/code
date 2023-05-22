import React from 'react';
import {Link,Route} from '../react-router-dom';
import UserAdd from './UserAdd';
import UserList from './UserList';
import UserDetail from './UserDetail';
class User extends React.Component{
    render(){
        return (
            <div>
               <ul>
                   <li><Link to="/user/list">用户列表</Link></li>
                   <li><Link to="/user/add">添加用户</Link></li>
               </ul>
               <div>
                   <Route path="/user/add" component={UserAdd}/>
                   <Route path="/user/list" component={UserList}/>
                   <Route path="/user/detail/:id" component={UserDetail}/>
               </div>
            </div>
        )
    }
}
export default User;