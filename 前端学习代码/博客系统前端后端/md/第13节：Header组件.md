# 第13节：Header组件

## 1.components下新建Header.vue

```vue
<template>
  <div class="header">
    <mu-appbar :color="background">
      <!-- title -->
      <span style="cursor: pointer">NeverGiveUpT</span>

      <mu-avatar slot="left" class="header-avatar" :size="50">
        <img src="http://www.nevergiveupt.top/user_avatar.png" />
      </mu-avatar>

      <!-- 菜单 -->
      <mu-button
        slot="right"
        v-for="(item, index) in info.menu"
        :key="item.name"
        :color="lightIndex === index ? '#00e676' : ''"
        flat
      >
        <mu-icon size="16" :value="item.icon"></mu-icon>
        {{ item.name }}
      </mu-button>

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

      <!-- 用户 -->
      <mu-button flat slot="right" ref="button" @click="openUser = !openUser">
        <div class="user">
          <span>永不放弃</span>
          <mu-icon value="expand_more"></mu-icon>
        </div>
      </mu-button>
      <mu-popover :open.sync="openUser" :trigger="trigger">
        <mu-list>
          <mu-list-item button>
            <mu-list-item-title>个人中心</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title>退出登录</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-popover>
    </mu-appbar>
  </div>
</template>

<script>
const menus = [
  {
    name: "首页",
    router: "index",
    icon: "home",
  },
  {
    name: "文章",
    router: "articles",
    icon: "note_add",
  },
  {
    name: "归档",
    router: "archives",
    icon: "drafts",
  },
  {
    name: "分类",
    router: "categories",
    icon: "dns",
  },
  {
    name: "标签",
    router: "tags",
    icon: "loyalty",
  },
  {
    name: "关于",
    router: "about",
    icon: "perm_identity",
  },
];

export default {
  name: "Header",
  props: {
    lightIndex: {
      type: Number,
      default: 0,
    },
    background: {
      type: String,
    },
  },
  data() {
    return {
      openUser: false,
      openTheme: false,

      trigger: null,
      triggerTheme: null,

      info: {
        menu: menus,
      },
    };
  },
  mounted() {
    this.trigger = this.$refs.button.$el;
    this.triggerTheme = this.$refs.theme.$el;
  },
};
</script>

<style scoped lang="less">
.header {
  position: fixed;
  z-index: 1501;
  width: 100%;
  top: 0;
}

.header-avatar {
  margin-left: 20px;
  cursor: pointer;
}

.mu-appbar {
  .mu-flat-button {
    flex: 1;
  }
  /deep/ .mu-appbar-right {
    flex: 1;
  }
}

.user {
  display: flex;
  justify-content: space-around;
  align-items: center;
  span {
    display: block;
    width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: right;
  }
}
</style>

```

## 2.main.js导入需要用到的组件

```js
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

import "muse-ui/lib/styles/base.less";
import {
  Button,
  Select,
  AppBar,
  Icon,
  Popover,
  List,
  Avatar,
} from "muse-ui";
import "muse-ui/lib/styles/theme.less";

Vue.use(Button);
Vue.use(Select);
Vue.use(AppBar);
Vue.use(Icon);
Vue.use(Popover);
Vue.use(List);
Vue.use(Avatar);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

```

## 3.views/Home/Index.vue使用header组件

导入Header

```vue
<template>
  <div>
    <IndexAnimation></IndexAnimation>
    <Header background="transparent"></Header>
   
    <div class="common">
      <div class="home">
        <p>{{ info.introduction }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
import IndexAnimation from "@/components/IndexAnimation";

let i = 0;
let timer = null;
export default {
  name: "index",
  components: {
    Header,
    IndexAnimation,
  },
  data() {
    return {
      info: {
        introduction: "",
        introductionTarget: "There is a kind of call to eat together.",
      },
    };
  },
  mounted() {
    this.typing();
  },
  methods: {
    typing() {
      if (i <= this.info.introductionTarget.length) {
        this.info.introduction =
          this.info.introductionTarget.slice(0, i++) + "_";
        timer = setTimeout(this.typing, 100);
      } else {
        this.info.introduction = this.info.introductionTarget; //结束打字,移除 _ 光标
        clearTimeout(timer);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  position: absolute;
  top: 50%;
  width: 100%;
  text-align: center;
  transform: translateY(-50%);
  font-size: 0.48rem;
  color: #fff;
  font-weight: 500;
}
</style>
```

## 4.将Header组件改造为移动端和PC端都支持的



1.utils/index.js新增一个判断是否是PC端的boolean值。

```js
export const isPC = (() => {
  let userAgentInfo = navigator.userAgent;
  let Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod",
    "XiaoMi/MiuiBrowser",
  ];
  let pc = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      pc = false;
      break;
    }
  }
  return pc && window.innerWidth > 750;
})();
```

2.main.js中将这个值挂载到Vue的原型上

```js
import { isPC } from "@/utils";
Vue.prototype.isPC = isPC;
```

3.Header.vue修改成如下

```vue
<template>
  <div class="header">
    <mu-appbar :color="background">
      <!-- title -->
      <span style="cursor: pointer">NeverGiveUpT</span>

      <!-- <mu-avatar slot="left" class="header-avatar" :size="50">
        <img src="http://www.nevergiveupt.top/user_avatar.png" />
      </mu-avatar> -->

      <!-- 菜单 -->
      <mu-button
        v-show="isPC"
        slot="right"
        v-for="(item, index) in info.menu"
        :key="item.name"
        :color="lightIndex === index ? '#00e676' : ''"
        flat
      >
        <mu-icon size="16" :value="item.icon"></mu-icon>
        {{ item.name }}
      </mu-button>

      <!-- 菜单图标 -->
      <mu-button v-show="!isPC" @click="toggleWapMenu(true)" icon slot="left">
        <mu-icon value="menu"></mu-icon>
      </mu-button>

      <!-- wap-菜单 -->
      <mu-bottom-sheet :open.sync="openWapMenu">
        <mu-list @item-click="toggleWapMenu(false)">
          <mu-list-item
            @click="go(item)"
            v-for="(item, index) in info.menu"
            :key="item.name"
            button
          >
            <mu-list-item-action>
              <mu-icon
                :color="lightIndex === index ? '#00e676' : ''"
                :value="item.icon"
              ></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title
              :style="{ color: lightIndex === index ? '#00e676' : '' }"
              >{{ item.name }}</mu-list-item-title
            >
          </mu-list-item>
        </mu-list>
      </mu-bottom-sheet>

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

      <!-- 用户 -->
      <mu-button flat slot="right" ref="button" @click="openUser = !openUser">
        <div class="user">
          <span>永不放弃</span>
          <mu-icon value="expand_more"></mu-icon>
        </div>
      </mu-button>
      <mu-popover :open.sync="openUser" :trigger="trigger">
        <mu-list>
          <mu-list-item button>
            <mu-list-item-title>个人中心</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title>退出登录</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-popover>
    </mu-appbar>
  </div>
</template>

<script>
const menus = [
  {
    name: "首页",
    router: "index",
    icon: "home",
  },
  {
    name: "文章",
    router: "articles",
    icon: "note_add",
  },
  {
    name: "归档",
    router: "archives",
    icon: "drafts",
  },
  {
    name: "分类",
    router: "categories",
    icon: "dns",
  },
  {
    name: "标签",
    router: "tags",
    icon: "loyalty",
  },
  {
    name: "关于",
    router: "about",
    icon: "perm_identity",
  },
];

export default {
  name: "Header",
  props: {
    lightIndex: {
      type: Number,
      default: 0,
    },
    background: {
      type: String,
    },
  },
  data() {
    return {
      openUser: false,
      openTheme: false,
      openWapMenu: false,

      trigger: null,
      triggerTheme: null,

      info: {
        menu: menus,
      },
    };
  },
  mounted() {
    this.trigger = this.$refs.button.$el;
    this.triggerTheme = this.$refs.theme.$el;
  },
  methods: {
    toggleWapMenu(openWapMenu) {
      this.openWapMenu = openWapMenu;
    },
   	go(item) {
    	// 多次点击当前菜单则不跳转
      if (this.$route.name === item.router) {
        return;
      }
      this.$router.push({
        name: item.router,
      });
    },
  },
};
</script>

<style scoped lang="less">
.header {
  position: fixed;
  z-index: 1501;
  width: 100%;
  top: 0;
}

.header-avatar {
  margin-left: 20px;
  cursor: pointer;
}

.mu-appbar {
  .mu-flat-button {
    flex: 1;
  }
  /deep/ .mu-appbar-right {
    flex: 1;
  }
}

.user {
  display: flex;
  justify-content: space-around;
  align-items: center;
  span {
    display: block;
    width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: right;
  }
}
</style>

```

wap版的使用了muse-ui的[BottomSheet](https://muse-ui.org/#/zh-CN/bottom-sheet)组件，别忘记在main.js中按需导入。

