/**
 * 工厂方法，用来返回一个历史对象
 */
function createBrowserHistory(props){
  let globalHistory = window.history;
  let listeners = [];
  let currentMessage;
  let userConfirm = props.getUserConfirmation?props.getUserConfirmation():window.confirm;
  function go(n){
    globalHistory.go(n);
  }
  function goForward(){
    globalHistory.goForward();
  }
  function goBack(){
    globalHistory.goBack();
  }
  function listen(listener){
    listeners.push(listener);
    return function(){//取消监听函数,如果调它的放会把此监听函数从数组中删除
        listeners = listeners.filter(l=>l!==listener);
    }
  }
  window.addEventListener('popstate',(event)=>{//push入栈 pop类似于出栈
    setState({action:'POP',location:{state:event.state,pathname:window.location.pathname}});
  });
  function setState(newState){
    Object.assign(history,newState);
    history.length = globalHistory.length;
    listeners.forEach(listener=>listener(history.location));
  }
  /**
   * push方法
   * @param {*} path 跳转的路径
   * @param {*} state 跳转的状态
   */
  function push(to,nextState){//对标history pushState
     const action = 'PUSH';
     let pathname;
     let state;
     if(typeof to === 'object'){
         state = to.state;
         pathname = to.pathname;
     }else {
         pathname = to;
         state = nextState;
     }
     if(currentMessage){
      let message = currentMessage({pathname});
      let allow = userConfirm(message);
      if(!allow) return;
     }
     globalHistory.pushState(state,null,pathname);
     let location = {state,pathname};
     setState({action,location});
  }
  function block(newMessage){
    currentMessage = newMessage;
    return ()=>{
        currentMessage=null;
    }
}
  const history = {
    action:'POP',//对history执行的动作
    push,
    go,
    goBack,
    goForward,
    listen,
    location:{pathname:window.location.pathname,state:globalHistory.state},
    block
  }
  return history;
}

export default createBrowserHistory;