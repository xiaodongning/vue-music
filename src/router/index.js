import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: () => import('@/components/recommend/index.vue')
    },
    {
      path: '/singer',
      name: 'singer',
      component: () => import('@/components/singer/index.vue'),
      children: [
        {
          path: ':id',
          name: 'detail',
          component: () => import('@/components/singer/detail.vue')
        }
      ]
    }
  ]
})
