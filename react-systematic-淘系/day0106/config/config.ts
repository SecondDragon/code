// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV = 'dev', NODE_ENV } = process.env;

export default defineConfig({
  /**
   * @name 常规配置
   */
  title: "CMS内容管理系统",
  targets: {
    ie: 11
  },
  hash: true,
  devtool: false,
  inlineLimit: 10000,
  jsMinifier: 'terser',
  publicPath: NODE_ENV === 'production' ? './' : '/',

  /**
   * @name 路由的配置
   * @doc https://umijs.org/docs/guides/routes
   */
  historyWithQuery: {},
  history: {
    type: 'hash'
  },
  routes,

  /**
   * @name 主题的配置
   * @doc antd的主题设置 https://ant.design/docs/react/customize-theme-cn
   * @doc umi 的theme 配置 https://umijs.org/docs/api/config#theme
   */
  theme: {
    'root-entry-name': 'variable'
  },

  /**
   * @name 代理配置
   * @see 要注意以下 代理只能在本地开发时使用，build之后就无法使用了
   * @doc 代理介绍 https://umijs.org/docs/guides/proxy
   * @doc 代理配置 https://umijs.org/docs/api/config#proxy
   */
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],

  /**
   * @name 快速热更新配置
   * @description 一个不错的热更新组件，更新时可以保留state
   */
  fastRefresh: true,

  //============== 以下都是max的插件配置 ===============
  /**
   * @name 数据流插件
   * @@doc https://umijs.org/docs/max/data-flow
   */
  model: {},

  /**
   * 一个全局的初始数据流，可以用它在插件之间共享数据
   * @description 可以用来存放一些全局的数据，比如用户信息，或者一些全局的状态，全局初始状态在整个 Umi 项目的最开始创建。
   * @doc https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6%E6%80%81
   */
  initialState: {},

  /**
   * @name layout 插件
   * @doc https://umijs.org/docs/max/layout-menu
   */
  layout: {
    locale: false,
    ...defaultSettings
  },

  /**
   * @name antd 插件
   * @description 内置了 babel import 插件
   * @doc https://umijs.org/docs/max/antd#antd
   */
  antd: {},

  /**
   * @name 网络请求配置
   * @description 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
   * @doc https://umijs.org/docs/max/request
   */
  request: {},

  /**
   * @name 权限插件
   * @description 基于 initialState 的权限插件，必须先打开 initialState
   * @doc https://umijs.org/docs/max/access
   */
  access: {}
});