import axios from 'axios'
const state = {
  orderList: [],
  params: {}
}
// 传入状态state对象，通过getters来间接操作state
const getters = {
  getOrderList: (state) => state.orderList
}
// 同步操作
const mutations = {
  // 传入状态state对象，而后第二个参数指代我们在其他组件通过this.$store.commit('changeOrderList', orderListData)来提交mutations并传递的参数
  updataOrderList (state, payLoad) {
    state.orderList = payLoad
  },
  updataParams (state, {key, val}) {
    state.params[key] = val
    console.log(state.params)
  }
}
// 异步操作
const actions = {
  // 传入功能对象，其中有两个属性可以通过ES6的解构赋值来操作他们
  // commit 是用来调用mutations的
  // state就是用来获取状态集state的
  fetchOrderList ({commit, state}) {
    axios.post('https://easy-mock.com/mock/5a27a82a7f2b435f137cfcc1/example/getOrderList', state.params).then((res) => {
      commit('updataOrderList', res.data.getOrderList.list)
    }).catch((err) => {
      console.log(err)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
