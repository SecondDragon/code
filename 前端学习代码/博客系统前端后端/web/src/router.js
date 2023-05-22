import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
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
    path: "/archives",
    name: "archives",
    component: () =>
      import(/* webpackChunkName: "archives" */ "./views/Archives/Index.vue"),
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
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "./views/About/Index.vue"),
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
      import(/* webpackChunkName: "articles" */ "./views/Articles/Details.vue"),
  },
  {
    path: "/user",
    name: "user",
    component: () =>
      import(/* webpackChunkName: "user" */ "./views/User/Index.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
