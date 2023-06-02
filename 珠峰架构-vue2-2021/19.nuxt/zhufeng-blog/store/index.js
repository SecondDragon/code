export const actions = {
    nuxtServerInit(store,{$axios,app}){ // @nuxtjs/axios  同步数据到vuex中

       let userInfo = app.$cookies.get('user');
       // 设置cookie 每次访问服务器都会携带cookie ，但是localStorage不行

        // 用token校验是否ok
       //  $axios('/api/valdiate',userInfo) ; // 通过接口校验当前token是否正常

        if(userInfo){
            if(true){ // 如果7001校验通过 ，存储数据
                store.commit('user/set_user',userInfo); // nuxt服务会请求我的服务器 校验token的正确性，如果正确，会将最新的用户信息 放到vuex中
            }else{
                app.$cookies.remove('user');// token被修改过了
            }
        }


       //  console.log($axios); // 给自己的服务端发请求
    }
}