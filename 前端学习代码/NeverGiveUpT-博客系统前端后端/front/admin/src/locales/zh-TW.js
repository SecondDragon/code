import component from './zh-TW/component';
import globalHeader from './zh-TW/globalHeader';
import menu from './zh-TW/menu';
import pwa from './zh-TW/pwa';
import settingDrawer from './zh-TW/settingDrawer';
import settings from './zh-TW/settings';
import articles from './zh-TW/articles';
import about from './zh-TW/about';
import categories from './zh-TW/categories';
import comment from './zh-TW/comment';
import login from './zh-TW/login';
import site from './zh-TW/site';
import tags from './zh-TW/tags';
import user from './zh-TW/user';
import common from './zh-TW/common';
export default {
  'navBar.lang': '語言',
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
