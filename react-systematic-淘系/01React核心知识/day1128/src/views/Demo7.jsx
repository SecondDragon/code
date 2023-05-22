import React from "react";

class Demo extends React.Component {
    state = {
        arr: [{
            id: 1,
            title: '新闻'
        }, {
            id: 2,
            title: '体育'
        }, {
            id: 3,
            title: '电影'
        }]
    };

    handle = (item) => {
        // item:点击这一项的数据
        console.log('我点击的是：' + item.title);
    };

    render() {
        let { arr } = this.state;
        return <div>
            {arr.map(item => {
                let { id, title } = item;
                return <span key={id}
                    style={{
                        padding: '5px 15px',
                        marginRight: 10,
                        border: '1px solid #DDD',
                        cursor: 'pointer'
                    }}
                    onClick={this.handle.bind(this, item)}>
                    {title}
                </span>;
            })}
        </div>;
    }
}

export default Demo;