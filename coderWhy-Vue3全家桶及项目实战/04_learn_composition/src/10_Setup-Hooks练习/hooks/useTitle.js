import { ref, watch } from "vue";

export default function useTitle(titleValue) {
  // document.title = title

  // 定义ref的引入数据
  const title = ref(titleValue)

  // 监听title的改变
  watch(title, (newValue) => {
    document.title = newValue
  }, {
    immediate: true
  })

  // 返回ref值
  return {
    title
  }
}

