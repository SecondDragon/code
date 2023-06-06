import React from 'react';
import actions from '../store/actions/counter2';
import {useSelector,useBoundDispatch} from '../react-redux';
//import { bindActionCreators } from '../redux';

/* class Counter2 extends React.Component{
    render(){
        return (
            <div>
                <p>{this.props.number}</p>
                <button onClick={this.props.add2}>+</button>
                <button onClick={this.props.minus2}>-</button>
            </div>
        )
    }
} */
function Counter2(){
    let {number} = useSelector((state)=>state.counter2);
    let boundActions = useBoundDispatch(actions);
    //let dispatch = useDispatch();
    //let boundActions = bindActionCreators(actions,dispatch);
    return (
        <div>
            <p>{number}</p>
            <button onClick={boundActions.add2}>+</button>
            <button onClick={boundActions.minus2}>-</button>
        </div>
    )
}
export default Counter2;
//把总状态映射出来一个新状态，state.counter1将会成为Counter1的属性对象 
///输入把仓库中的状态输入到组件中
/* let mapStateToProps = (state)=>state.counter2;
//把动作进行派发到仓库中，改变状态的值
let mapDispatchToProps = actions;//经过绑定后也会成为Counter1的属性对象 
// Counter1.props = {...state.counter1,...boundActions};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter2); */
//redux-persist
/**
 * 组件在使用仓库的时候
 * 1 输入 从仓库的状态中取数据，在组件中进行显示
 * 2 输出 可以在组件中派发动作，修改仓库中的状态
 */