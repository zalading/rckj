import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

/**
 *前置守卫
 *
*/

const whiteList = ['/login','/','/about','/business','/news','/relate','/technology']
router.beforeEach(async(to, from, next) => {
  nprogress.start()
  if (store.getters.token) {
    // 存在token
    if (whiteList.includes(to.path)) {
      // 跳转到主页
      next('/dataScreen') // 中转到主页
      // next（地址）并没有执行后置守卫
      nprogress.done()
    } else {
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