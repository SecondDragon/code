<script setup>
import { NAvatar, NSpace, NBadge, NLayout, NLayoutHeader } from 'naive-ui'
import { isMenuCollapsed } from '@/global/config'
import { computed } from 'vue'
const enterActiveClass = computed(() => {
  return !isMenuCollapsed.value ? 'animate__animated animate__slideInRight animate__faster' : 'animate__animated animate__slideInLeft animate__faster'
})
</script>
<template>
  <div class="hb-admin-online-user-list-com">
    <n-layout>
      <n-layout-header
        v-for="e in 20"
        :key="e"
        bordered
      >
        <transition
          :enter-active-class="enterActiveClass"
          leave-from-class="leave"
        >
          <div
            v-if="isMenuCollapsed"
            class="user-item"
          >
            <n-avatar
              size="large"
              round
              src="https://oss.injs.jsxww.cn/net-disk-smh/09505891f7a34e82b64a5922ecf5a7e0.gif?x-oss-process=image/resize,w_100/quality,q_95"
            />
          </div>
          <div
            v-else
            class="user-item"
          >
            <n-avatar
              size="large"
              round
              src="https://oss.injs.jsxww.cn/net-disk-smh/09505891f7a34e82b64a5922ecf5a7e0.gif?x-oss-process=image/resize,w_100/quality,q_95"
            />
            <span
              v-if="!isMenuCollapsed"
              class="nickname"
            >人员1</span>
            <span
              v-if="!isMenuCollapsed"
              style="flex: 1;"
            />
            <n-space
              v-if="!isMenuCollapsed"
              align="center"
              justify="end"
            >
              <n-badge
                type="error"
                :value="20"
              />
            </n-space>
          </div>
        </transition>
      </n-layout-header>
    </n-layout>
  </div>
</template>

<style scoped>
.hb-admin-online-user-list-com{
  position: absolute;
  left: 0;
  top: 60px;
  right: 0;
  bottom: 60px;
  overflow: auto;
  z-index: 1;
}

.hb-admin-online-user-list-com::-webkit-scrollbar{
  display: none;
}

.user-item{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 0 10px;
  box-sizing: border-box;
}

.nickname{
  font-weight: bold;
  margin-left: 10px;
  color: var(--n-text-color);
  transition: color .3s var(--n-bezier);
}

.leave{
  opacity: 0;
  position: absolute;
}
</style>
