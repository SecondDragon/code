import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
import router from "./router";

import "muse-ui/lib/styles/base.less";
import "./global.less";
import "lib-flexible";
import { isPC } from "@/utils";
import {
  Button,
  Select,
  AppBar,
  Icon,
  Menu,
  List,
  BottomSheet,
  TextField,
  Dialog,
  Progress,
  Card,
  Avatar,
  Carousel,
  Paper,
  Chip,
  Grid,
  Pagination,
  Divider,
  LoadMore,
  SubHeader,
  Form,
  AutoComplete,
  Popover,
  Badge,
  Snackbar,
  Picker,
  Alert,
  Drawer,
  GridList,
  Tooltip,
  BottomNav,
  ExpansionPanel,
} from "muse-ui";
import "muse-ui/lib/styles/theme.less";
import "muse-ui-progress/dist/muse-ui-progress.css";
import NProgress from "muse-ui-progress";
import Helpers from "muse-ui/lib/Helpers";
import Toast from "muse-ui-toast";

import "muse-ui-message/dist/muse-ui-message.css";
import Message from "muse-ui-message";
Vue.use(Message);

import "muse-ui-loading/dist/muse-ui-loading.css";
import Loading from "muse-ui-loading";
Vue.use(Loading, {
  overlayColor: "transparent", // 背景色
});

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

import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "http://www.nevergiveupt.top/loading.gif",
  loading: "http://www.nevergiveupt.top/loading.gif",
  attempt: 1,
});

Vue.use(NProgress);
Vue.use(Helpers);
Vue.use(Toast, {
  position: "top", // 弹出的位置
  time: 5000, // 显示的时长
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
Vue.use(Menu);
Vue.use(List);
Vue.use(BottomSheet);
Vue.use(TextField);
Vue.use(Dialog);
Vue.use(Progress);
Vue.use(Card);
Vue.use(Avatar);
Vue.use(Carousel);
Vue.use(Paper);
Vue.use(Chip);
Vue.use(Grid);
Vue.use(Pagination);
Vue.use(Divider);
Vue.use(LoadMore);
Vue.use(SubHeader);
Vue.use(Form);
Vue.use(AutoComplete);
Vue.use(Popover);
Vue.use(Badge);
Vue.use(Snackbar);
Vue.use(Picker);
Vue.use(Alert);
Vue.use(Drawer);
Vue.use(GridList);
Vue.use(Tooltip);
Vue.use(BottomNav);
Vue.use(ExpansionPanel);

Vue.prototype.isPC = isPC;

import axios from "@/utils/axios";
Vue.prototype.$axios = axios;

//过滤器
import * as filters from "./filter";
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k])); //注册过滤器
Vue.prototype.filterDate = filters.filterDate; //时间过滤方法

import noData from "@/assets/img/nodata.png";
Vue.prototype.noData = noData;
Vue.prototype.avatar =
  "http://img.nevergiveupt.top/d962de99454167348513dd191fe20698.jpeg";

// 图片预览
import gallery from "img-vuer";
Vue.use(gallery, {
  swipeThreshold: 150, // default 100 ,new in 0.12.0
  isIndexShow: true, // show image index
  useCloseButton: false, // trigger gallery close with only close button
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
