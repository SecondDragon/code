<template>
    <el-container>
        <el-header>
            <div><img src="@/assets/logo.png" alt="" style="width:100px">
                {{$store.state.user.username}}
            
            </div>
        </el-header>
        <el-container>
            <el-aside>
                <Menu></Menu>
            </el-aside>
            <el-main>
                <nuxt></nuxt>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Menu from '@/components/menu/index.vue'
export default ({
    components: {
        Menu
    }
})
</script>