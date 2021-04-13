import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Photo from "../views/Photo.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      isAuth: false,
    },
  },
  {
    path: "/",
    redirect: "/photo",
  },
  {
    path: "/photo",
    name: "Photo",
    component: Photo,
    meta: {
      isAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  // 如果说是需要鉴权的 那么看看有没有 token
  if (to.meta.isAuth) {
    if (store.state.token) {
      next();
    } else {
      next({
        name: "Login",
      });
    }
  } else {
    next();
  }
});

export default router;
