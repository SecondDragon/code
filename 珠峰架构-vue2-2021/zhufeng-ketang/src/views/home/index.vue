<template>
    <div>
        <!-- vue3.0 async 去掉了 -->
        <HomeHeader v-model="currentCategory"></HomeHeader>
        <!-- 列表需要用到筛选条件 value -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(s,index) in slides" :key="index">
                <img :src="s.url" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
import HomeHeader from './home-header.vue'
import { createNamespacedHelpers } from 'vuex'
import * as Types from '@/store/action-types'
// 这里拿到的都是home 模块下的
let { mapState: mapState, mapMutations, mapActions } = createNamespacedHelpers('home');

export default {
    methods: {
        ...mapMutations([Types.SET_CATEGORY]),
        ...mapActions([Types.SET_SLIDES])
    },
    async mounted() {
        // 一面一加载就开始获取数据
        if (this.slides.length == 0) { // 如果vuex中有数据，直接拿来用
            try {
                await this[Types.SET_SLIDES]();
            } catch (e) { 
                console.log(e); // 错误处理 、 或者异常处理
            }
        }
    },
    computed: {
        ...mapState(['category', 'slides']), // 获取vuex中的状态绑定到当前的实例
        currentCategory: {
            get() { // 取值走他
                return this.category
            },
            set(value) { // 修改状态走这里 ， 默认会调用mutation更改状态
                this[Types.SET_CATEGORY](value)
            }
        }
    },
    data() {
        // 全部课程 -1  node课程 0 react课程 1 vue课程2
        return {
            value: -1
        }
    },
    components: {
        HomeHeader
    }
}
</script>
<style lang="scss">
.my-swipe {
    height: 120px;
    img {
        width: 100%;
        height: 100%;
    }
}
</style>