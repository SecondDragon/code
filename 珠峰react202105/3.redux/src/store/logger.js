/**
 * 中间件的写法是固定的
 * middlewareAPI  是一个对象，里面有二个属性，一个是getState,dispatch重新派发动作
 * dispatch 是我们改造后的dispatch
 */
 function logger({getState,dispatch}){
    return function(next){//为了实现中间件的级联，调用下一个中间件
      return function(action){//这才就是我们改造后的dispatch方法了
          console.log('prev state',getState());
          next(action);//如果你只有一个中间件的话，next就是原始的store.dispatch(action)
          console.log('next state',getState());
          return action;
      }
    }
  }
  export default logger;