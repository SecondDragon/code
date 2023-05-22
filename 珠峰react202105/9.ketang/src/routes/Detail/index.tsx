import NavHeader from '@/components/NavHeader';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom'
import { StaticContext } from 'react-router';
import { Card ,Button} from 'antd';
import { Lesson,LessonResult } from '@/typings/lesson';
import { getLesson } from '@/api/home';
import actions from '@/store/actions/cart';
import {connect} from 'react-redux';
interface Params {
    id: string
}
type DispatchProps = typeof actions;
type Props = PropsWithChildren<RouteComponentProps<Params, StaticContext, Lesson>&DispatchProps>;

function Detail(props: Props) {
    let [lesson, setLesson] = useState<Lesson>({} as any);
    useEffect(() => {
        ; (async function () {
            let lesson: Lesson = props.location.state;
            //如果你是用的hash路由进行刷 新的，或者说是直接访问的，不是通过列表跳过来的
            if (!lesson) {
                let id = props.match.params.id;
                let result: LessonResult = await getLesson<LessonResult>(id);
                if(result.success)lesson = result.data;
            }
            setLesson(lesson);
        })();
    }, []);
    const addCartItem = (lesson:Lesson)=>{
        let video:HTMLVideoElement  = document.querySelector('#lesson-video');
        let cart:HTMLSpanElement = document.querySelector('.anticon.anticon-shopping-cart');
        let cloneVideo:HTMLVideoElement = video.cloneNode(true) as HTMLVideoElement;
        let videoWidth = video.offsetWidth;
        let videoHeight = video.offsetHeight;
        let cartWidth = cart.offsetWidth;
        let cartHeight = cart.offsetHeight;
        let videoLeft = video.getBoundingClientRect().left;
        let videoTop = video.getBoundingClientRect().top;
        let cartRight = cart.getBoundingClientRect().right;
        let cartBottom = cart.getBoundingClientRect().bottom;
        cloneVideo.style.cssText = `
            z-index:1000;
            opacity:0.8;
            position:fixed;
            width:${videoWidth}px;
            height:${videoHeight}px;
            top:${videoTop}px;
            left:${videoLeft}px;
            transition: all 2s ease-in-out;
        `;
        document.body.appendChild(cloneVideo);
        setTimeout(()=>{
            cloneVideo.style.left = (cartRight - (cartWidth/2))+'px';
            cloneVideo.style.top = (cartBottom - (cartHeight/2))+'px';
            cloneVideo.style.width='0px';
            cloneVideo.style.height='0px';
            cloneVideo.style.opacity= '0.1';
        });
        props.addCartItem(lesson);
    }
    return (
        <>
            <NavHeader history={props.history}>课程详情</NavHeader>
            <Card
                hoverable
                style={{ width: '100%' }}
                cover={<video src={lesson.video} id="lesson-video" controls autoPlay={false}></video>}
            >
                <Card.Meta title={lesson.title}
                  description={
                      <>
                        <p>价格{lesson.price}</p>
                        <p>
                            <Button  onClick={()=>addCartItem(lesson)}>加入购物车</Button>
                        </p>
                      </>
                  }
                ></Card.Meta>
            </Card>
        </>
    )
}


export default connect(
    (state)=>state,
    actions
)(Detail);