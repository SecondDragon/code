// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {
    // dark: true, // 开启暗色主题
    // compact: true, // 开启紧凑主题
  },
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/admin',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/admin/login',
          component: './Login',
        },
      ],
    },
    {
      path: '/403',
      component: '../layouts/BasicLayout',
      routes: [
        {
          path: '/403',
          component: './403',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/',
              redirect: '/home',
            },
            {
              path: '/home',
              name: 'home',
              icon: 'smile',
              component: './Dashboard',
            },
            {
              name: 'list.articles',
              icon: 'container',
              path: '/articles',
              component: './Articles',
            },
            {
              name: 'list.articles-edit',
              icon: 'edit',
              path: '/articles/:type/:id',
              component: './Articles/Edit',
              hideInMenu: true,
            },
            {
              name: 'list.categories',
              icon: 'cluster',
              path: '/categories',
              component: './Categories',
            },
            {
              name: 'list.tags',
              icon: 'tags',
              path: '/tags',
              component: './Tags',
            },
            {
              name: 'list.about',
              icon: 'heart',
              path: '/about',
              component: './About',
            },
            {
              name: 'list.user',
              icon: 'user',
              path: '/user',
              component: './User',
            },

            {
              name: 'list.comment',
              icon: 'comment',
              path: '/comment',
              component: './Comment',
            },

            {
              name: 'list.site',
              icon: 'setting',
              path: '/site',
              routes: [
                {
                  name: 'site-home',
                  icon: 'home',
                  path: '/site/home',
                  component: './Site/Home',
                },
                {
                  name: 'site-header-footer',
                  icon: 'columnHeight',
                  path: '/site/hf',
                  component: './Site/HeaderFooter',
                },
                {
                  name: 'site-right',
                  icon: 'picRight',
                  path: '/site/right',
                  component: './Site/Right',
                },
                {
                  name: 'site-resume',
                  icon: 'book',
                  path: '/site/resume',
                  component: './Site/Resume',
                },
                {
                  name: 'site-resume-edit',
                  icon: 'edit',
                  path: '/site/resume/edit',
                  component: './Site/Resume/Edit',
                  hideInMenu: true,
                },
                {
                  name: 'site-wedding',
                  icon: 'book',
                  path: '/site/wedding',
                  component: './Site/Wedding',
                },
              ],
            },
            {
              name: 'list.order',
              icon: 'dollar',
              path: '/order',
              component: './Order',
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },

    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
    'primary-color-hover': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
