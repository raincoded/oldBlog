import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect:'index',
    children: [
      {
      path: 'index',
      name: 'Index',
      component: () => import(/* webpackChunkName: "about" */ '../views/pages/Index.vue'),
    },
     {
      path: 'content',
      name: 'Content',
      component: () => import(/* webpackChunkName: "about" */ '../views/pages/Content.vue'),
    },
    {
      path: 'message',
      name: 'Message',
      component: () => import(/* webpackChunkName: "about" */ '../views/pages/Message.vue'),
    }, {
      path: '/about',
      name: 'About',
      component: () => import(/* webpackChunkName: "about" */ '../views/pages/About.vue')
    },
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue')
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Register.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
