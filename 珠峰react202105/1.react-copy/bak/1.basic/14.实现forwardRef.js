import React from './react';
import ReactDOM from './react-dom';
function TextInput(props,ref){
  return <input ref={ref}/>
}
const ForwardedTextInput = React.forwardRef(TextInput);
class Form extends React.Component{
  constructor(props){
    super(props);
    this.textInputRef = React.createRef();
  }
  getFormFocus = ()=>{
    //this.textInputRef.current就会指向TextInput类组件的实例
    this.textInputRef.current.focus();
  }
  render(){
    return (
      <>
        <ForwardedTextInput ref={this.textInputRef}/>
        <button onClick={this.getFormFocus}>获得焦点</button>
      </>
    )
  }
}

ReactDOM.render(<Form/>,document.getElementById('root'));
/**
Warning: 
Function components cannot be given refs. 
Attempts to access this ref will fail.
 Did you mean to use React.forwardRef()?
不能给函数组件添加ref
 * 
 * 
 */