import React, { useContext } from "react";
import { Button } from 'antd';
import ThemeContext from "../ThemeContext";

const VoteFooter = function VoteFooter() {
    const { store } = useContext(ThemeContext);

    return <div className="footer">
        <Button type="primary"
            onClick={() => {
                store.dispatch({
                    type: 'VOTE_SUP'
                });
            }}>
            支持
        </Button>

        <Button type="primary" danger
            onClick={() => {
                store.dispatch({
                    type: 'VOTE_OPP'
                });
            }}>
            反对
        </Button>
    </div>;
};
export default VoteFooter;