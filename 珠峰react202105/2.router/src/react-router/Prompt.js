import React from 'react';
import RouterContext from './RouterContext';
import LifeCycle from './LifeCycle';
function Prompt(props){
    let value = React.useContext(RouterContext);
    React.useEffect(()=>{
        return  value.history.block(props.message)
    });
    return null;
}
/* class Prompt extends React.Component{
    static contextType = RouterContext;
    componentDidMount(){
        const block = this.context.history.block;
        this.release = block(this.props.message)
    }
    componentWillUnmount(){
        this.release()
    }
    render(){
        return  null;
    }
} */
/* function Prompt({when,message}){
    return (
        <RouterContext.Consumer>
            {
                (value)=>{
                    //如果不需要阻止跳转，则可以直接返回null,什么都不做
                    if(!when)return null;
                    //需要给history对象上添加一个block方法
                    const block = value.history.block;
                    return (
                        <LifeCycle
                           onMount={lifeCycleInstance=>lifeCycleInstance.release = block(message)}
                           onUnMount={lifeCycleInstance=>lifeCycleInstance.release()}
                        />
                    )

                }
            }
        </RouterContext.Consumer>
    )
} */

export default Prompt;