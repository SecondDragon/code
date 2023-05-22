// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from 'C:/Users/83687/AppData/Local/Yarn/Data/global/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": require('@/layouts/index.js').default,
    "routes": [
      {
        "path": "/",
        "exact": true,
        "component": require('@/pages/index.js').default
      },
      {
        "path": "/login",
        "exact": true,
        "component": require('@/pages/login.js').default
      },
      {
        "path": "/profile",
        "exact": true,
        "component": require('@/pages/profile.js').default,
        "wrappers": [require('@/wrappers/auth').default]
      },
      {
        "path": "/user",
        "routes": [
          {
            "path": "/user/add",
            "exact": true,
            "component": require('@/pages/user/add.js').default
          },
          {
            "path": "/user/detail/:id",
            "exact": true,
            "component": require('@/pages/user/detail/[id].js').default
          },
          {
            "path": "/user/list",
            "exact": true,
            "component": require('@/pages/user/list.js').default
          }
        ],
        "component": require('@/pages/user/_layout.js').default
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
