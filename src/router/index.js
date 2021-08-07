// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

// Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

// export default router

import Vue from "vue";
import Router from "vue-router";
import Main from "../views/Main";
import About from "../views/About";
import Company from "../components/Company";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main,
      props: true
    },
    {
      path: "/about",
      name: "about",
      component: About,
      props: true
    },
    {
      path: "/company",
      name: "company",
      component: Company
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});
