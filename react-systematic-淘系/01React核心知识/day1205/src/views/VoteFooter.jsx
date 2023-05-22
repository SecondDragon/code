import React, { memo } from "react";
import { Button } from 'antd';
import PropTypes from 'prop-types';

const VoteFooter = function VoteFooter(props) {
    console.log('Footer Render');
    let { change } = props;
    return <div className="footer">
        <Button type="primary" onClick={change.bind(null, 'sup')}>支持</Button>
        <Button type="primary" danger onClick={change.bind(null, 'opp')}>反对</Button>
    </div>;
};
/* 属性规则校验 */
VoteFooter.defaultProps = {};
VoteFooter.propTypes = {
    change: PropTypes.func.isRequired
};

export default memo(VoteFooter);