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
      <button onClick={handleClick}>+</button>
    </div>
  )
}
ReactDOM.render(
<Counter />
, document.getElementById('root'));