import * as types from '../action-types';
let initialState = {number:0};
function reducer(state=initialState,action){
    switch(action.type){
        case types.ADD2:
            return {number:state.number+1};
        case types.MINUS2:
            return {number:state.number-1};
        case types.RESET:
            return initialState;    
        default:
            return state;        
    }
}
export default reducer;