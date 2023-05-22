import React from 'react';
import { Link } from '../react-router-dom';
import { UserAPI } from '../utils';
class UserList extends React.Component{
    state = {users:[]}
    componentDidMount(){
        let users = UserAPI.list();
        console.log(users);
        this.setState({users});
    }
    render(){
        return (
            <ul>
                {
                    this.state.users.map((user)=>(
                        <li key={user.id}>
                            <Link to={{pathname:`/user/detail/${user.id}`,state:user}}>{user.username}</Link>
                        </li>
                    ))
                }
            </ul>
        )
    }
}
export default UserList;