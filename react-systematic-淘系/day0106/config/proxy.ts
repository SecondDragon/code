/**
 * @name 代理的配置
 * @see 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * @doc https://umijs.org/docs/guides/proxy
 */
export default {
  dev: {
    '/api': {
      target: 'http://backend-api-02.newbee.ltd/manage-api/v1',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    }
  },
  test: {},
  pre: {}
};