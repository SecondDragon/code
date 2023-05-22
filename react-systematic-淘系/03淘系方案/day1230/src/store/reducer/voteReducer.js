import * as TYPES from '../action-types';
import _ from '../../assets/utils';

let initial = {
    supNum: 10,
    oppNum: 5
};
export default function voteReducer(state = initial, action) {
    state = _.clone(state);
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