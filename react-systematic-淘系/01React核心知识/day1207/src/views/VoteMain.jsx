import React from "react";
import ThemeContext from "../ThemeContext";

class VoteMain extends React.Component {
    static contextType = ThemeContext;

    render() {
        const { store } = this.context;
        let { supNum, oppNum } = store.getState();

        return <div className="main">
            <p>支持人数：{supNum}人</p>
            <p>反对人数：{oppNum}人</p>
        </div>;
    }

    componentDidMount() {
        const { store } = this.context;
        store.subscribe(() => {
            this.forceUpdate();
        });
    }
}

export default VoteMain;