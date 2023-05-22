import React from "react";
import { Button } from 'antd';

const VoteFooter = function VoteFooter() {
    return <div className="footer">
        <Button type="primary">支持</Button>
        <Button type="primary" danger>反对</Button>
    </div>;
};
export default VoteFooter;