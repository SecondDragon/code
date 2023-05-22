import React from 'react';
import dva,{connect} from './dva';
import {Route,Link,routerRedux} from './dva/router';
//import {Router,Route,Link,routerRedux} from 'react-router-dom';
//import {ConnectedRouter} from 'connected-react-router';
//import {createBrowserHistory} from 'history';
//let history = createBrowserHistory();
let {ConnectedRouter,push} = routerRedux;
const app = dva();
//定义一个模型
//let reducer = combineReducers({counter})
app.model({
    namespace:'counter1',//命名空间
    state:{number:0},//每个命名空间都有自己的状态
    reducers:{//每个命名空间都有自己的reducer处理器
        add(state){
            return {number:state.number+1};
        }
    },
    //Warning: [sagaEffects.put] counter1/add should not be prefixed with namespace counter1
    effects:{
        *asyncAdd(action,{call,put}){//动作 sagaEffects counter1/asyncAdd
            console.log('action',action);
            yield call(delay,1000);
            //如果在effect里发动作，如果是派发给自己的模型的话不需要加namespace,
            yield put({type:'counter1/add'});
        },
        *goto({payload},{put}){
            //不能写到reducers,因为reducer里不能再派发动作了，只能在此派发
            yield put(push(payload));
        }
    }
});
app.model({
    namespace:'counter2',//命名空间
    state:{number:0},//每个命名空间都有自己的状态
    reducers:{//每个命名空间都有自己的reducer处理器
        minus(state){
            return {number:state.number-1};
        }
    },
    effects:{
        *asyncMinus(action,{call,put}){//动作 sagaEffects  counter2/asyncMinus
            console.log('action',action);
            yield call(delay,1000);
            //如果在effect里发动作，如果是派发给自己的模型的话不需要加namespace,
            yield put({type:'minus'});
        }
    }
});
//定义组件
function Counter1(props){
    return (
        <div>
            <p>{props.number}</p>
            <button onClick={()=>props.dispatch({type:'counter1/add'})}>+</button>
            <button onClick={()=>props.dispatch({type:'counter1/asyncAdd'})}>asyncAdd</button>
            <button onClick={()=>props.dispatch({type:'counter1/goto',payload:'/counter2'})}>跳到counter2</button>
        </div>
    )
}
//连接组件和和仓库
const ConnectedCounter1 = connect(state=>state.counter1)(Counter1);
//定义组件
function Counter2(props){
    return (
        <div>
            <p>{props.number}</p>
            <button onClick={()=>props.dispatch({type:'counter2/minus'})}>-</button>
            <button onClick={()=>props.dispatch({type:'counter2/asyncMinus'})}>asyncMinus</button>
        </div>
    )
}
//连接组件和和仓库
const ConnectedCounter2 = connect(state=>state.counter2)(Counter2);
//定义路由规则 
app.router((api)=>(
    <ConnectedRouter history={api.history}>
       <>
       <ul>
            <li><Link to="counter1">Counter1</Link></li>
            <li><Link to="counter2">Counter2</Link></li>
           
        </ul>
        <Route path="/counter1" exact={true} component={ConnectedCounter1}/>
        <Route path="/counter2" exact={true} component={ConnectedCounter2}/>
       </>
    </ConnectedRouter>
));
app.start('#root');

function delay(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms);
    });
}