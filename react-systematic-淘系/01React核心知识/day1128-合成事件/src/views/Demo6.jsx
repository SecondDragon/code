import React from "react";

class Demo extends React.Component {

    handle = () => {
        console.log('点击了按钮');
    };

    render() {
        return <div>
            <button onClick={this.handle}>
                提交
            </button>
        </div>;
    }
}

export default Demo;