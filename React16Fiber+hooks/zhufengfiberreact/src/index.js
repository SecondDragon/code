import React from './react';
import ReactDOM from './react-dom';

//useState 是一个语法糖，基于useReducer
class ClassCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }
  onClick = () => {
    this.setState(state => ({ number: state.number + 1 }));
  }
  render() {
    return (
      <div id="counter">
        <span>{this.state.number}</span>
        <button onClick={this.onClick}>加1</button>
      </div>
    )
  }
}
const ADD = 'ADD';
function reducer(state, action) {
  switch (action.type) {
    case ADD:
      return { count: state.count + 1 };
    default:
      return state;
  }
}
function FunctionCounter() {
  const [numberState, setNumberState] = React.useState({ number: 0 });//0
  if (Math.random() > .5) {
    const [countState, dispatch] = React.useReducer(reducer, { count: 0 });//0
  }

  return (
    <div>
      <div id="counter1">
        <span>{numberState.number}</span>
        <button onClick={() => setNumberState({ number: numberState.number + 1 })}>加1</button>
      </div>
      <div id="counter2">
        <span>{countState.count}</span>
        <button onClick={() => dispatch({ type: ADD })}>加1</button>
      </div>
    </div>
  )
}
ReactDOM.render(<FunctionCounter name="计数器" />, document.getElementById('root'));