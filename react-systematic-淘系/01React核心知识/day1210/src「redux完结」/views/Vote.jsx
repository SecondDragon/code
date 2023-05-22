import React from "react";
import './Vote.less';
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';
import { connect } from 'react-redux';

const Vote = function Vote(props) {
    let { supNum, oppNum } = props;
    return <div className="vote-box">
        <div className="header">
            <h2 className="title">React是很棒的前端框架</h2>
            <span className="num">{supNum + oppNum}</span>
        </div>
        <VoteMain />
        <VoteFooter />
    </div>;
};

export default connect(
    state => state.vote
)(Vote);