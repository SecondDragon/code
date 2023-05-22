import React from "react";

const B = function B(props) {
    // const { navigate } = props;
    return <div className="box">
        B组件的内容
        <button onClick={() => {
            // navigate(`/c/100/zhufeng`);
        }}>按钮</button>
    </div>;
};
export default B;