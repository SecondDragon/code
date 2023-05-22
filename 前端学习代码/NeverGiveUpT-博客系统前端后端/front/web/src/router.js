import Vue from "vue";
import Router from "vue-router";
import axios from "@/utils/axios";

// const originalPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch((err) => err);
// };

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: {
        name: "index",
      },
    },
    {
      path: "/index",
      name: "index",
      component: () =>
        import(/* webpackChunkName: "index" */ "./views/Home/Index.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About/Index.vue"),
    },
    {
      path: "/tags",
      name: "tags",
      component: () =>
        import(/* webpackChunkName: "tags" */ "./views/Tags/Index.vue"),
    },
    {
      path: "/tags/details",
      name: "tagsDetails",
      component: () =>
        import(/* webpackChunkName: "tags" */ "./views/Tags/Details.vue"),
    },
    {
      path: "/categories",
      name: "categories",
      component: () =>
        import(
          /* webpackChunkName: "categories" */ "./views/Categories/Index.vue"
        ),
    },
    {
      path: "/categories/details",
      name: "categoriesDetails",
      component: () =>
        import(
          /* webpackChunkName: "categories" */ "./views/Categories/Details.vue"
        ),
    },
    {
      path: "/archives",
      name: "archives",
      component: () =>
        import(/* webpackChunkName: "archives" */ "./views/Archives/Index.vue"),
    },
    {
      path: "/articles",
      name: "articles",
      component: () =>
        import(/* webpackChunkName: "articles" */ "./views/Articles/Index.vue"),
    },
    {
      path: "/articles/details",
      name: "articlesDetails",
      component: () =>
        import(
          /* webpackChunkName: "articles" */ "./views/Articles/Details.vue"
        ),
    },
    // {
    //   path: "/resume",
    //   name: "resume",
    //   component: () =>
    //     import(/* webpackChunkName: "resume" */ "./views/Resume.vue"),
    // },
    // {
    //   path: "/pictures",
    //   name: "pictures",
    //   component: () =>
    //     import(/* webpackChunkName: "pictures" */ "./views/Tkb/Pictures.vue"),
    // },

    // {
    //   path: "/pictures/list",
    //   name: "pictureList",
    //   component: () =>
    //     import(
    //       /* webpackChunkName: "pictures" */ "./views/Tkb/PicturesList.vue"
    //     ),
    // },
    // {
    //   path: "/books",
    //   name: "books",
    //   component: () =>
    //     import(/* webpackChunkName: "books" */ "./views/Tkb/Books.vue"),
    // },
    // {
    //   path: "/books/read",
    //   name: "booksRead",
    //   component: () =>
    //     import(/* webpackChunkName: "books" */ "./views/Tkb/BooksRead.vue"),
    // },
    // {
    //   path: "/stars",
    //   name: "stars",
    //   component: () =>
    //     import(/* webpackChunkName: "stars" */ "./views/Tkb/Stars.vue"),
    // },
    // {
    //   path: "/stars/info",
    //   name: "starsInfo",
    //   component: () =>
    //     import(/* webpackChunkName: "stars" */ "./views/Tkb/StarsInfo.vue"),
    // },

    // {
    //   path: "/play",
    //   name: "play",
    //   component: () =>
    //     import(/* webpackChunkName: "play" */ "./views/Tkb/Play.vue"),
    // },
    // {
    //   path: "/videos",
    //   name: "videos",
    //   component: () =>
    //     import(/* webpackChunkName: "videos" */ "./views/Tkb/Videos.vue"),
    // },
    {
      path: "/user",
      name: "user",
      component: () =>
        import(/* webpackChunkName: "user" */ "./views/User/Index.vue"),
    },
    {
      path: "*",
      name: "notFound",
      component: () =>
        import(/* webpackChunkName: "notFound" */ "./views/NotFound.vue"),
    },
  ],
});

// 以下路由必须开启了tkb才能访问
const whiteList = [
  "pictures",
  "pictureList",
  "books",
  "booksRead",
  "stars",
  "starsInfo",
  "play",
  "videos",
];
router.beforeEach(async (to, from, next) => {
  if (whiteList.includes(to.name)) {
    const res = await axios.get("/about");
    if (res.data) {
      if (res.data.showTkb) {
        next();
      } else {
        router.push("/");
      }
    }
  } else {
    next();
  }
});

export default router;
