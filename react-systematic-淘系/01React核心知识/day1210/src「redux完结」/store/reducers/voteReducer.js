import _ from '@/assets/utils';
import * as TYPES from '../action-types';

const initial = {
    supNum: 10,
    oppNum: 5,
    num: 0
};
export default function voteReducer(state = initial, action) {
    state = _.clone(true, state);
    switch (action.type) {
        case TYPES.VOTE_SUP:
            state.supNum++;
            break;
        case TYPES.VOTE_OPP:
            state.oppNum++;
            break;
        default:
    }
    return state;
};