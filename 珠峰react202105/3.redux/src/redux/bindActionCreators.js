
/**
 * 传入老的actionCreator,返回一个新函数
 * @param {*} actionCreator 
 * @param {*} dispatch 
 * @returns 
 */
function bindActionCreator(actionCreator,dispatch){
  return function(...args){
      return dispatch(actionCreator.apply(this,args));
  }
}
/**
 * 
 * @param {*} actionCreators action的创建者对象
 * @param {*} dispatch 派发动作的方法
 */
export default function bindActionCreators(actionCreators,dispatch){
    if(typeof actionCreators === 'function'){
        return bindActionCreator(actionCreators,dispatch);
    }
    const boundActionCreators = {};
    for(const key in actionCreators){
        const actionCreator = actionCreators[key];
        if(typeof actionCreator === 'function'){
            boundActionCreators[key]=bindActionCreator(actionCreator,dispatch);
        }
    }
    return boundActionCreators;
}