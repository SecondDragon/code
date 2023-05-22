import React, { useContext } from "react";
import ThemeContext from "../ThemeContext";

const VoteMain = function VoteMain() {
    let { supNum, oppNum } = useContext(ThemeContext);
    return <div className="main">
        <p>支持人数：{supNum}人</p>
        <p>反对人数：{oppNum}人</p>
    </div>;
};

/* const VoteMain = function VoteMain() {
    return <ThemeContext.Consumer>
        {context => {
            let { supNum, oppNum } = context;
            return <div className="main">
                <p>支持人数：{supNum}人</p>
                <p>反对人数：{oppNum}人</p>
            </div>;
        }}
    </ThemeContext.Consumer>;
}; */

export default VoteMain;