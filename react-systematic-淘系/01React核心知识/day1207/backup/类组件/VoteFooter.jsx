import React from "react";
import { Button } from 'antd';

class VoteFooter extends React.Component {
    render() {
        return <div className="footer">
            <Button type="primary">支持</Button>
            <Button type="primary" danger>反对</Button>
        </div>;
    }
}

export default VoteFooter;