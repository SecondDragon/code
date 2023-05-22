import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
import "lib-flexible";
import "muse-ui/lib/styles/base.less";
import "./global.less";

import {
  Button,
  Select,
  AppBar,
  Icon,
  Popover,
  List,
  Avatar,
  BottomSheet,
  Pagination,
  Paper,
  Chip,
  Carousel,
  Card,
  Tooltip,
  TextField,
  Dialog,
  Snackbar,
  Badge,
  Divider,
  Form,
  AutoComplete,
  Menu
} from "muse-ui";
import "muse-ui/lib/styles/theme.less";
import Toast from "muse-ui-toast";

Vue.use(Toast, {
  position: "top", // 弹出的位置
  time: 2000, // 显示的时长
  closeIcon: "close", // 关闭的图标
  close: true, // 是否显示关闭按钮
  successIcon: "check_circle", // 成功信息图标
  infoIcon: "info", // 信息信息图标
  warningIcon: "priority_high", // 提醒信息图标
  errorIcon: "warning", // 错误信息图标
});
Vue.use(Button);
Vue.use(Select);
Vue.use(AppBar);
Vue.use(Icon);
Vue.use(Popover);
Vue.use(List);
Vue.use(Avatar);
Vue.use(BottomSheet);
Vue.use(Pagination);
Vue.use(Paper);
Vue.use(Chip);
Vue.use(Carousel);
Vue.use(Card);
Vue.use(Tooltip);
Vue.use(TextField);
Vue.use(Dialog);
Vue.use(Snackbar);
Vue.use(Badge);
Vue.use(Divider);
Vue.use(Form);
Vue.use(AutoComplete);
Vue.use(Menu);

import Helpers from 'muse-ui/lib/Helpers';

Vue.use(Helpers);

import { isPC } from "@/utils";
Vue.prototype.isPC = isPC;
Vue.prototype.avatar = "http://nevergiveupt.top/index.jpg";

import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "http://www.nevergiveupt.top/loading.gif",
  loading: "http://www.nevergiveupt.top/loading.gif",
  attempt: 1,
});

//过滤器
import * as filters from "./filter";
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k])); //注册过滤器
Vue.prototype.filterDate = filters.filterDate; //时间过滤方法

import theme from "muse-ui/lib/theme";
theme.add(
  "selfDark",
  {
    primary: "#00e676",
    secondary: "#ff4081",
    success: "#4caf50",
    warning: "#fdd835",
    info: "#2196f3",
    error: "#f44336",
    track: "#757575",
    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.7)",
      alternate: "#303030",
      disabled: "rgba(255, 255, 255, 0.3)",
      hint: "rgba(255, 255, 255, 0.3)", // 提示文字颜色
    },
    divider: "rgba(255, 255, 255, 0.3)",
    background: {
      paper: "#424242",
      chip: "#616161",
      default: "#303030",
    },
  },

  "dark"
);

theme.add(
  "selfLight",
  {
    primary: "#00e676",
    secondary: "#ff4081",
    success: "#4caf50",
    warning: "#fdd835",
    info: "#2196f3",
    error: "#f44336",
    track: "#bdbdbd",
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "gba(0, 0, 0, 0.54)",
      alternate: "#fff",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)", // 提示文字颜色
    },
    divider: "rgba(0, 0, 0, 0.12)",
    background: {
      paper: "#fff",
      chip: "#e0e0e0",
      default: "#fafafa",
    },
  },
  "light"
);


const hours = new Date().getHours();
let defaultTheme = "";
if (hours >= 8 && hours <= 18) {
  defaultTheme = "selfLight";
} else {
  defaultTheme = "selfDark";
}
const selfTheme = localStorage.getItem("theme") || defaultTheme;
theme.use(selfTheme);
Vue.prototype.theme = theme;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
