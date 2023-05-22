/* personal版块下的reducer */
import _ from '@/assets/utils';
import * as TYPES from '../action-types';

const initial = {
    num: 100,
    info: null
};
export default function personalReducer(state = initial, action) {
    state = _.clone(true, state);
    switch (action.type) {
        case TYPES.PERSONAL_INFO:
            state.info = action.payload;
            break;
        default:
    }
    return state;
};