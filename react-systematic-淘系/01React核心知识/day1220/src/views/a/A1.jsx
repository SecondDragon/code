import React, { useReducer, useState } from "react";

const initialState = {
    num: 0
};
const reducer = function reducer(state, action) {
    state = { ...state };
    switch (action.type) {
        case 'plus':
            state.num++;
            break;
        case 'minus':
            state.num--;
            break;
        default:
    }
    return state;
};

const A1 = function A1() {
    let [state, dispatch] = useReducer(reducer, initialState);

    return <div className="box">
        <span>{state.num}</span>
        <br />
        <button onClick={() => {
            dispatch({ type: 'plus' });
        }}>增加</button>
        <button onClick={() => {
            dispatch({ type: 'minus' });
        }}>减少</button>
    </div>;
};
export default A1;

/*
 useReducer是对useState的升级处理
   + 普通需求处理的时候，基本都是useState直接处理，不会使用useReducer
   + 但是如果一个组件的逻辑很复杂，需要大量的状态/大量修改状态的逻辑，此时使用useReducer管理这些状态会更好一些
     @1 不需要再基于useState一个个的去创建状态了
     @2 所有状态修改的逻辑，全部统一化处理了！！
 */