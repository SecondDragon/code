
import React, { useContext, useMemo, useReducer, useLayoutEffect } from 'react';
import ReactReduxContext from './ReactReduxContext';
import { bindActionCreators } from '../redux';
/**
 * PureComponent当属性和状态没有变化的时候不重新渲染
 * 刚才做的优化是有些值只计算一次，不需要反复计算
 * 因为函数组件没有构造函数，没有地方说只能执行一次，只能用useMemo
 * @param {*} mapStateToProps 把仓库中状态映射为当前的组件的属性
 * @param {*} mapDispatchToProps 把派发动作的方法映射为组件的属性
 */
function connect(mapStateToProps, mapDispatchToProps) {
    return function (OldComponent) {
        return class extends React.Component {
            static contextType = ReactReduxContext;
            constructor(props,context){
                super(props);
                console.log('Component constructor');
                const { store } = context;
                const { getState, subscribe,dispatch } = store;
                this.state = mapStateToProps(getState());
                this.unsubscribe = subscribe(() => {
                    this.setState(mapStateToProps(getState()));
                });
                let dispatchProps;
                //把dispatch映射为属性
                if (typeof mapDispatchToProps === 'function') {
                    dispatchProps = mapDispatchToProps(dispatch);
                } else if (typeof mapDispatchToProps === 'object') {
                    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
                } else {
                    dispatchProps = { dispatch };
                }
                this.dispatchProps = dispatchProps;
            }
            componentWillUnmount() {
                this.unsubscribe();
            }
            render() {
                return <OldComponent {...this.props} {...this.state} {...this.dispatchProps} />
            }
        }
    }
}
/**
 * 1.状态映射属性
 * 2.dispatch映射属性
 * 3.状态变化监听，让组件刷新
 */
function connect2(mapStateToProps, mapDispatchToProps) {
    return function (OldComponent) {
        return function (props) {//返回的Counter1组件
            const { store } = useContext(ReactReduxContext);
            const { getState, dispatch, subscribe } = store;
            const prevState = getState();
            //把状态映射为属性
            const stateProps = useMemo(() => mapStateToProps(prevState), [prevState]);
            let dispatchProps = useMemo(() => {
                console.log('dispatchProps render');
                let dispatchProps;
                if (typeof mapDispatchToProps === 'function') {
                    dispatchProps = mapDispatchToProps(dispatch);
                } else if (typeof mapDispatchToProps === 'object') {
                    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
                } else {
                    dispatchProps = { dispatch };
                }
                return dispatchProps;
            }, [dispatch]);
            //把dispatch映射为属性

            //forceUpdate模拟的类组件的强制刷新方法
            const [, forceUpdate] = useReducer(x => x + 1, 0);
            useLayoutEffect(() => {
                //如果仓库里的状态发生变化之后，会就执行forceUpdate
                return subscribe(forceUpdate);
            }, [subscribe]);
            return <OldComponent {...props} {...stateProps} {...dispatchProps} />
        }
    }
}
export default connect;