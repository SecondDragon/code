# 第33节：NotFound组件

首先还是必看muse-ui的[主题](https://muse-ui.org/#/zh-CN/theme)

## 1.将之前Header.vue中的替换为如下

```vue
<!-- 主题切换 -->
<mu-button flat slot="right" ref="theme" @click="openTheme = !openTheme">
  <mu-icon value="color_lens"></mu-icon>
</mu-button>
<mu-popover :open.sync="openTheme" :trigger="triggerTheme">
  <mu-list>
    <mu-list-item button>
      <mu-list-item-title>Light</mu-list-item-title>
    </mu-list-item>
    <mu-list-item button>
      <mu-list-item-title>Dark</mu-list-item-title>
    </mu-list-item>
  </mu-list>
</mu-popover>
```

替换为：

```vue
<!-- 主题切换 -->
<mu-button flat slot="right" ref="theme" @click="openTheme = !openTheme">
  <mu-icon value="color_lens"></mu-icon>
</mu-button>
<mu-popover :open.sync="openTheme" :trigger="triggerTheme">
  <mu-list>
    <mu-list-item button @click="toggleTheme('selfLight')">
      <mu-list-item-title class="theme-title">
        <mu-icon
                 :color="me === 'selfLight' ? 'primary' : ''"
                 value="brightness_7"
                 ></mu-icon>
      </mu-list-item-title>
    </mu-list-item>
    <mu-list-item button @click="toggleTheme('selfDark')">
      <mu-list-item-title class="theme-title">
        <mu-icon
                 :color="me === 'selfDark' ? 'primary' : ''"
                 value="brightness_4"
                 ></mu-icon>
      </mu-list-item-title>
    </mu-list-item>
  </mu-list>
</mu-popover>
```

## 2.data里面定义变量

```js
data(){
  // ...
   me: "",
  // ...
}
```

## 3.methods里面定义方法

```js
methods:{
  toggleTheme(me) {
      this.theme.use(me); // 来自main.js
      this.me = me;
      localStorage.setItem("theme", me);
      this.openTheme = false;
    },
}
```

## 4.mounted中设置默认主题

我们取早上8点到晚上18点为白天

```js
mounted(){
   const hours = new Date().getHours();
    let defaultTheme = "";
    if (hours >= 8 && hours <= 18) {
      defaultTheme = "selfLight";
    } else {
      defaultTheme = "selfDark";
    }
    this.me = localStorage.getItem("theme") || defaultTheme;
}
```

## 5.main.js中引入设置主题的方式

```js
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
```













