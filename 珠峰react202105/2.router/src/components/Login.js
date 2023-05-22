import React from 'react';
class Login extends React.Component{
    login = ()=>{
        localStorage.setItem('logined',true);
        let to ='/';
        if(this.props.location.state){
            to = this.props.location.state.from||'/';
        }
        this.props.history.push(to);
    }
    render(){
        return (
           <button onClick={this.login}>登录</button>
        )
    }
}
export default Login;