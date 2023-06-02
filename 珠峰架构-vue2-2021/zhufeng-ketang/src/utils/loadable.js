import LoadingComponent from '@/components/loading.vue'
const loadable = (asyncFunc) => {
    let component = () => ({ // 最终切换的时候 会采用这个组件
        component: asyncFunc(),
        loading: LoadingComponent, // 只是为了增加loading效果
    })
    return { // loadable 执行完毕后 返回一个组件
        render(h) { // createElement(App)
            return h(component)
        }
    }
}
// 路由切换 异步加载的loading
export default loadable;