import React, { Component,useState } from 'react'


// function APP2() { 



//   return (
//     <input value={props.username} onChange={props.inputUsername}></input>
//   )
// }



// import React, { useState } from 'react';

export default function App() {
  const [num, setNum] = useState(0);
  const click = () => {
    // setTimeout(() => {
    //   console.log('函数', num);
    // }, 3000);
    setNum(num + 1);
    console.log("num的值",num);
  };
  return <div onClick={click}>click {num}</div>;
}



// class Info extends Component {
//   render() {
//     return (
//       <div>
//         <p>输入长度:{this.props.username.length}</p>

//         <p>提示:{
//           this.props.username.length < 6 ? '长度必须大于等于6位' : ((this.props.username.length >= 6 && this.props.username.length <= 12) ? '长度合法' : "长度必须小于12")
//         }</p>
//       </div>
//     )
//   }
// }


function Info(props) {
  return (
    <div>
      <p>输入长度:{props.username.length}</p>

      <p>提示:{
        props.username.length < 6 ? '长度必须大于等于6位' : ((props.username.length >= 6 && props.username.length <= 12) ? '长度合法' : "长度必须小于12")
      }</p>
    </div>
  )
}

function InputUsername(props) {
  return (
    <input value={props.username} onChange={props.inputUsername}></input>
  )
}


// class InputUsername extends Component {
//   render() {
//     return (
//       <input value={this.props.username} onChange={this.props.inputUsername}></input>
//     )
//   }
// }


// export default class App extends Component {
//   state = {
//     username: ''
//   }
//   inputUsername = (e) => {
//     this.setState({
//       username: e.target.value
//     })
//   }

//   render() {
//     return (
//       <>
//         <InputUsername username={this.state.username} inputUsername={this.inputUsername}></InputUsername>
//         <Info username={this.state.username}></Info>

//         <InputUsername username={this.state.username} inputUsername={this.inputUsername}></InputUsername>
//         <Info username={this.state.username}></Info>
//       </>

//     )
//   }
// }
