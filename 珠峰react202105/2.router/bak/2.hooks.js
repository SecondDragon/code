import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router,Route,Link,
  useHistory,useLocation,useRouteMatch,useParams} from './react-router-dom';
function Home(){
  return <div>Home</div>
}
function UserDetail(){
  let history = useHistory();//{id:1}
  console.log('history',history);
  let location = useLocation();//{id:1}
  console.log('location',location);
  let params = useParams();//{id:1}
  console.log('params',params);
  return <div>UserDetail</div>
}
function Post(){
  //能计算出来你给的这个路径和当前的地址栏中真实路径是否匹配
  let match = useRouteMatch({
    path:'/post/:id',
    strict:true,
    sensitive:true
  });
  console.log('match',match);
  return <div>Post</div>
}
ReactDOM.render(
  <Router>
    <div>
      <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link to={{pathname:`/user/detail/1`,state:{id:1,name:'张三'}}}>用户1的详情页</Link></li>
        <li><Link to="/post/1">贴子</Link></li>
      </ul>
      <Route path="/" component={Home}/>
      <Route path="/user/detail/:id" component={UserDetail}/>
      <Route path="/post/:id" component={Post}/>
    </div>
  </Router>,document.getElementById('root')
);

