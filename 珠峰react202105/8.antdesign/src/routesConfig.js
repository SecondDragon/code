import IndexPage from "./routes/IndexPage";
import Home from "./routes/Home";
import User from "./routes/User";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import Register from "./routes/Register";
import NotFound from "./components/NotFound";
//配置式路由
export default [
    {
        path:'/',
        component:IndexPage,
        routes:[
            {
                path:'/home',
                redirect:true,
                component:Home
            },
            {
                path:'/user',
                component:User
            },
            {
                path:'/profile',
                component:Profile,
                routes:[
                    {path:'/profile/a',component:Login},
                    {path:'/profile/b',component:Register}
                ]
            },
            {
                path:'/login',
                component:Login
            },
            {
                path:'/register',
                component:Register
            },
            {
                component:NotFound
            }
        ]
    }
]

//typescript+antdesign+express 移动端项目 我来讲
//训练营的项目 需要你们自己写了，实现网易云音乐