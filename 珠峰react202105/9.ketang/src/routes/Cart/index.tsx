import NavHeader from '@/components/NavHeader';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom'
import { StaticContext } from 'react-router';
import { Card ,Button} from 'antd';
import { Lesson,LessonResult } from '@/typings/lesson';
import {connect} from 'react-redux';
import { CombinedState } from '@/store/reducers';
interface Params {
}
type stateProps = ReturnType<typeof mapStateToProps>
type Props = PropsWithChildren<RouteComponentProps<Params, StaticContext, Lesson>&stateProps>;

function Cart(props: Props) {
   
    return (
        <>
            <NavHeader history={props.history}>购物车</NavHeader>
             {
                 props.list.map(({lesson,count,checked})=>(
                     <div>
                         <p>{lesson.title}</p>
                         <p>{count}</p>
                     </div>
                 ))
             }
        </>
    )
}

let mapStateToProps = (state:CombinedState)=>({list:state.cart});
export default connect(
    mapStateToProps
)(Cart);