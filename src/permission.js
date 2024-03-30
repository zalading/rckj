import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

/**
 *前置守卫
 *
*/

const whiteList = ['/login','/dashbord','/about','/business','/news','relate','/technology']
router.beforeEach(async(to, from, next) => {
  nprogress.start()
  console.log('store.token',store.getters.token);
  if (store.getters.token) {
    // 存在token
    if (to.path === '/login') {
      // 跳转到主页
      console.log('进入登录');
      next('/map') // 中转到主页
      // next（地址）并没有执行后置守卫
      nprogress.done()
    } else {
      console.log('进入放行');
      next() // 放行
      nprogress.done()
    }
  } else {
    // 没有token
    if (whiteList.includes(to.path)) {
      next()
      nprogress.done()
    } else {
      next('/login') // 中转到登录页
      nprogress.done()
    }
  }
})