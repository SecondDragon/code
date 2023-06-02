export let Vue;
function install(_Vue) {
    Vue = _Vue;
    Vue.mixin({
        beforeCreate(){ //this代表的是每个组件实例
            // 获取根组件上的store 将他共享给每个组件
            // 每个组件中都应该有$store
            let options= this.$options;
            if(options.store){
                // 根
                // console.log('根',options.name)
                this.$store = options.store
            }else{
                // 先保证他是一个子组件，并且父亲上有$store
                if(this.$parent && this.$parent.$store){
                    this.$store = this.$parent.$store
                }
            }
        }
    })
} 
// 父  this.$store -》 子 this.$store -》孙子 this.$store
export default install