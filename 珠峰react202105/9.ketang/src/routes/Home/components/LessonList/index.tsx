import React, { PropsWithChildren, useEffect } from 'react';
import './index.less';
import { Card, Skeleton, Button, Alert, Menu } from 'antd';
import { Link } from 'react-router-dom';
import Lesson from '@/typings/lesson';
import { MenuOutlined } from '@ant-design/icons';
interface VisibleLesson extends Lesson{
    index:number
}
interface Props {
    lessons: any;
    getLessons: any
    homeContainerRef:any
}
function LessonList(props: PropsWithChildren<Props>,forwardedRef:any) {
    //只是为了让我们得到一个强行刷新函数组件的方法
    let [,forceUpdate] = React.useReducer(x=>x+1,0);
    useEffect(() => {
        if (props.lessons.list.length === 0) {
            props.getLessons();
        }
        forwardedRef.current = forceUpdate;
    },[]);
    let remSize = parseFloat(document.documentElement.style.fontSize);//750px=>75px 375px=>37.5px
    const itemSize = (650/75)*remSize;//每个条目实际的宽度
    //window.innerHeight=屏幕的高度=100vh -实际际的头和尾的高度  750px header 100px tab=121px=221
    const screenHeight = window.innerHeight - (221/75) * remSize;//显示内容的容器的高度
    const homeContainer = props.homeContainerRef.current;//DOM元素
    let start=0,end=0;
    if(homeContainer){
        const scrollTop = homeContainer.scrollTop;//父容器向上卷去的高度
        start = Math.floor(scrollTop/itemSize);
        end = start + Math.floor(screenHeight/itemSize);
        start -=2,end+=2;//右闭右开的区间
        start=start<0?0:start;//小于0取0
        end=end>props.lessons.list.length?props.lessons.list.length:end;// 如果大于最后一个，取最大值
    }
    //可视条目的列表
    const visibleList:VisibleLesson[]  = props.lessons.list.map((item:Lesson,index:number)=>({
        ...item,index
    })).slice(start,end);
    const basicStyle:React.CSSProperties  = {
        position:'absolute',
        top:0,
        left:0,
        width:'100%',
        height:itemSize
    }
    return (
        <section className="lesson-list">
            <h2><MenuOutlined />全部课程</h2>
            <div style={{position:'relative',width:'100%',height:`${props.lessons.list.length*itemSize}px`}}>
            {
                    visibleList.map((lesson: VisibleLesson, index: number) => (
                        <Link 
                        key={lesson.id} 
                        to={{ pathname: `/detail/${lesson.id}`, state: lesson }}
                        style={{...basicStyle,top:`${lesson.index*itemSize}px`}}
                        >
                            <Card
                                hoverable={true}
                                style={{ width: '100%' }}
                                cover={<img alt={lesson.title} src={lesson.poster} />}
                            >
                                <Card.Meta
                                    title={lesson.title}
                                    description={`价格:${lesson.price}元`}
                                />
                            </Card>
                        </Link>
                    ))
                }
            </div>
            {
                props.lessons.hasMore ? (
                    <Button onClick={props.getLessons} loading={props.lessons.loading} type="primary" block
                    >{props.lessons.loading ? "" : "加载更多"}</Button>) : <Alert
                    style={{ textAlign: 'center' }}
                    message="到底了"
                    type="warning"
                />

            }
        </section>
    )
}

export default React.forwardRef(LessonList);