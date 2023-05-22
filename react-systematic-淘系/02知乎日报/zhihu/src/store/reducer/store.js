import * as TYPES from '../action-types';
import _ from '../../assets/utils';

let initial = {
    list: null
};
export default function storeReducer(state = initial, action) {
    state = _.clone(state);
    switch (action.type) {
        case TYPES.STORE_LIST:
            state.list = action.list;
            break;
        case TYPES.STORE_REMOVE:
            if (Array.isArray(state.list)) {
                state.list = state.list.filter(item => {
                    return +item.id !== +action.id;
                });
            }
            break;
        default:
    }
    return state;
};