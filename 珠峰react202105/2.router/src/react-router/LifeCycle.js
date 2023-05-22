import React from 'react';
class LifeCycle extends React.Component{
    componentDidMount(){
        this.props.onMount&&this.props.onMount(this);
    }
    componentWillUnmount(){
        this.props.onUnMount&&this.props.onUnMount(this);
    }
    render(){
        return  null;
    }
}
export default LifeCycle;