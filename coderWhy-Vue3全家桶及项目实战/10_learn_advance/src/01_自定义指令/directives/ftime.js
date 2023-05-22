import dayjs from 'dayjs'

export default function directiveFtime(app) {
  app.directive("ftime", {
    mounted(el, bindings) {
      // 1.获取时间, 并且转化成毫秒
      let timestamp = el.textContent
      if (timestamp.length === 10) {
        timestamp = timestamp * 1000
      }

      timestamp = Number(timestamp)

      // 2.获取传入的参数
      let value = bindings.value
      if (!value) {
        value = "YYYY-MM-DD HH:mm:ss"
      }

      // 3.对时间进行格式化
      const formatTime = dayjs(timestamp).format(value)
      el.textContent = formatTime
    }
  })
}