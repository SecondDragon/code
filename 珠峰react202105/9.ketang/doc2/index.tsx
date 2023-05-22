import React, { PropsWithChildren, useEffect } from 'react';
import './index.less';
import { Card, Skeleton, Button, Alert, Menu } from 'antd';
import { Link } from 'react-router-dom';
import Lesson from '@/typings/lesson';
import { MenuOutlined } from '@ant-design/icons';
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
    return (
        <section className="lesson-list">
            <h2><MenuOutlined />全部课程</h2>
            <Skeleton
                loading={props.lessons.list.length === 0 && props.lessons.loading}
                active
                paragraph={{ rows: 8 }}
            >
                {
                    props.lessons.list.map((lesson: Lesson, index: number) => (
                        <Link key={lesson.id} to={{ pathname: `/detail/${lesson.id}`, state: lesson }}>
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
            </Skeleton>

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