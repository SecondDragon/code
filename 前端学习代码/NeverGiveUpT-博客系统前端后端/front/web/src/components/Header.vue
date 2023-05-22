<template>
  <div class="header">
    <mu-appbar :color="background">
      <!-- 菜单图标 -->
      <mu-button v-show="!isPC" @click="toggleWapMenu(true)" icon slot="left">
        <mu-icon value="menu"></mu-icon>
      </mu-button>

      <!-- 头像 -->
      <mu-avatar
        v-if="info.logo"
        slot="left"
        style="margin-left: 20px; cursor: pointer"
        @click="go({ router: 'index' })"
        :size="50"
      >
        <img :src="info.logo" />
      </mu-avatar>

      <!-- title -->
      <span
        style="cursor: pointer"
        @click="go({ router: 'index' })"
        v-if="info.title"
        >{{ info.title }}</span
      >

      <!-- 菜单 -->
      <mu-button
        class="menu-btn"
        v-show="isPC"
        @click="go(item)"
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

      <!-- 用户 -->
      <mu-button
        v-if="user"
        flat
        slot="right"
        ref="button"
        @click="openUser = !openUser"
      >
        <div class="user">
          <span>{{ user.nickName || user.email }}</span>
          <mu-icon value="expand_more"></mu-icon>
        </div>
      </mu-button>
      <mu-popover :open.sync="openUser" :trigger="trigger">
        <mu-list>
          <mu-list-item button @click="$router.push('/user')">
            <mu-list-item-title>个人中心</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button @click="logout">
            <mu-list-item-title>退出登录</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-popover>
    </mu-appbar>

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

    <!-- 搜索按钮 -->
    <div class="tool" v-if="isShowAction">
      <div v-if="info.login && !user" class="tool-row">
        <mu-slide-left-transition>
          <mu-button
            v-show="showToolBtn"
            @click="
              openLoginModal = true;
              showToolBtn = false;
            "
            fab
            color="primary"
            >登录</mu-button
          >
        </mu-slide-left-transition>
      </div>
      <div class="tool-row">
        <mu-tooltip placement="right-start" content="登录/注册/搜索">
          <mu-button
            @click="showToolBtn = !showToolBtn"
            fab
            color="info"
            class="search-fab"
          >
            <mu-icon value="adb"></mu-icon>
          </mu-button>
        </mu-tooltip>

        <mu-slide-left-transition>
          <mu-button
            v-show="showToolBtn && info.openSearch"
            @click="handleSearch"
            fab
            color="error"
            >搜索</mu-button
          >
        </mu-slide-left-transition>
      </div>
      <div v-if="info.register && !user" class="tool-row">
        <mu-slide-left-transition>
          <mu-button
            v-show="showToolBtn"
            @click="
              openRegisterModal = true;
              showToolBtn = false;
            "
            fab
            color="warning"
            >注册</mu-button
          >
        </mu-slide-left-transition>
      </div>
    </div>

    <RegisterForm
      :open="openRegisterModal"
      @toggle="toggleRegisterModal"
    ></RegisterForm>
    <LoginForm :open="openLoginModal" @toggle="toggleLoginModal"></LoginForm>
    <SearchForm
      :open="openSearchModal"
      @toggle="toggleSearchModal"
    ></SearchForm>

    <mu-slide-bottom-transition>
      <mu-tooltip placement="top" content="Top">
        <mu-button
          class="back-top"
          v-show="showBackTop"
          @click="scrollTop"
          fab
          color="secondary"
        >
          <mu-icon value="arrow_upward"></mu-icon>
        </mu-button>
      </mu-tooltip>
    </mu-slide-bottom-transition>
    
  </div>
</template>
<script>
import RegisterForm from "@/components/RegisterForm";
import LoginForm from "@/components/LoginForm";
import SearchForm from "@/components/SearchForm";

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
  components: {
    RegisterForm,
    LoginForm,
    SearchForm,
  },
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
      showToolBtn: false,
      showBackTop: false,
      openSearchModal: false,
      openLoginModal: false,
      openRegisterModal: false,
      openWapMenu: false,
      isShowAction: true,
      info: {},
      openUser: false,
      trigger: null,
      openTheme: false,
      me: "",
      triggerTheme: null,
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  mounted() {
    const hours = new Date().getHours();
    let defaultTheme = "";
    if (hours >= 8 && hours <= 18) {
      defaultTheme = "selfLight";
    } else {
      defaultTheme = "selfDark";
    }
    this.me = localStorage.getItem("theme") || defaultTheme;
    this.getInfo();
    this.triggerTheme = this.$refs.theme.$el;
    if (this.user) {
      this.trigger = this.$refs.button.$el;
    }
    window.onscroll = () => {
      if (document.documentElement.scrollTop + document.body.scrollTop > 100) {
        this.showBackTop = true;
      } else {
        this.showBackTop = false;
      }
    };
  },

  methods: {
    async getInfo() {

      const res = await this.$axios.get("/header");
      if (res.data) {
        this.info = res.data.header;
        this.info.menu = menus;
        this.isShowAction = !(
          !this.info.openSearch &&
          !this.info.register &&
          !this.info.login
        );
      }
    },
    go(item) {
      if (this.$route.name === item.router) {
        return;
      }
      this.$router.push({
        name: item.router,
      });
    },
    toggleWapMenu(openWapMenu) {
      this.openWapMenu = openWapMenu;
    },
    toggleRegisterModal(openRegisterModal) {
      this.openRegisterModal = openRegisterModal;
    },
    toggleLoginModal(openLoginModal) {
      this.openLoginModal = openLoginModal;
    },
    toggleSearchModal(openSearchModal) {
      this.openSearchModal = openSearchModal;
    },
    scrollTop() {
      document.body.scrollIntoView({ block: "start", behavior: "smooth" });
    },
    async logout() {
      const res = await this.$axios.post("/logout");
      if (res) {
        localStorage.removeItem("user");
        sessionStorage.removeItem("like");
        this.openUser = false;
        this.user = null;
        this.$toast.success(res.msg);
        location.reload();
      }
    },
    toggleTheme(me) {
      this.theme.use(me);
      this.me = me;
      localStorage.setItem("theme", me);
      this.openTheme = false;
    },
    handleSearch() {
      this.openSearchModal = true;
      this.showToolBtn = false;
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  position: fixed;
  z-index: 1501;
  width: 100%;
  top: 0;
}

.mu-appbar {
  .mu-flat-button {
    flex: 1;
  }
  /deep/ .mu-appbar-right {
    flex: 1;
  }
}

.tool {
  position: fixed;
  left: 0;
  bottom: 2.66667rem;
  .tool-row {
    margin-top: 20px;
    height: 56px;
    .search-fab {
      margin-left: -28px;
      margin-right: 20px;
    }
  }
}

.back-top {
  position: fixed;
  right: 0.26667rem;
  bottom: 0.4rem;
  background: #595959;
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
.theme-title {
  display: flex;
  justify-content: space-between;
}
</style>