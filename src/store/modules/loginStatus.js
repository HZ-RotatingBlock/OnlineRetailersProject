// 登录状态数据仓库
const state = {
  loginStatus: false
}
const getters = {
  getLoginStatus: (state) => state.loginStatus
}
const mutations = {
  updataLoginStatus (state, status) {
    state.loginStatus = status
  }
}

export default {
  state,
  getters,
  mutations
}
