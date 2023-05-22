import React,{ PropsWithChildren,useRef,useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom'
import HomeHeader from './components/HomeHeader';
import {connect} from 'react-redux';
import actions from '@/store/actions/home';
import {CombinedState} from '@/store/reducers';
import {HomeState} from '@/store/reducers/home';
import HomeSliders from './components/HomeSliders';
import LessonList from './components/LessonList';
import {loadMore,downRefresh,throttle,debounce} from '@/utils';
import './index.less';
type stateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof actions;
interface Params { }
type Props = PropsWithChildren<RouteComponentProps<Params> & stateProps & DispatchProps>;
function Home(props: Props) {
    //上拉加载，下拉刷新 虚拟列表 keepalive 滚动状态保持
    let homeContainerRef = useRef(null);
    let lessonListRef = useRef(null);
    useEffect(()=>{
        loadMore(homeContainerRef.current,props.getLessons);
        downRefresh(homeContainerRef.current,props.refreshLessons);
        lessonListRef.current();
        //重新渲染组件
        homeContainerRef.current.addEventListener('scroll',throttle(lessonListRef.current,16));
    },[]);//依赖数组为空表示此effect回调只会执行一次
    return (
        <>
            <HomeHeader 
                currentCategory={props.currentCategory}
                setCurrentCategory={props.setCurrentCategory}
                refreshLessons={props.refreshLessons}
            />
            <div className="home-container" ref={homeContainerRef}>
                <HomeSliders sliders={props.sliders} getSliders={props.getSliders}/>
                <LessonList 
                  lessons={props.lessons} 
                  getLessons={props.getLessons}
                  ref={lessonListRef}
                  homeContainerRef={homeContainerRef}
                />
            </div>
        </>
    )
}
function mapStateToProps(state:CombinedState):HomeState{
    return state.home;
}
export default connect(
    mapStateToProps,
    actions
)(Home);