import React, { useState } from "react";
import './Vote.less';
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';
import ThemeContext from "../ThemeContext";

const Vote = function Vote() {
    let [supNum, setSupNum] = useState(10),
        [oppNum, setOppNum] = useState(5);
    const change = type => {
        if (type === 'sup') {
            setSupNum(supNum + 1);
            return;
        }
        setOppNum(oppNum + 1);
    };

    return <ThemeContext.Provider
        value={{
            supNum,
            oppNum,
            change
        }}>
        <div className="vote-box">
            <div className="header">
                <h2 className="title">React是很棒的前端框架</h2>
                <span className="num">{supNum + oppNum}</span>
            </div>
            <VoteMain />
            <VoteFooter />
        </div>
    </ThemeContext.Provider>;
};

export default Vote;