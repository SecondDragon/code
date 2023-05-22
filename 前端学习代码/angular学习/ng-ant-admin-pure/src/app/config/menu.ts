/*
 * 只有在菜单静态加载时候，可以把以下注释打开
 * */

import { InjectionToken } from '@angular/core';

import { Menu } from '@core/services/types';

/*定义菜单*/
export const MENU_TOKEN = new InjectionToken<Menu[]>('menu-token', {
  providedIn: 'root',
  factory(): Menu[] {
    return menuNav;
  }
});

const menuNav: Menu[] = [
  {
    menuName: '欢迎',
    id: 1,
    fatherId: 0,
    icon: 'dashboard',
    open: false,
    selected: false,
    menuType: 'C',
    path: '/default/welcome',
    code: ''
  }
];
