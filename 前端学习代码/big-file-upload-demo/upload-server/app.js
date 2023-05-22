const express = require('express')
const bodyParser = require('body-parser')
const multiparty = require('multiparty')
const path = require('path')
const fs = require('fs-extra')

const streamMerge = require('./utils/streamMerge')

const app = express()
const port = 3000

app.use(bodyParser())
app.use(express.static('./file'))

app.get('/index', (req, res, next) => {
  res.send({
    status: 1,
  })
})

/**
 * 上传切片
 */
app.post('/upload', (req, res) => {
  const form = new multiparty.Form({
    uploadDir: path.resolve(__dirname, './file'),
  })
  form.parse(req, (err, fields, files) => {
    if (err) {
      return
    }
    const [chunk] = files.chunk
    const [hash] = fields.hash
    const [filename] = fields.filename
    const hashName = hash.split('-')[0]
    // 临时路径
    const { path: oldPath } = chunk
    // chunk-hash临时存储路径
    const chunkDir = path.resolve(__dirname, `./file/chunk-${hashName}`)
    if (!fs.existsSync(chunkDir)) {
      fs.mkdirSync(chunkDir)
    }
    // 这里虽然叫rename，其实可以达到文件移动并且重命名的功能
    fs.renameSync(
      oldPath,
      path.resolve(__dirname, `./file/chunk-${hashName}/` + hash)
    )

    res.send({
      hash,
      code: 1,
      message: '上传成功',
    })
  })
})

/**
 * 合并切片
 */
app.post('/merge', async (req, res) => {
  const { hash, filename } = req.body
  debugger
  if (!hash) {
    res.send({
      code: 0,
      message: '请传入最后一个切片的hash值',
    })
    return
  }
  const filenameArray = filename.split('.')
  const fileType = filenameArray[filenameArray.length - 1]
  // let truefilenameArray = filenameArray.
  const trueName = filenameArray.slice(0, filenameArray.length - 1).join('.')
  console.log("trueName----------", trueName, "fileType", fileType);
  // 创建一个可写流
  const fileWriteStream = fs.createWriteStream(
    path.resolve(__dirname, `./file/${trueName}.${fileType}`)
  )
  // 获取切片目录下的所有切片文件名
  const script = fs.readdirSync(path.resolve(__dirname, `./file/chunk-${hash}`))
  // 最终目标文件
  const targetFile = path.resolve(__dirname, `./file/chunk-${hash}`)

  const mergeRes = await streamMerge(script, fileWriteStream, targetFile)
  if (mergeRes.code === 1) {
    fs.remove(`./file/chunk-${hash}`)
  }
  res.send(mergeRes)
})

/**
 * 检测文件是否上传过
 */
app.get('/checkFileIsUploaded', (req, res) => {
  const { hash } = req.query
  console.log(req.params)
  const fileDir = fs.readdirSync('./file')
  let someDirName = ''
  let flag = false
  for (let i = 0; i < fileDir.length; i++) {
    const fileHash = fileDir[i].split('.')[0]
    const chunkName = fileDir[i].split('-')[1]
    console.log(fileHash)
    if (hash === fileHash) {
      flag = true
      break
    }
    if (chunkName === hash) {
      someDirName = `chunk-${hash}`
      break
    }
  }
  if (flag) {
    res.send({
      code: 1,
      message: '文件已上传过',
    })
    return
  }
  if (someDirName) {
    const chunkDir = fs.readdirSync(`./file/${someDirName}`).sort((a, b) => {
      return a > b
    })
    console.log(chunkDir)
    res.send({
      code: 2,
      message: '文件未上传完整',
      index: parseInt(chunkDir[chunkDir.length - 1].split('-')[1]) + 1,
    })
    return
  }
  res.send({
    code: 0,
    message: '文件未上传过',
  })
})

app.listen(port, () => {
  console.log(`服务在端口${port}起飞！！！`)
})
