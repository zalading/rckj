import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
   {
     path: '/',
     redirect: '/dashbord',
   },
  //首页
  {
    path: '/dashbord',
    name: 'dashbord',
    component: () => import( '../views/dashbord/index.vue')
  },
  //事业中心
  {
    path: '/business',
    name: 'business',
    component: () => import( '../views/business/index.vue')
  },
  //技术实力
  {
    path: '/technology',
    name: 'technology',
    component: () => import( '../views/technology/index.vue')
  },
  //关于苒辰
  {
    path: '/about',
    name: 'about',
    component: () => import( '../views/about/index.vue')
  },
  //新闻中心
  {
    path: '/news',
    name: 'news',
    component: () => import( '../views/news/index.vue')
  },
  //联系我们
  {
    path: '/relate',
    name: 'relate',
    component: () => import( '../views/relate/index.vue')
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
    path: '/goodsAlayse',
    name: 'goodsAlayse',
    component: () => import( '../views/function/goodsAlayse')
  },
  {
    path: '/saleAlayse',
    name: 'saleAlayse',
    component: () => import('../views/function/saleAlayse'),
    props: true
  },
  {
    path: '/keyword',
    name: 'keyword',
    component: () => import( '../views/function/keyword')
  },
  {
    path: '/userlist',
    name: 'userlist',
    component: () => import( '../views/function/userlist')
  },
  {
    path: '/usermanage',
    name: 'usermanage',
    component: () => import( '../views/function/usermanage')
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
