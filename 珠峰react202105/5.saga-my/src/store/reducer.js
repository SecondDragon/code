
import *  as actionTypes from './action-types';
function reducer(state={number:0},action){
   switch(action.type){
       case actionTypes.ADD:
           return {number:state.number+1};
       case actionTypes.MINUS:
           return {number:state.number-1};    
       default:
           return state;    
   }
}
export default reducer;