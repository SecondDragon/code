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

export default connect(state => state.vote)(Vote);
/* export default connect(state => {
    return {
        supNum: state.vote.supNum,
        oppNum: state.vote.oppNum,
        num: state.vote.num
    }
})(Vote); */

/*
 connect(mapStateToProps,mapDispatchToProps)(我们要渲染的组件)
   1. mapStateToProps：可以获取到redux中的公共状态，把需要的信息作为属性，传递组件即可
    connect(state=>{
        // state:存储redux容器中，所有模块的公共状态信息
        // 返回对象中的信息，就是要作为属性，传递给组件的信息
        return {
            supNum:state.vote.supNum,
            info:state.personal.info
        };
    })(Vote);
 */