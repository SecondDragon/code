function combineReducers(reducers){
    return function(state={},action){
        let nextState = {};
        for(let key in reducers){
            //nextState['counter1']=counter1(counter1State,action);{number:0}
            //nextState['counter2']=counter2(counter2State,action);
            //reducers[key]一定是一个函数，不可有是一个对象
            nextState[key]=reducers[key](state[key],action);
        }
        return nextState;
    }
}
export default combineReducers;

/**
 * 可能会有很多的组件，每个组件都有自己的状态和动作
 * 规定redux只能有一个仓库，只能有一个reducer,只有一个状态，放在一直会比较乱
 * reducers只能有一层，打平的，不能嵌套
 */