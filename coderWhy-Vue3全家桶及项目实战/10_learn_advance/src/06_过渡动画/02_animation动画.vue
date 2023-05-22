<template>
  <div class="app">
    <div>
      <button @click="isShow = !isShow">切换</button>
    </div>

    <transition name="why">
      <h2 v-if="isShow">
        要是有些事我没说，地坛，你别以为是我忘了，我什么也没忘，但是有些事只适合收藏。不能说，也不能想，却又不能忘。它们不能变成语言，它们无法变成语言，一旦变成语言就不再是它们了。它们是一片朦胧的温馨与寂寥，是一片成熟的希望与绝望，它们的领地只有两处：心与坟墓。比如说邮票，有些是用于寄信的，有些仅仅是为了收藏。
      </h2>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isShow = ref(false)

</script>

<style scoped>

h2 {
  display: inline-block;
}


.why-enter-active {
  animation: whyAnim 2s ease;
}


.why-leave-active {
  /* animation: whyLeaveAnim 2s ease; */
  animation: whyAnim 2s ease reverse;
}


@keyframes whyAnim {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  50% {
    transform: scale(1.2);
    opacity: 0.5;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes whyLeaveAnim {
  0% {
    transform: translateX(0);
    opacity: 1;
  }

  100% {
    transform: translateX(-500px);
    opacity: 0;
  }
}

</style>
