import {combineReducers} from '../../redux';
import counter1 from './counter1';
import counter2 from './counter2';
let reducers = {
    counter1,
    counter2
}
/* 
let combinedState = {
    counter1:{number:0},
    counter2:{number:0}
}
*/
let combinedReducer = combineReducers(reducers);
export default combinedReducer;
