import React, { useContext } from "react";
import { Button } from 'antd';
import ThemeContext from "../ThemeContext";

const VoteFooter = function VoteFooter() {
    let { change } = useContext(ThemeContext);
    return <div className="footer">
        <Button type="primary" onClick={change.bind(null, 'sup')}>支持</Button>
        <Button type="primary" danger onClick={change.bind(null, 'opp')}>反对</Button>
    </div>;
};
export default VoteFooter;