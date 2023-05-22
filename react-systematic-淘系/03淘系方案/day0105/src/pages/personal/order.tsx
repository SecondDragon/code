import { useNavigate, Navigate, history } from "umi";

const OrderPage = () => {
    /* 
     v6版本:
     navigate('/xxx')
     navigate(-1)
     navigate(1)
     navigate('/xxx',{replace:true,state:{...}})
     navigate({
        pathname:'/xxx',
        search:'xxx=xxx&xxx=xxx'
     })
     ---
     页面中只要遇到<Navigate/>组件，就可以实现跳转!!
     */
    const navigate = useNavigate();
    const handle = () => {
        /* navigate({
            pathname: '/personal/profile',
            search: 'lx=0&name=zhufeng'
        }); */
        /* // history:go/goBack/goFoward/push/replace
        history.push({
            pathname: '/personal/profile',
            // search: 'lx=0&name=zhufeng',
            // 在我们开启了historyWithQuery配置项之后，就可以使用query对象进行传递了「但是不适合于navigate这种方式」
            query: {
                lx: 0,
                name: 'zhufeng'
            }
        }); */

        /*
        // v6的隐式传参：即便目标组件刷新，传递的信息还在「纯正的v5版本中，目标组件一刷新，则隐式传递的信息消失了」
        navigate('/personal/profile', {
            state: {
                lx: 0,
                name: 'zhufeng'
            }
        }); 
        */

        // 我们获取的history对象和纯正v5中的history对象是有区别的，主要在于隐式传参这个方面！！ -> 向v6中的navigate看齐的！！
        /* history.push('/personal/profile', {
            lx: 0,
            name: 'zhufeng'
        }); */
    };

    return (
        <div>
            我的订单
            <button onClick={handle}>按钮</button>
        </div>
    );
};
export default OrderPage;