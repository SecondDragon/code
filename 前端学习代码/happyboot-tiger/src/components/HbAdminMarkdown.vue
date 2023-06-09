<script setup>
import 'bytemd/dist/index.css'
import 'highlight.js/styles/atom-one-light.css'
import 'github-markdown-css' // placed after highlight styles to override `code` padding
import 'katex/dist/katex.css'
import { Editor, Viewer } from '@bytemd/vue-next'
import zh_Hans from 'bytemd/locales/zh_Hans.json'
import gfm from '@bytemd/plugin-gfm'
import gfmLang from '@bytemd/plugin-gfm/locales/zh_Hans.json'
import breaks from '@bytemd/plugin-breaks'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import highlight from '@bytemd/plugin-highlight'
import math from '@bytemd/plugin-math'
import mathLang from '@bytemd/plugin-math/locales/zh_Hans.json'
import mediumzoom from '@bytemd/plugin-medium-zoom'
import mermaid from '@bytemd/plugin-mermaid'
import mermaidLang from '@bytemd/plugin-mermaid/locales/zh_Hans.json'

import { onBeforeMount, onMounted, ref, watch } from 'vue'

const plugins = [
  gfm({
    locale: gfmLang
  }),
  breaks(),
  frontmatter(),
  gemoji(),
  highlight(),
  mediumzoom({

  }),
  mermaid({
    locale: mermaidLang
  }),
  math({
    locale: mathLang
  })
  // Add more plugins here
]

const text = ref('')

const props = defineProps({
  value: {
    type   : String,
    default: () => ''
  },
  placeholder: {
    type   : String,
    default: () => '请输入内容'
  }
})

const emit = defineEmits([ 'update:value' ])

function handleChange (v) {
  text.value = v
  emit('update:value', v)
}

watch(() => props.value, () => {
  text.value = props.value
})

const dom = ref(null)
const editor = ref(null)

function addAttrListener () {
  const target = editor.value.el.children[0]
  // 实例化MutationObserver
  const attrListener = new MutationObserver((mutations) => {
    const fullscreen = mutations[0].target.classList.contains('bytemd-fullscreen')
    if (fullscreen) {
      document.getElementById('pop-body').append(editor.value.el)
    } else {
      if (editor.value) {
        dom.value.append(editor.value.el)
      }
    }
  })
  // 监听dom的属性
  attrListener.observe(target, { attributes: true })
  return attrListener.disconnect
}

let cancel
onMounted(() => {
  text.value = props.value
  cancel = addAttrListener()
})

onBeforeMount(() => {
  cancel && cancel()
})
</script>

<template>
  <div
    ref="dom"
    class="hb-admin-markdown"
  >
    <Editor
      ref="editor"
      style="height: 100%"
      :locale="zh_Hans"
      :value="text"
      :plugins="plugins"
      :placeholder="placeholder"
      @change="handleChange"
    />
  </div>
</template>

<style>

.hb-admin-markdown{
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.bytemd {
  height: 100% !important;
  z-index: 1;
}
</style>
