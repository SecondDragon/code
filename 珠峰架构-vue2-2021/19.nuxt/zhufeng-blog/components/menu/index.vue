
<template>
    <el-menu router>
        <template v-for="(m,index) in menu">
            <el-menu-item v-if="!m.children" :key="index" :index="m.path">{{ m.name }}</el-menu-item>
            <el-submenu v-else :key="index" :index="m.path">
                <template slot="title">{{ m.name }}</template>
                <el-menu-item
                    v-for=" item in m.children"
                    :key="item.name"
                    :index="item.path"
                >{{ item.name }}</el-menu-item>
            </el-submenu>
        </template>
    </el-menu>
</template>


<script >
import menu from './menu.js'
export default {
    data() {
        return { menu }
    }
}

</script>
