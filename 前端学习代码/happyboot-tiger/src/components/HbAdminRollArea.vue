<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  speed: {
    type   : Number,
    default: 1000
  },
  direction: {
    type   : String,
    default: 'up'
  }
})

const box = ref(null)
const refRoll1 = ref(null)
const refRoll2 = ref(null)
let top = 0
let height = 0
let shadowHeight = 0
const sp = props.speed / 1000
let end = false
let isMouseHover = false

function refresh () {
  height = refRoll1.value.clientHeight
  shadowHeight = refRoll2.value.clientHeight

  if (shadowHeight !== height) {
    refRoll2.value.innerHTML = refRoll1.value.innerHTML
  }
  if (top < 0) {
    if (Math.abs(top) >= height) {
      const tmp = refRoll1.value
      refRoll1.value = refRoll2.value
      refRoll2.value = tmp
      top = 0
    }
    refRoll1.value.style.transform = `translate3d(0,${top}px,0)`
    refRoll2.value.style.transform = `translate3d(0,${height + top}px,0)`
  } else {
    if (Math.abs(top) >= height) {
      const tmp = refRoll1.value
      refRoll1.value = refRoll2.value
      refRoll2.value = tmp
      top = -height
    }
    refRoll1.value.style.transform = `translate3d(0,${top}px,0)`
    refRoll2.value.style.transform = `translate3d(0,${top - height}px,0)`
  }
}

function doAnimationFrame () {
  requestAnimationFrame(() => {
    if (end) {
      return
    }

    if (isMouseHover) {
      refresh()
      doAnimationFrame()
      return
    }

    if (height > box.value.clientHeight) {
      if (props.direction === 'down') {
        top += sp
      }
      if (props.direction === 'up') {
        top -= sp
      }
    } else {
      top = 0
    }
    refresh()
    doAnimationFrame()
  })
}

function onMouseEnter () {
  isMouseHover = true
}

function onMouseLeaver () {
  isMouseHover = false
}

onMounted(doAnimationFrame)

onBeforeUnmount(() => {
  end = true
})

</script>
<template>
  <div
    ref="box"
    class="hb-admin-roll-list-com"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeaver"
  >
    <div
      ref="refRoll1"
      class="roll-item"
    >
      <div class="list-item">
        <slot />
      </div>
    </div>
    <div
      ref="refRoll2"
      class="roll-item"
    />
  </div>
</template>
<style scoped>
.hb-admin-roll-list-com{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.hb-admin-roll-list-com::-webkit-scrollbar{
  display: none;
}

.roll-item{
  width: 100%;
  position: absolute;
}

.list-item{
}
</style>
