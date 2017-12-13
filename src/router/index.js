import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/view/index'
import DetailPage from '@/view/detail'
import Forecast from '@/view/detail/forecast'
import Analysis from '@/view/detail/analysis'
import Count from '@/view/detail/count'
import Publish from '@/view/detail/publish'
import OrderListPage from '@/view/orderList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage
    },
    {
      path: '/detail',
      component: DetailPage,
      redirect: '/detail/count',
      children: [
        {
          path: 'count',
          component: Count
        },
        {
          path: 'forecast',
          component: Forecast
        },
        {
          path: 'analysis',
          component: Analysis
        },
        {
          path: 'publish',
          component: Publish
        }
      ]
    },
    {
      path: '/orderList',
      component: OrderListPage
    }
  ]
})
