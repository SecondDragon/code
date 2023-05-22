
import * as actionTypes from '../action-types';
const actions = {
    add(){
        return {type:actionTypes.ADD}
    },
    asyncAdd(){
        return {type:actionTypes.ASYNC_ADD}
    },
    minus(){
        return {type:actionTypes.MINUS}
    },
    asyncMinus(){
        return {type:actionTypes.ASYNC_MINUS}
    },
    stop(){
        return {type:actionTypes.STOP}
    }
}
export default actions;