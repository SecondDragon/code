// 1.默认的导出:
// // 1.1. 定义函数
// function parseLyric() {
//   return ["歌词"]
// }

// const name = "aaaa"

// // export {
// //   parseLyric,
// //   name
// // }

// 1.2.默认导出
// export default parseLyric


// 2.定义标识符直接作为默认导出
export default function() {
  return ["新歌词"]
}

// export default function() {
//   return ["歌词"]
// }

// 注意事项: 一个模块只能有一个默认导出

