import React from 'react';
import ReactReduxContext from '../ReactReduxContext';

function useDispatch(){
    const {store} = React.useContext(ReactReduxContext);
    return store.dispatch;
}
export default useDispatch;
//对标替代的是mapDispatchToProps