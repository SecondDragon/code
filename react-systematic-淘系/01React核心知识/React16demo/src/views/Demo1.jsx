import React from "react";

class Demo extends React.Component {
    state = {
        x: 10,
        y: 5,
        z: 0
    };

    handle = () => {
        let { x, y, z } = this.state;
        this.setState({ x: x + 1 }); //异步
        this.setState({ y: y + 1 }); //异步
        console.log(this.state); //{x:10,y:5,z:0} -> 渲染

        setTimeout(() => {
            this.setState({ z: z + 1 }); //同步
            console.log(this.state); //渲染 -> {x:11,y:6,z:1}
        }, 1000);
    };

    render() {
        console.log('视图渲染:RENDER');
        let { x, y, z } = this.state;
        return <div>
            x:{x} - y:{y} - z:{z}
            <br />
            <button onClick={this.handle}>按钮</button>
        </div>;
    }
}

export default Demo;