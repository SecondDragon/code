import React, { useState, useCallback } from "react";
import './Vote.less';
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';

const Vote = function Vote() {
    let [supNum, setSupNum] = useState(10),
        [oppNum, setOppNum] = useState(0);

    const change = useCallback((type) => {
        if (type === 'sup') {
            setSupNum(supNum + 1);
            return;
        }
        setOppNum(oppNum + 1);
    }, [supNum, oppNum]); //只要supNum/oppNum就会重新创建新的方法

    return <div className="vote-box">
        <div className="header">
            <h2 className="title">React是很棒的前端框架</h2>
            <span className="num">{supNum + oppNum}</span>
        </div>
        <VoteMain supNum={supNum} oppNum={oppNum} />
        <VoteFooter change={change} />
    </div>;
};

export default Vote;