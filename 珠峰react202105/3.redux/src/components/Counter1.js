import React from 'react';
import actions from '../store/actions/counter1';
import {connect} from '../react-redux';
class Counter1 extends React.Component{
    render(){
        return (
            <div>
                <p>{this.props.number}</p>
                <button onClick={this.props.add1}>+</button>
                <button onClick={this.props.minus1}>-</button>
                <button onClick={this.props.thunkAdd1}>thunkAdd1</button>
                <button onClick={this.props.promiseAdd1}>promiseAdd1</button>
                <button onClick={this.props.promiseAdd2}>promiseAdd2</button>
            </div>
        )
    }
}
//把总状态映射出来一个新状态，state.counter1将会成为Counter1的属性对象 
///输入把仓库中的状态输入到组件中
let mapStateToProps = (state)=>state.counter1;
//把动作进行派发到仓库中，改变状态的值
let mapDispatchToProps = actions;//经过绑定后也会成为Counter1的属性对象 
// Counter1.props = {...state.counter1,...boundActions};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter1);
//redux-persist
/**
 * 组件在使用仓库的时候
 * 1 输入 从仓库的状态中取数据，在组件中进行显示
 * 2 输出 可以在组件中派发动作，修改仓库中的状态
 */