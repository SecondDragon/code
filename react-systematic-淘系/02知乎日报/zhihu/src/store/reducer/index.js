import { combineReducers } from 'redux';
import baseReducer from './base';
import storeReducer from './store';

const reducer = combineReducers({
    base: baseReducer,
    store: storeReducer
});
export default reducer;