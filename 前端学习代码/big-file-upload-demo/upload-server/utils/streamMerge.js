const path = require('path')
const fs = require('fs')

// 实现同步merge chunk
function asyncMergeChunk(readStream) {
  return new Promise((resolve, reject) => {
    readStream.on('end', function () {
      // 递归合并分片
      resolve({ code: 1, message: '合并成功' })
    })

    readStream.on('error', function (error) {
      // 监听错误事件，关闭可写流，防止内存泄漏
      console.log('currentReadStream error : ', error)
      fileWriteStream.close()
      resolve({ message: '合并出错了', code: 0, info: error })
    })
  })
}

module.exports = function streamMerge(
  scripts = [],
  fileWriteStream,
  sourceFileDirectory
) {
  // 这里用promise来实现同步传
  return new Promise(async (resolve, reject) => {
    while (scripts.length > 0) {
      const currentFile = path.resolve(
        __dirname,
        sourceFileDirectory,
        scripts.shift()
      )
      const currentReadStream = fs.createReadStream(currentFile) // 获取当前的可读流

      currentReadStream.pipe(fileWriteStream, { end: false })
      const res = await asyncMergeChunk(currentReadStream)
      if (res.code === 0) {
        resolve({ message: `合并出错了${currentFile}`, code: 0 })
      }
    }

    resolve({ message: `${sourceFileDirectory} 全部合并成功`, code: 1 })
  })
}
