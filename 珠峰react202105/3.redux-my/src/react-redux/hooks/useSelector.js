import React from 'react';
import ReactReduxContext from '../ReactReduxContext';
function useSelectorWithStore(selector,store){
    let {subscribe,getState} = store;
    const [, forceUpdate] = React.useReducer(x => x + 1, 0);
    let state = getState();
    let selectedState = selector(state);
    React.useLayoutEffect(() => {
        //其实这个订阅只会执行一次就可以了
        return subscribe(forceUpdate);
    }, [subscribe]);
    return selectedState;
}
function useSelector(selector){
    const {store} = React.useContext(ReactReduxContext);
    const selectedState = useSelectorWithStore(selector,store);
    return selectedState;
}
export default useSelector;
