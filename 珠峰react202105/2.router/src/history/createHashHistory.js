/**
 * 工厂方法，用来返回一个历史对象
 */
function createHashHistory(props) {
    let stack = [];//模拟一个历史条目栈，这里放的都是每一次的location
    let index = -1;//模拟一个当前索引
    let action = 'POP';//动作
    let state;//当前状态
    let listeners = [];//监听函数的数组
    let currentMessage;
    let userConfirm = props.getUserConfirmation?props.getUserConfirmation():window.confirm;
    function go(n) {//go是在历史条目中跳前跳后，条目数不会发生改变
        action = 'POP';
        index += n;
        if(index <0){
            index=0;
        }else if(index >=stack.length){
            index=stack.length-1;
        }
        let nextLocation = stack[index];
        state=nextLocation.state;
        window.location.hash = nextLocation.pathname;//用新的路径名改变当前的hash值
    }
    function goForward() {
        go(1)
    }
    function goBack() {
        go(-1)
    }
    let listener = ()=>{
        let pathname = window.location.hash.slice(1);// /users#/api  /api
        Object.assign(history,{action,location:{pathname,state}}); 
        if(action === 'PUSH'){
          stack[++index]=history.location;//1 2 3 6 5 
          //stack.push(history.location);
        }
        listeners.forEach(listener=>listener(history.location));
     }
    window.addEventListener('hashchange',listener);
    //to={pathname:'',state:{}}
    function push(to,nextState){
        action = 'PUSH';
        let pathname;
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
        window.location.hash = pathname;
    }
    function listen(listener) {
        listeners.push(listener);
        return function () {//取消监听函数,如果调它的放会把此监听函数从数组中删除
            listeners = listeners.filter(l => l !== listener);
        }
    }
    function block(newMessage){
        currentMessage = newMessage;
        return ()=>{
            currentMessage=null;
        }
    }
    const history = {
        action,//对history执行的动作
        push,
        go,
        goBack,
        goForward,
        listen,
        location:{pathname:window.location.hash.slice(1),state:undefined},
        block
    }
    if(window.location.hash){
        action = 'PUSH';
        listener();
    }else{
        window.location.hash='/';
    }
    return history;
}

export default createHashHistory;