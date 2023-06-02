import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 生成的项目是runtime-only 没有withCompiler

// compiler


// 告诉组件触发自己身上的哪个方法
Vue.prototype.$dispatch = function(componentName, name) {
    let parent = this.$parent; // 父组件 不能是原生dom
    while (parent) {
        if (componentName == parent.$options.name) {
            break;
        } else {
            parent = parent.$parent;
        }
    }
    if (parent && name) {
        parent.$emit(name)
    }
    return parent;
};

Vue.prototype.$broadcast = function(componentName, name) {
    let children = this.$children; // 子组件
    let arr = [];
    function find(children) {
        children.forEach(child => {
            if (child.$options.name == componentName) {
                arr.push(child);
                if(name){
                  child.$emit(name)
                }
            }
            if (child.$children) {
                find(child.$children);
            }
        })
    }
    find(children);
    return arr
}




new Vue({
  render: h => h(App),
  // components:{
  //   App
  // },
  // template:`<App></App>`
}).$mount('#app')
