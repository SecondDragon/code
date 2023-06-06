// 不考虑插件功能
function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];

  function getState() {
    return state;
  }
  function dispatch(action) {
    state = reducer(state,action);
    listeners.forEach((l) => l());
    return action;
  }

  function subscribe(listener) {
    listeners.push(listener);

    return () => {
        // 利用了闭包
      listeners = listeners.filter(l !== listener);
    };
  }

  dispatch({ type: "@@initial" });
  return {
    getState,
    subscribe,
    dispatch,
  };
}

const ADD1 = 'ADD1';
const MINUS1 = 'MINUS1';

// const ADD2 = 'ADD2';
// const MINUS2 = 'MINUS2';

const RESET = 'RESET';
let initialState={number:0}
function reducer(state=initialState, action) {
    switch(action.type){
        case ADD1:
            if(action.error){//说明失败了
                return {number:state.number-1};
            }else{
                return {number:state.number+1};
            }
        case MINUS1:
            return {number:state.number-1};
        case RESET:
                return initialState;
        default:
            return state;        
    }
}

let store=createStore(reducer)
store.subscribe(()=>{
    store.dispatch({type:'ADD1'})
})



console.log("store.getState()",store.getState());
