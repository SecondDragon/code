import React from 'react';
import { UserAPI } from '../utils';
class UserDetail extends React.Component{
    render(){
        let user = this.props.location.state;
        if(!user){
           let id = this.props.match.params.id;
           user=UserAPI.find(id);
        }
        return (
            <div>
              <p>id:{user?.id}</p>
              <p>name:{user?.username}</p>
            </div>
        )
    }
}
export default UserDetail;