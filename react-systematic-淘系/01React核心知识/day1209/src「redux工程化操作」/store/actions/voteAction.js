/* 
vote版块要派发的行为对象管理 
  voteAction包含好多方法，每一个方法执行，都返回要派发的行为对象
*/
import * as TYPES from '../action-types';
const voteAction = {
    support() {
        return {
            type: TYPES.VOTE_SUP
        };
    },
    oppose() {
        return {
            type: TYPES.VOTE_OPP
        };
    }
};
export default voteAction;