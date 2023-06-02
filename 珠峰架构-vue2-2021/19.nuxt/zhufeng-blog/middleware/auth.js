export default function({store,redirect,route}){
     // 跳转到登陆页面
    
     // 每次 刷新页面 -》 会将数据放到vuex中
     let username = store.state.user.username;
     if(route.path.startsWith('/admin')){
         if (!username){
            redirect('/login')
         }
     }else{
         if(/login/.test(route.path)){
             if(username){
                 redirect('/admin')
             }
         }
     }
}