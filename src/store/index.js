import Vuex from 'vuex'
import Vue from 'vue'
import orderList from './modules/orderList'
import loginStatus from './modules/loginStatus'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    orderList,
    loginStatus
  }
})
