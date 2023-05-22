import * as TYPES from '../action-types';
import _ from '../../assets/utils';

let initial = {
    num: 10
};
export default function demoReducer(state = initial, action) {
    state = _.clone(state);
    let { payload = 1 } = action; //payload:记录每一次累加的数字
    switch (action.type) {
        case TYPES.DEMO_COUNT:
            state.num += payload;
            break;
        default:
    }
    return state;
};