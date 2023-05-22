import { combineReducers } from 'redux';
import voteReducer from './voteReducer';
import demoReducer from './demoReducer';

const reducer = combineReducers({
    vote: voteReducer,
    demo: demoReducer
});
export default reducer;