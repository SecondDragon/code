import React from 'react';
import {history} from 'umi';
function Login(props) {
  let toLogin = ()=>{
    localStorage.setItem('isLogin','true');
    if(props.location.state && props.location.state.from){
        history.push(props.location.state.from);
    }
  }  
  return (
    <div>
      <button onClick={toLogin}>登录</button>
    </div>
  );
}

export default Login;