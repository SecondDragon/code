export default {
    functional:true,

    render(h,{parent,data}){ // current = {matched:[]}  .$route  // data里面我可以增加点标识

    // 内部current变成了响应式的
    // 真正用的是$route   this.$route = current;  current = xxx
    
        let route = parent.$route; // 获取current对象
        // 依次的将matched 的结果赋予给每个router-view
        // 父 *  父 * -> 父 * -> 子 *
        let depth = 0;
        while (parent) { // 1.得是组件  <router-view></router-view>  <app></app>
            if(parent.$vnode && parent.$vnode.data.routerView ){
                depth++;
            }
            parent = parent.$parent; // 不停的找父亲
        }
        // 两个router-view  [ /about  /about/a]   /about/a
        let record = route.matched[depth]; // 默认肯定先渲染第一层
        if(!record){
            return h() // 空
        }
        // 渲染匹配到的组件，这里一直渲染的是第一个
        data.routerView = true;
        return h(record.component, data); // <router-view routeView=true></router-view>
    }
}