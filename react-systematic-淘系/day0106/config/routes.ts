/**
 * @name umi的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon,layout 的配置
 * @doc https://umijs.org/docs/guides/routes
 */
const routes = [{
  path: '/',
  redirect: '/controlpannel'
}, {
  path: '/controlpannel',
  name: '控制面板',
  icon: 'windows',
  component: './ControlPannel'
}, {
  path: '/home',
  name: '首页管理',
  icon: 'home',
  // 首页的子路由
  routes: [{
    path: '/home',
    redirect: '/home/banner'
  }, {
    path: '/home/banner',
    name: '轮播图设置',
    component: './home/Banner'
  }, {
    path: '/home/hotsale',
    name: '热销商品',
    component: './home/HotSale'
  }, {
    path: '/home/recommend',
    name: '为你推荐',
    component: './home/Recommend'
  }, {
    path: '/home/newest',
    name: '最新商品',
    component: './home/Newest'
  }]
}, {
  path: '/classify',
  name: '分类管理',
  icon: 'database',
  component: './Classify'
}, {
  path: '/goods',
  name: '商品管理',
  icon: 'shopping',
  component: './Goods'
}, {
  path: '/order',
  name: '订单管理',
  icon: 'PropertySafety',
  component: './Order'
}, {
  path: '/member',
  name: '会员管理',
  icon: 'user',
  component: './Member'
}, {
  path: '/system',
  name: '系统设置',
  icon: 'setting',
  component: './System'
}, {
  path: '/login',
  name: '用户登录',
  layout: false,
  component: './Login'
}, {
  path: '*',
  name: '找不到页面',
  layout: false,
  component: './404'
}];
export default routes;