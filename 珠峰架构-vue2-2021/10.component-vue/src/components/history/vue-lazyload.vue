<template>
    <div class="box">
        <!-- 看你是否要操作dom，仅仅是展示 不是操作dom -->
        <li v-for="(l,index) in list" :key="index">
            <img v-lazy="l">
        </li>
    </div>  
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueLazyLoad from './vue-lazyload.js'
import logo from '@/assets/logo.png'
Vue.use(VueLazyLoad,{
    loading:logo,
    preload:1.2 // 在我们屏幕中1.2 的位置的图片先加载，其他的等待加载
})
export default {    // ajax 是异步的 
    //created(){ // 服务端渲染支持created 所以希望大家把请求写在这里保持和服务端一致
    //},
    data(){
        return {list:[]}
    },
    async mounted(){
        let {data:imgs} = await axios.get('http://localhost:4000/api/list');
        this.list = imgs;
    }
}
</script>

<style >
.box{
    width:400px;
    height:400px;
    overflow: scroll;
}
img{
    width:100px;
    height:150px;
}
</style>