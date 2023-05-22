import React from "react";
import './Vote.less';
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';

class Vote extends React.Component {
    state = {
        supNum: 10,
        oppNum: 0
    };

    // 设置为箭头函数：不论方法在哪执行的，方法中的this永远都是Vote父组件的实例
    change = (type) => {
        let { supNum, oppNum } = this.state;
        if (type === 'sup') {
            this.setState({ supNum: supNum + 1 });
            return;
        }
        this.setState({ oppNum: oppNum + 1 });
    };

    render() {
        let { supNum, oppNum } = this.state;
        return <div className="vote-box">
            <div className="header">
                <h2 className="title">React是很棒的前端框架</h2>
                <span className="num">{supNum + oppNum}</span>
            </div>
            <VoteMain supNum={supNum} oppNum={oppNum} />
            <VoteFooter change={this.change} />
        </div>;
    }
}

export default Vote;