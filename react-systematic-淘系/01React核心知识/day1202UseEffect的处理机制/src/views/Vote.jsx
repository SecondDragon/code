import React, { useState } from "react";
import { Button } from 'antd';
import './Vote.less';

/* 官方建议是：需要多个状态，就把useState执行多次即可 */
const Vote = function Vote(props) {
    let [supNum, setSupNum] = useState(10),
        [oppNum, setOppNum] = useState(5);

    const handle = (type) => {
        if (type === 'sup') {
            setSupNum(supNum + 1);
            return;
        }
        setOppNum(oppNum + 1);
    };

    return <div className="vote-box">
        <div className="header">
            <h2 className="title">{props.title}</h2>
            <span className="num">{supNum + oppNum}</span>
        </div>
        <div className="main">
            <p>支持人数：{supNum}人</p>
            <p>反对人数：{oppNum}人</p>
        </div>
        <div className="footer">
            <Button type="primary" onClick={handle.bind(null, 'sup')}>支持</Button>
            <Button type="primary" danger onClick={handle.bind(null, 'opp')}>反对</Button>
        </div>
    </div>;
};

/* 
执行一次useState：把需要的状态信息都放在对象中统一管理
    + 执行setState方法的时候，传递的是啥值，就把状态“整体”改为啥值 
      setState({
        supNum: state.supNum + 1
      }) 
      => 把状态值修改为 {supNum:11} ，oppNum成员就丢失了
      => 并不会像类组件中的this.setState一样，不支持部分状态的更新
    + 应该改为以下的处理方案
      setState({
        ...state, //在修改值之前，先把原有的所有状态，都展开赋值给新对象，再去修改要改动的那一项值即可
        supNum: state.supNum + 1
      });
*/
/* const Vote = function Vote(props) {
    let [state, setState] = useState({
        supNum: 10,
        oppNum: 5
    });

    const handle = (type) => {
        if (type === 'sup') {
            setState({
                ...state,
                supNum: state.supNum + 1
            });
            return;
        }
        setState({
            ...state,
            oppNum: state.oppNum + 1
        });
    };

    return <div className="vote-box">
        <div className="header">
            <h2 className="title">{props.title}</h2>
            <span className="num">{state.supNum + state.oppNum}</span>
        </div>
        <div className="main">
            <p>支持人数：{state.supNum}人</p>
            <p>反对人数：{state.oppNum}人</p>
        </div>
        <div className="footer">
            <Button type="primary" onClick={handle.bind(null, 'sup')}>支持</Button>
            <Button type="primary" danger onClick={handle.bind(null, 'opp')}>反对</Button>
        </div>
    </div>;
}; */
export default Vote;