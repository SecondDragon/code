import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router,Route,Link} from 'react-router-dom';
function lazy(load){
  return class extends React.Component{
    state = {trueComponent:null}
    componentDidMount(){
      load().then(result=>{
        this.setState({trueComponent:result.default||result});
      });
    }
    render(){
      let {trueComponent:LoadComponent} = this.state;
      return LoadComponent?<LoadComponent {...this.props}/>:null;
    }
  }
}
let LazyHome = lazy(()=>import(/* webpackChunkName: "Home" */'./components/Home'));
let LazyProfile = lazy(()=>import(/* webpackChunkName: "Profile" */'./components/Profile'));
function SuspenseHome(){
  return (
    <React.Suspense fallback={<div>loading</div>}>
      <LazyHome/>
    </React.Suspense>
  )
}
function SuspenseProfile(){
  return (
    <React.Suspense fallback={<div>loading</div>}>
      <LazyProfile/>
    </React.Suspense>
  )
}

ReactDOM.render(
  <Router>
    <div>
      <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link to="/profile">个人中心</Link></li>
      </ul>
      <Route exact path="/" component={SuspenseHome}/>
      <Route path="/profile" component={SuspenseProfile}/>
    </div>
  </Router>,document.getElementById('root')
);
