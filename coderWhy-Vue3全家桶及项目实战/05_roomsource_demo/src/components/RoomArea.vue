<template>
  <div class="room-area">
    <!-- 1.区域header -->
    <area-header :title="areaData.title" :subtitle="areaData.subtitle"/>

    <!-- 2.房间列表 -->
    <div class="room-list">
      <template v-for="item in areaData.list" :key="item.id">
        <room-item :item-data="item"/>
      </template>
    </div>
  </div>
</template>

<script setup>
import AreaHeader from './AreaHeader.vue'
import RoomItem from './RoomItem.vue'

defineProps({
  areaData: {
    type: Object,
    default: () => ({})
  }
})

</script>

<style lang="less" scoped>
  .room-list {
    display: flex;
    flex-wrap: wrap;
    margin: 20px -8px;
  }
</style>

