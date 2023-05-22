<template>
  <div style="display: flex; justify-content: space-between">
    <Input id="file" type="file" @change="onChange" style="width: 300px" />
    <div>
      <Button @click="handleUpload" type="primary">点击上传</Button>

      <Button style="margin-left: 20px" @click="handleStopUpload" type="primary"
        >暂停上传</Button
      >
      <Button
        style="margin-left: 20px"
        @click="handleStartUpload"
        type="primary"
        >继续上传</Button
      >
    </div>
  </div>
  <a-progress v-if="hashProgress > 0" :percent="hashProgress" />
  <a-progress v-if="fileChunkData.length > 0" :percent="totalProgress" />
  <a-table :dataSource="dataSource" :columns="columns">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'progress'">
        <a-progress :percent="record.progress"
      /></template>
    </template>
  </a-table>
</template>

<script setup>
import { message, Button, Input } from "ant-design-vue";
import { ref } from "vue";
import axios from "axios";
import { getHash } from "./utils/getHash";

// 切片大小
const SIZE = 10 * 1024 * 1024;
// table配置
const columns = [
  {
    title: "分片名",
    dataIndex: "hash",
    key: "hash",
  },
  {
    title: "进度",
    dataIndex: "progress",
    key: "progress",
  },
];
// 当前选中的源文件
const currentFile = ref();
// 文件切分之后的chunk数组
const fileChunkData = ref([]);
//  table数据源
const dataSource = ref([]);
// 上传完成的文件数量
const uploadFinishedNumber = ref(0);
// 文件上传的总进度
const totalProgress = ref(0);
// 获取文件hash值的进度
const hashProgress = ref(0);
//  当前要取消请求的controller
const currentController = ref();
// 断点续传，文件开始上传的索引
const startIndex = ref(0);

const onChange = (e) => {
  const [file] = e.target.files;
  currentFile.value = file;
};

const getHashProgress = (progress) => {
  hashProgress.value = progress;
};

// 点击上传按钮
const handleUpload = async () => {
  if (!currentFile.value) return;
  // 获取文件hash值
  const hashRes = await getHash(currentFile.value, SIZE, getHashProgress);
  if (hashRes.code) {
    // 校验文件是否上传过
    let res = await axios({
      url: "/api/checkFileIsUploaded",
      method: "get",
      params: {
        hash: hashRes.hash,
      },
    });
    if (res.data.code === 1) {
      message.success("上传成功，该文件已经上传过");
      return;
    } else if (res.data.code === 2) {
      // 文件未上传完整的情况
      const { index } = res.data;
      startIndex.value = index;
      dataSource.value = [];
    }
  } else {
    message.error(hashRes.message);
    return;
  }

  dataSource.value = [];
  // 分片
  const fileChunkList = createFileChunk(currentFile.value, SIZE);
  fileChunkData.value = fileChunkList.map((fileChunk, index) => {
    const { file } = fileChunk;
    return {
      chunk: file,
      hash: hashRes.hash + "-" + index,
    };
  });
  // 分片上传
  uploadChunk(
    fileChunkData.value,
    hashRes.hash,
    currentFile.value.name,
    startIndex.value
  );
};

// 文件分片
const createFileChunk = (file, size) => {
  const fileChunkList = [];
  let current = 0;
  while (current < file.size) {
    fileChunkList.push({ file: file.slice(current, current + size) });
    current += size;
  }
  return fileChunkList;
};

// 上传文件
const uploadChunk = async (fileChunkList, hash, filename, startIndex = 0) => {
  let flag = true;
  for (let i = startIndex; i < fileChunkList.length; i++) {
    let { chunk, hash } = fileChunkList[i];
    // 发起请求
    flag = await uploadChunkRequest(chunk, hash, i);
  }
  if (flag) {
    // 全部分片上传完成，发送请求告诉服务器合并
    mergeChunk(hash, filename);
  }
};

// 上传文件请求
const uploadChunkRequest = async (chunk, hash, i) => {
  // 用formData上床文件
  const formData = new FormData();
  formData.append("chunk", chunk);
  formData.append("hash", hash);
  formData.append("filename", currentFile.value.name);
  dataSource.value.push({ hash: hash, progress: 0, key: i, finished: false });
  // 创建取消请求的controller
  const controller = new AbortController();
  currentController.value = {
    controller,
    hash,
  };
  let res = await axios.post("/api/upload", formData, {
    onUploadProgress: function (progressEvent) {
      // 处理原生进度事件
      const progressIndex = dataSource.value.length
        ? dataSource.value.length - 1
        : 0;
      let progress = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
      dataSource.value[progressIndex].progress = progress;
      totalProgress.value =
        ((uploadFinishedNumber.value +
          progressEvent.loaded / progressEvent.total) /
          (fileChunkData.value.length - startIndex.value)) *
          100 || 0;

      if (progress === 100) {
        dataSource.value[progressIndex].finished = true;
        uploadFinishedNumber.value += 1;
      }
    },
    signal: controller.signal,
  });
  if (res.data.code === 0) {
    message.error(`${res.data.hash} 上传失败`);
    return false;
  }
  return true;
};

// 合并chunk
const mergeChunk = async (hash, filename) => {
  const res = await axios.post("/api/merge", {
    hash,
    filename,
  });
  if (res.data.code === 1) {
    message.success(res.data.message);
  } else {
    message.error(res.data.message);
  }
};

// 暂停上传
const handleStopUpload = () => {
  // 取消当前分片请求
  currentController.value.controller?.abort();
};

// 断点续传
const handleStartUpload = async () => {
  const { hash } = currentController.value;
  if (!hash) {
    handleUpload();
    return;
  }
  const [fileHash, index] = hash.split("-");
  let flag = true;
  dataSource.value.pop();
  for (let i = index; i < fileChunkData.value.length; i++) {
    let { chunk, hash } = fileChunkData.value[i];
    flag = await uploadChunkRequest(chunk, hash, i);
  }

  if (flag) {
    mergeChunk(fileHash, currentFile.value.name);
  }
};
</script>

<style scoped></style>
