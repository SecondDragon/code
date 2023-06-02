<template>
    <form @click.prevent>
        <slot></slot>
    </form>
</template>

<script>
export default {
    name:'elForm',
    provide(){
        return {elForm:this}
    },
    props:{
        model:{
            type:Object,
            default:()=>({}) // 保证当前对象唯一
        },
        rules:{
            type:Object
        }
    },
    methods:{
        validate(cb){
            let r = this.$broadcast('elFormItem').every(item=>item.validate());
            cb(r)
        }
    },
    // validate(){
    //     // 获取所有的formItem, 调用validate方法 来看下是否都是true

    //     this.$broadcast();
    // },
    mounted(){
        // console.log(this.$broadcast)
       
     
    }
}
</script>