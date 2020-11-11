import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'Index'
    },
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import(/* webpackChunkName: "Index" */ '../views/Index.vue'),
  },
  {
    path: '/content/:id',
    name: 'Content',
    component: () => import(/* webpackChunkName: "Message" */ '../views/Content.vue'),
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import(/* webpackChunkName: "Message" */ '../views/Message.vue'),
  }, {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "About" */ '../views/About.vue')
  },
  // {
  //   path: '/register',
  //   name: 'Register',
  //   component: () => import(/* webpackChunkName: "Login" */ '../views/Register.vue')
  // },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/edit',
    name: 'Edit',
    component: () => import(/* webpackChunkName: "Edit" */ '../views/Edit.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  // mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
