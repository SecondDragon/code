import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'


// compiler 可以直接用render函数 但是不能用template  (.vue文件中写的template 靠的是vue-loader来处理的)


// 静态方法的
initGlobalAPI(Vue) // 初始化Vue的全局api  webpack



export default Vue
