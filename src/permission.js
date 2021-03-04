/**
 * Created by jiangx36
 */
// 设置路由权限
import router from './router'
import store from './store'
import { Toast } from 'vant'
import getPageTitle from '@/utils/get-page-title'

const whiteList = ['/login'] // 配置不重定向页面白名单

router.beforeEach(async (to, from, next) => {
  // 设置页面 title
  document.title = getPageTitle(to.meta.title)

  // 验证是否有登录状态（获取token）
  const hasToken = store.getters.token

  if (hasToken) {
    if (to.path === '/login') {
      // 如果为登录状态跳转至主页
      next({ path: '/' })
    } else {
      // 在此进行权限限制或用户信息校验相关处理，可按需更改
      const hasGetUserInfo = store.getters.trueName && store.getters.trueName.length > 0
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')
          next({ ...to, replace: true })
        } catch (error) {
          // 移除token跳转登录页
          await store.dispatch('user/resetToken')
          Toast.fail(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    /* 无token情况处理 */
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单放行
      next()
    } else {
      // 其他页面跳转至登录页，具体处理逻辑以业务为准
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  // 跳转载入后的操作
  // do something ...
})
