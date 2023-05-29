const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  publicPath: isDev ? '/' : '/vue-testing-demo'
}
