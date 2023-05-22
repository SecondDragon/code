import React from './react';
import ReactDOM from './react-dom';
//高阶组件 两大用途 属性代理 反向继承
//高阶组件来自高阶函数
const withLoading = (OldComponent)=>{
   return class extends React.Component{
    show = ()=>{
      let loading = document.createElement('div');
      loading.innerHTML = `<p id="loading" 
      style="position:absolute;top:100px;left:50%;z-index:10;background-color:gray">loading</p>`;
      document.body.appendChild(loading);
    }
    hide = ()=>{
      document.getElementById('loading').remove();
    }
    render(){
      return <OldComponent {...this.props} show={this.show} hide={this.hide}/>
    }
   }
}
@withLoading
class Panel extends React.Component{
  render(){
    return (
      <div>
        {this.props.title}
        <button onClick={this.props.show}>显示</button>
        <button onClick={this.props.hide}>隐藏</button>
      </div>
    )
  }
}
//let LoadingPanel = withLoading(Panel);
ReactDOM.render(<Panel title="这是标题"/>, document.getElementById('root'));
