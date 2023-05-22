import React from './react';
import ReactDOM from './react-dom';
class TextInput extends React.Component{
  constructor(props){
    super(props);
    this.inputRef = React.createRef();
  }
  getTextInputFocus = ()=>{
    this.inputRef.current.focus();
  }
  render(){
    return <input ref={this.inputRef}/>
  }
}
class Form extends React.Component{
  constructor(props){
    super(props);
    this.textInputRef = React.createRef();
  }
  getFormFocus = ()=>{
    //this.textInputRef.current就会指向TextInput类组件的实例
    this.textInputRef.current.getTextInputFocus();
  }
  render(){
    return (
      <>
        <TextInput ref={this.textInputRef}/>
        <button onClick={this.getFormFocus}>获得焦点</button>
      </>
    )
  }
}

ReactDOM.render(<Form/>,document.getElementById('root'));
