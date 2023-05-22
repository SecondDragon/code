import { combineReducers } from 'redux';
import voteReducer from './voteReducer';
import personalReducer from './personalReducer';

const reducer = combineReducers({
    vote: voteReducer,
    personal: personalReducer
});
export default reducer;