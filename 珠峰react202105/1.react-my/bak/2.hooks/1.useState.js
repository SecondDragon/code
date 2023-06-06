import React from './react';
import ReactDOM from './react-dom';

function Counter(){
    let [number1,setNumber1] = React.useState('Counter-number1');

    let handleClick = ()=>{
        debugger
        setNumber1(number1+1);
    }
    return (
        <div>
            <p>{number1}</p>
            <Counter2 count={number1}></Counter2>
            <button onClick={handleClick}>+</button>
        </div>
    )
}

function Counter2(props){

    return (
        <div>
            <p>{props.count}</p>
        </div>
    )
}
ReactDOM.render(
    <Counter />
    , document.getElementById('root'));



/*

  export function useState(initialState){
  //按顺序 创建
    if(!hookState[hookIndex])
       hookState[hookIndex]=initialState;
    let currentIndex = hookIndex;
    function setState(newState){
        hookState[currentIndex]=newState;
        scheduleUpdate();
    }
    return [hookState[hookIndex++],setState];
}
*/