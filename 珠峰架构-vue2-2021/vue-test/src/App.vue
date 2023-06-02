<template>
  <div id="app">
    <!-- 写一个功能 根据不同的 属性生成不同的h标签 -->
    <level type="1">
      <span slot="default">ok</span>
    </level>
    <level type="2">ok</level>
----------------------------
    <my-menu :data="tree"></my-menu>
  </div>
</template>
<script>

import level from './components/level.js'
import MyMenu from './components/my-menu.jsx'
export default {
  components: {
    level,
    MyMenu
  },
  data() {
    return {
      tree: [
        {
          title: '菜单1',
          children: [
            {
              title: '菜单1-1'
            }]
        },
        {
          title: '菜单2',
          children: [
            {
              title: '菜单1-1',
              children: [
                {
                  title: '菜单1-1-1',
                }
              ]
            }]
        },
        {
          title: '菜单3',
        }
      ]
    }
  }
}
</script>