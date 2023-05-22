import React from 'react';
import { bindActionCreators } from '../../redux';
import ReactReduxContext from '../ReactReduxContext';

function useBoundDispatch(actions){
    const {store} = React.useContext(ReactReduxContext);
    let boundActions = bindActionCreators(actions,store.dispatch);
    return boundActions;
}
export default useBoundDispatch;
//对标替代的是mapDispatchToProps