import React, { CSSProperties } from 'react';
import {BarsOutlined} from '@ant-design/icons';
import logo from '@/assets/logo.png';
import './index.less';
import {Transition} from 'react-transition-group';
import classnames from 'classnames';
const duration = 1000;//动画的持续时间
const defaultStyle = {
    opacity:0,
    transition:`opacity ${duration}ms ease-in-out`
}
//keyof TransitionStyles = entering|entered|exiting|exited
interface TransitionStyles{
    entering:CSSProperties
    entered:CSSProperties
    exiting:CSSProperties
    exited:CSSProperties
}
const transitionStyles:TransitionStyles = {
    entering:{opacity:1},
    entered:{opacity:1,color:'red'},
    exiting:{opacity:0},
    exited:{opacity:0},
}
interface Props{
    currentCategory:string;
    setCurrentCategory:(currentCategory:string)=>any
    refreshLessons:any
}
function HomeHeader(props:Props){
    let [isCategoryVisible,setCategoryVisible] = React.useState(false);
    let setCurrentCategory = (event:React.MouseEvent<HTMLUListElement>)=>{
        let target = event.target as HTMLUListElement;
        let category = target.dataset.category;
        props.setCurrentCategory(category);
        setCategoryVisible(false);
        props.refreshLessons();
    }
    return (
        <header className="home-header">
            <div className="logo-header">
                <img src={logo}/>
                <BarsOutlined onClick={()=>setCategoryVisible(!isCategoryVisible)}/>
            </div>
            <Transition in={isCategoryVisible} timeout={duration}>
                {
                    (state:keyof TransitionStyles)=>{
                        return (
                            <ul className="category"
                               onClick={setCurrentCategory}
                                style={{
                                    ...defaultStyle,
                                    ...transitionStyles[state]
                                }}
                            >
                                <li data-category="all" className={classnames({active:props.currentCategory==='all'})}>全部课程</li>
                                <li data-category="react"  className={classnames({active:props.currentCategory==='react'})}>React课程</li>
                                <li data-category="vue"  className={classnames({active:props.currentCategory==='vue'})}>Vue课程</li>
                            </ul>
                        );
                    }
                }
            </Transition>
        </header>
    )
}
export default HomeHeader;
/**
当你进入的时候，当要显示的时候
先设置两种状态
先变
exited {opacity:0}
立刻变为1
entering {opacity:1}
在1秒内让opacity 从0 变成 1
等一秒后
entered {opacity:1}


当离开的时候
先设置两种状态
entered {opacity:1}
exiting {opacity:0}
等一秒后
exited {opacity:0}
*/

