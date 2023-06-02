<template>
    <el-menu-item :key="data.title" v-if="!data.children">{{ data.title }}</el-menu-item>
    <el-submenu v-else>
        <template #title>{{ data.title }}</template>
        <template v-for="d in data.children">
            <resub :data="d" :key="d.title"></resub>
        </template>
    </el-submenu>
</template>

<script>
import ElMenu from './el-menu';
import ElMenuItem from './el-menu-item';
import ElSubmenu from './el-submenu'
import resub from './resub.vue';
export default {
    name: 'resub',
    props: {
        data: {}
    },
    components: {
        ElMenu,
        ElMenuItem,
        ElSubmenu
    }
}
</script>