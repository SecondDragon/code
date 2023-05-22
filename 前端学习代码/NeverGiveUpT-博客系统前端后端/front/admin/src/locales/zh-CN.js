import component from './zh-CN/component';
import globalHeader from './zh-CN/globalHeader';
import menu from './zh-CN/menu';
import pwa from './zh-CN/pwa';
import settingDrawer from './zh-CN/settingDrawer';
import settings from './zh-CN/settings';
import articles from './zh-CN/articles';
import about from './zh-CN/about';
import categories from './zh-CN/categories';
import comment from './zh-CN/comment';
import login from './zh-CN/login';
import site from './zh-CN/site';
import tags from './zh-CN/tags';
import user from './zh-CN/user';
import common from './zh-CN/common';

export default {
  'navBar.lang': '语言',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...articles,
  ...about,
  ...categories,
  ...comment,
  ...login,
  ...site,
  ...tags,
  ...user,
  ...common,
};
