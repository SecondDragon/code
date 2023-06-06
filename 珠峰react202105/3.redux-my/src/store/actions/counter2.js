import * as types from '../action-types';
const actions = {
    add2() {
        return { type: types.ADD2 };
    }, 
    minus2() {
        return { type: types.MINUS2 };
    }
}
export default actions;