import React from "react";
import './Vote.less';
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';

const Vote = function Vote() {
    return <div className="vote-box">
        <div className="header">
            <h2 className="title">React是很棒的前端框架</h2>
            <span className="num">0</span>
        </div>
        <VoteMain />
        <VoteFooter />
    </div>;
};

export default Vote;