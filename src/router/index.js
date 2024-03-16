import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashbord',
  },
  {
    path: '/dashbord',
    name: 'dashbord',
    component: () => import( '../views/dashbord/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/login/index.vue')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import( '../views/map')
  },
  {
    path: '/saleAlayse',
    name: 'saleAlayse',
    component: () => import( '../views/saleAlayse')
  },
  {
    path: '/other',
    name: 'other',
    component: () => import( '../views/other')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
