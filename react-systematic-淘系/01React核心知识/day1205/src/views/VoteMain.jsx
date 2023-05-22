import React, { useMemo } from "react";
import PropTypes from 'prop-types';

const VoteMain = function VoteMain(props) {
    let { supNum, oppNum } = props;
    
    // 基于useMemo实现复杂逻辑的“计算缓存”
    let ratio = useMemo(() => {
        let ratio = '--',
            total = supNum + oppNum;
        if (total > 0) ratio = (supNum / total * 100).toFixed(2) + '%';
        return ratio;
    }, [supNum, oppNum]);

    return <div className="main">
        <p>支持人数：{supNum}人</p>
        <p>反对人数：{oppNum}人</p>
        <p>支持比率：{ratio}</p>
    </div>;
};
/* 属性规则校验 */
VoteMain.defaultProps = {
    supNum: 0,
    oppNum: 0
};
VoteMain.propTypes = {
    supNum: PropTypes.number,
    oppNum: PropTypes.number
};

export default VoteMain;