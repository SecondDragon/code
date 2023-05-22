import React from 'react';
import {
  IconGift,
  IconList
  // IconStorage,
  // IconTags,
  // IconHeart,
  // IconUser,
  // IconMessage,
  // IconSettings,
  // IconHome,
  // IconHeartFill,
  // IconNav,
  // IconBook,
} from '@arco-design/web-react/icon';

export const defaultRoute = 'welcome';

export const routes = [
  {
    name: 'menu.welcome',
    key: 'welcome',
    icon: <IconGift />,
    componentPath: 'welcome',
  },
  {
    name: 'menu.list',
    key: 'list',
    icon: <IconList />,
    children: [
      {
        name: 'menu.list.searchTable',
        key: 'list/search-table',
        componentPath: 'search-table',
      },
    ],
  },

  // {
  //   name: '文章管理',
  //   key: 'articles',
  //   icon: <IconBook />,
  //   componentPath: 'articles',
  // },
  // {
  //   name: '文章管理',
  //   key: 'articles/edit',
  //   icon: <IconBook />,
  //   componentPath: 'articles/edit',
  //   hide: true,
  // },
  // {
  //   name: 'menu.categories',
  //   key: 'categories',
  //   icon: <IconStorage />,
  //   componentPath: 'categories',
  // },

  // {
  //   name: '标签管理',
  //   key: 'tags',
  //   icon: <IconTags />,
  //   componentPath: 'tags',
  // },
  // {
  //   name: '关于管理',
  //   key: 'about',
  //   icon: <IconHeart />,
  //   componentPath: 'about',
  // },
  // {
  //   name: '用户管理',
  //   key: 'user',
  //   icon: <IconUser />,
  //   componentPath: 'user',
  // },
  // {
  //   name: '评论管理',
  //   key: 'comment',
  //   icon: <IconMessage />,
  //   componentPath: 'comment',
  // },
  // {
  //   name: '网页配置',
  //   key: 'site',
  //   icon: <IconSettings />,
  //   children: [
  //     {
  //       name: '首页配置',
  //       key: 'home',
  //       icon: <IconHome />,
  //       componentPath: 'site/home',
  //     },
  //     {
  //       name: 'Header/Footer配置',
  //       key: 'hf',
  //       icon: <IconHeartFill />,
  //       componentPath: 'site/headerFooter',
  //     },
  //     {
  //       name: '侧栏配置',
  //       key: 'right',
  //       icon: <IconNav />,
  //       componentPath: 'site/right',
  //     },
  //   ],
  // },
];
