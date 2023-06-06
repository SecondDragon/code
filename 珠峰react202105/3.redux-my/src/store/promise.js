/**
 * thunk中间件可以让我们派发函数 funtion
 * 默认情况下，我们只能派发普通对象
 */
 function promise({getState,dispatch}){
    return function(next){//为了实现中间件的级联，调用下一个中间件
      //调用store.dispatch(action)
      // compose和
      return function(action){//这才就是我们改造后的dispatch方法了
          if(action.then&& typeof action.then==='function'){
            action.then(dispatch).catch(dispatch);
          }else if(action.payload && typeof action.payload.then==='function'){
            action.payload
            .then(result => dispatch({ ...action, payload: result }))
            .catch(error => {
               dispatch({ ...action, payload: error, error: true });
               return Promise.reject(error);//返回失败的promise
             })
          }else{
             next(action);
          }
      }
    }
  }
  export default promise;