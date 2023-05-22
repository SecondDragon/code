import * as TYPES from '../action-types';

// 延迟函数：返回promise实例，在指定的时间后，才会让实例为成功
const delay = (interval = 1000) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
};

const voteAction = {
    // redux-thunk中间件的语法
    support() {
        return async (dispatch) => {
            await delay();
            dispatch({
                type: TYPES.VOTE_SUP
            });
        };
    },
    // redux-promise中间件
    async oppose() {
        await delay(2000);
        return {
            type: TYPES.VOTE_OPP
        };
    }
};
export default voteAction;