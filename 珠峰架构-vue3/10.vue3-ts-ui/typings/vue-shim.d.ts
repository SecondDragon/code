declare module '*.vue' {
    import {defineComponent} from 'vue';
    const component: ReturnType<typeof defineComponent> & {install(app:App):void};
    export default component
}

// 定义所有以.vue文件结尾的类型