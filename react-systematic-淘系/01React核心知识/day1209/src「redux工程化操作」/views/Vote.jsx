import React, { useContext, useEffect, useState } from "react";
import './Vote.less';
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';
import ThemeContext from "../ThemeContext";

const Vote = function Vote() {
    const { store } = useContext(ThemeContext);
    let { supNum, oppNum } = store.getState().vote;

    let [, forceUpdate] = useState(0);
    useEffect(() => {
        store.subscribe(() => {
            forceUpdate(+new Date());
        });
    }, []);

    return <div className="vote-box">
        <div className="header">
            <h2 className="title">React是很棒的前端框架</h2>
            <span className="num">{supNum + oppNum}</span>
        </div>
        <VoteMain />
        <VoteFooter />
    </div>;
};

export default Vote;