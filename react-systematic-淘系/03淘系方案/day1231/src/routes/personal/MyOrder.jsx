import React from "react";
import { Button } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
/*
 routerRedux 是 react-router-redux 中提供的对象，此对象中包含了路由跳转的方法
   + go/goBack/goFoward
   + push/replace
 相比较于props.history对象来讲，routerRedux不仅可以在组件中实现路由跳转，而且可以在redux操作中实现路由的跳转！！它本身就是redux和router的结合操作！！
   在redux内部
     yield put(routerRedux.push(...))
   在redux外部「或者组件中」
     dispatch(
        routerRedux.push(...)
     )
     一定要基于dispatch进行派发才会跳转；因为执行routerRedux.xxx方法，只会返回一个action对象；
     action->{
        type:"@@router/CALL_HISTORY_METHOD",
        payload:{
            method:'push', 
            args:[...] 
        }
     }
 */
const MyOrder = function MyOrder({ dispatch }) {
    return <div className="myOrderBox">
        我的订单
        <Button type="primary"
            onClick={() => {
                dispatch(
                    routerRedux.push('/personal/profile/100/珠峰培训')
                    /* routerRedux.push({
                        pathname: '/personal/profile',
                        search: '?lx=100&name=珠峰培训'
                    }) */
                    /* routerRedux.push({
                        pathname: '/personal/profile',
                        state: { lx: 100, name: '珠峰培训' }
                    }) */
                )
            }}>
            按钮
        </Button>
    </div>;
};
export default connect()(MyOrder);


/* const MyOrder = function MyOrder(props) {
    /!* 
     const { history } = props;
     history对象中提供了路由跳转的方法
       + go
       + goBack -> go(-1)
       + goFoward -> go(1)
       + push
       + replace
     *!/

    return <div className="myOrderBox">
        我的订单
        <Button type="primary"
            onClick={() => {
                /!* 
                // 路径参数：把传递的信息当做路由地址的一部分，但是需要路由地址基于”:?“设置匹配的规则
                // 路由地址：'/personal/profile/:lx?/:name?',
                history.push(`/personal/profile/0/zhufeng`); 
                *!/

                /!* 
                // 问号传参：传递的信息会存在于地址栏中，即便用户刷新页面，依然可以获取相关传递的信息
                history.push({
                    pathname: '/personal/profile',
                    search: 'lx=0&name=zhufeng'
                }); 
                *!/

                /!* 
                // 隐式传参：基于state把信息传递给目标组件，但是传递的信息没有在地址中存在「不丑+安全」，这样在目标组件页面刷新，传递的信息就消失了！！
                history.push({
                    pathname: '/personal/profile',
                    state: {
                        lx: 0,
                        name: 'zhufeng'
                    }
                });
                *!/
            }}>
            按钮
        </Button>
    </div>;
};
export default MyOrder; 
*/