import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import history from '../../history';
import counter from './counter';
let reducers = {
    counter,
    router:connectRouter(history)
}
let rootReducer = combineReducers(reducers);
export default rootReducer;
/**
 * state = {
 *   router:{location,action}
 * }
 */