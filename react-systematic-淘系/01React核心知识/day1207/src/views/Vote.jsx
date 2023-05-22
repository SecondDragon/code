import React, { useContext, useState, useEffect } from "react";
import './Vote.less';
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';
import ThemeContext from "../ThemeContext";

const Vote = function Vote() {
    const { store } = useContext(ThemeContext);
    // 获取容器中的公共状态
    let { supNum, oppNum } = store.getState();

    /* // 组件第一次渲染完毕后，把让组件更新的方法，放在STORE的事件池中
    let [num, setNum] = useState(0);
    const update = () => {
        setNum(num + 1);
    };
    useEffect(() => {
        // let unsubscribe = store.subscribe(让组件更新的方法)
        //   + 把让组件更新的方法放在STORE的事件池中
        //   + 返回的unsubscribe方法执行，可以把刚才放入事件池中的方法移除掉
        let unsubscribe = store.subscribe(update);
        return () => {
            unsubscribe();
        };
    }, [num]); */
    let [_, setNum] = useState(0);
    useEffect(() => {
        store.subscribe(() => {
            setNum(+new Date());
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