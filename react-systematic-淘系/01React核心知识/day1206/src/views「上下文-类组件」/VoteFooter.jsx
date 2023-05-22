import React from "react";
import { Button } from 'antd';
import ThemeContext from "@/ThemeContext";

class VoteFooter extends React.Component {
    render() {
        return <ThemeContext.Consumer>
            {context => {
                let { change } = context;
                return <div className="footer">
                    <Button type="primary" onClick={change.bind(null, 'sup')}>支持</Button>
                    <Button type="primary" danger onClick={change.bind(null, 'opp')}>反对</Button>
                </div>;
            }}
        </ThemeContext.Consumer>;
    }
}

export default VoteFooter;