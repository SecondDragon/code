import React from 'react';
import RouterContext from './RouterContext';
class Router  extends React.Component{
  static computeRootMatch(pathname){
    return {path:'/',url:'/',params:{},isExact:pathname==='/'}
  }
  constructor(props) {
      super(props);
      this.state = {
          location:props.history.location
      }
      //监听路径变化，当路径发生变化 后执行回调，并传入最新的路径
      this.unlisten = props.history.listen((location)=>{
          this.setState({location});//状态改变会引起组件刷新
      });
  }
  componentWillUnmount(){
    this.unlisten();
  }
  render(){
      let value = {
          location:this.state.location,//当前路径
          history:this.props.history,//历史对象
          match:Router.computeRootMatch(this.state.location.pathname)
      }
      return (
          <RouterContext.Provider value={value}>
              {this.props.children}
          </RouterContext.Provider>
      )
  }
}
export default Router;