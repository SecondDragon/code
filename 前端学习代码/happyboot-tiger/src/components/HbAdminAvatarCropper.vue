<script setup>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { ref } from 'vue'
import { NButtonGroup, NButton, NIcon, useMessage } from 'naive-ui'
import { MoveSharp, Add, Remove, Crop, ArrowRedoOutline, ArrowUndoOutline, CloudUploadOutline } from '@vicons/ionicons5'
const accept = 'image/jpg,image/jpeg,image/png'
const headImg = ref(null)
const imageFile = ref(null)
const preview1 = ref(null)
const preview2 = ref(null)
const preview3 = ref(null)

let cropper = null
const isInit = ref(false)

function selectImg (event) {
  const img = event.target.files[0]
  if (!accept.toLocaleLowerCase().includes(img.type.toLocaleLowerCase())) {
    message.error('文件类型不支持')
    return
  }
  initCropper()
  cropper.replace(URL.createObjectURL(img))
  imageFile.value.value = ''
}

function initCropper () {
  cropper?.destroy()
  isInit.value = true
  cropper = new Cropper(headImg.value, {
    guides     : true,
    // strict: false,
    preview    : [ preview1.value, preview2.value, preview3.value ],
    aspectRatio: 1,
    crop (event) {
    }
  })
}

function chooseFile () {
  setTimeout(() => {
    imageFile.value.click()
  }, 400)
}

const dropHover = ref(false)
function onDragHover (e) {
  e.preventDefault()
  dropHover.value = true
}

function onDragLeave (e) {
  e.preventDefault()
  dropHover.value = false
}

const message = useMessage()
function onDrop (e) {
  e.preventDefault()
  dropHover.value = false
  const img = e.dataTransfer.files[0]
  if (!img || !img.type || !accept.toLocaleLowerCase().includes(img.type.toLocaleLowerCase())) {
    message.error('文件类型不支持')
    return
  }
  initCropper()
  cropper.replace(URL.createObjectURL(img))
}

function getCroppedData () {
  if (!isInit.value) {
    return null
  }
  const can = cropper.getCroppedCanvas()
  if (!can) {
    return null
  }
  return can.toDataURL()
}

function zoom (d) {
  if (d === '+') {
    cropper.zoom(0.1)
  }
  if (d === '-') {
    cropper.zoom(-0.1)
  }
}

function rotate (d) {
  if (d === '+') {
    cropper.rotate(45)
  }
  if (d === '-') {
    cropper.rotate(-45)
  }
}

function setDragMode (type) {
  cropper.setDragMode(type)
}

defineExpose({
  getCroppedData
})

</script>
<template>
  <div
    class="hb-admin-avatar-com"
    @drop="onDrop"
    @dragover="onDragHover"
    @dragleave="onDragLeave"
  >
    <div
      v-if="dropHover"
      class="hb-admin-avatar-upload-drop-hover"
    >
      <n-button
        type="primary"
        text
      >
        <n-icon
          :component="CloudUploadOutline"
          size="80"
        />
      </n-button>
    </div>
    <div class="hb-admin-avatar-tools">
      <n-button-group vertical>
        <n-button
          :disabled="!isInit"
          @click="zoom('+')"
        >
          <template #icon>
            <n-icon :component="Add" />
          </template>
        </n-button>
        <n-button
          :disabled="!isInit"
          @click="zoom('-')"
        >
          <template #icon>
            <n-icon :component="Remove" />
          </template>
        </n-button>
        <n-button
          :disabled="!isInit"
          @click="setDragMode('move')"
        >
          <template #icon>
            <n-icon :component="MoveSharp" />
          </template>
        </n-button>
        <n-button
          :disabled="!isInit"
          @click="setDragMode('crop')"
        >
          <template #icon>
            <n-icon :component="Crop" />
          </template>
        </n-button>
        <n-button
          :disabled="!isInit"
          @click="rotate('-')"
        >
          <template #icon>
            <n-icon :component="ArrowUndoOutline" />
          </template>
        </n-button>
        <n-button
          :disabled="!isInit"
          @click="rotate('+')"
        >
          <template #icon>
            <n-icon :component="ArrowRedoOutline" />
          </template>
        </n-button>
        <n-button @click="chooseFile">
          <template #icon>
            <n-icon :component="CloudUploadOutline" />
          </template>
        </n-button>
      </n-button-group>
    </div>
    <div class="hb-admin-avatar-cropper">
      <input
        ref="imageFile"
        type="file"
        style="display:none"
        :accept="accept"
        @change="selectImg"
      >
      <div
        v-if="!isInit"
        class="hb-admin-avatar-upload"
        @click="chooseFile"
      >
        <n-button
          type="primary"
          text
        >
          <n-icon
            :component="CloudUploadOutline"
            size="80"
          />
        </n-button>
      </div>
      <img
        ref="headImg"
        class="headImage"
      >
    </div>
    <div class="hb-admin-avatar-preview">
      <div
        ref="preview1"
        class="avatar-preview32"
      />
      <div
        ref="preview2"
        class="avatar-preview48"
      />
      <div
        ref="preview3"
        class="avatar-preview64"
      />
    </div>
  </div>
</template>

<style scoped>
.hb-admin-avatar-com{
  width: 100%;
  height: 360px;
  display: flex;
  padding: 5px;
  box-sizing: border-box;
  position: relative;
}

.hb-admin-avatar-tools{
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.hb-admin-avatar-cropper{
  flex: 1;
  position: relative;
  overflow: hidden;
  border-radius: 3px;
}

.hb-admin-avatar-upload{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  background-color: rgba(128, 128, 128, 0.1);
}

.hb-admin-avatar-upload-drop-hover{
  background-color: rgba(128, 128, 128, 0.8);
  position: absolute;
  left: 0;
  top:0;
  right: 0;
  bottom: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.hb-admin-avatar-preview{
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 40px 0;
  box-sizing: border-box;
  margin-left: 20px;
}

.headImage{
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  right: 0;
  bottom: 0;
  border:none;
}

.avatar-preview32{
  width: 32px;
  height: 32px;
  overflow: hidden;
  border-radius: 50%;
  background: rgba(128, 128, 128, 0.1);
}

.avatar-preview48{
  width: 64px;
  height: 64px;
  overflow: hidden;
  border-radius: 50%;
  background: rgba(128, 128, 128, 0.1);
}

.avatar-preview64{
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 50%;
  background: rgba(128, 128, 128, 0.1);
}

</style>
