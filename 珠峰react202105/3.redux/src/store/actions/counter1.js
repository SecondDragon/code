import * as types from '../action-types';
const actions = {
    add1() {
        return { type: types.ADD1 };
    },
    minus1() {
        return { type: types.MINUS1 };
    },
    reset() {
        return { type: types.RESET };
    },
    thunkAdd1() {
        return function (dispatch, getState) {
            setTimeout(function () {
                dispatch({ type: types.ADD1 });
            }, 2000);
        }
    },
    promiseAdd1() {
        return {
            type: types.ADD1,
            payload: new Promise((resolve, reject) => {
                setTimeout(() => {
                    let result = Math.random();
                    if (result > .5) {
                        resolve(result);
                    } else {
                        reject(result);
                    }
                }, 1000);
            })
        }
    },
    promiseAdd2() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                //resolve({type:types.ADD1});
                let result = Math.random();
                if (result > .5) {
                    resolve({ type: types.ADD1,payload: result });
                } else {
                    reject({ type: types.ADD1, error: true, payload: result });
                }
            }, 1000);
        });
    }
}
export default actions;