import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'

Vue.use(VueRouter)

const routes = [
  // 首页
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { title: '公众·创新·产品' }
  },
  // 产品中心页面
  {
    path: '/product',
    name: 'product',
    component: () => import('../views/product/index.vue'),
    meta: { title: '产品' }
  },

  // 用户中心页面
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/user/index.vue'),
    meta: { title: '用户' }
  },

  {
    path: '/experience',
    name: 'experience',
    component: () => import('../views/experience/index.vue'),
    meta: { title: '体验' }
  },
  {
    path: '/product-evaluation',
    name: 'product-evaluation',
    component: () => import('../views/product-evaluation/index.vue'),
    meta: { title: '产品评价' }
  },
  {
    path: '/product-info',
    name: 'product-info',
    component: () => import('../views/product-info/index.vue'),
    meta: { title: '产品名称' }
  },
  {
    path: '/channel',
    name: 'channel',
    component: () => import('../views/channel/index.vue'),
    meta: { title: '渠道' }
  },
  {
    path: '/power',
    name: 'power',
    component: () => import('../views/power/index.vue'),
    meta: { title: '能力' }
  }

]

const router = new VueRouter({
  routes
})

export default router
