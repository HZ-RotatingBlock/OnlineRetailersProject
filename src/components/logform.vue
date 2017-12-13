<template>
  <!-- 登录组件 -->
  <div class="login-form">
    <div class="g-form">
      <img src="../assets/login.png" class="loginLogo">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text" placeholder="请输入用户名" v-model="usernameModel">
        </div>
        <span class="g-form-error">{{ userErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password" placeholder="请输入密码" v-model="passwordModel">
        </div>
        <span class="g-form-error">{{ passwordErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form=btn">
          <a class="button" @click="onLogin">登录</a>
        </div>
      </div>
      <p class="prompt">{{ errorText }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      usernameModel: '',
      passwordModel: '',
      errorText: ''
    }
  },
  computed: {
    userErrors () {
      let errorText, status
      if (!/@/g.test(this.usernameModel)) {
        status = false
        errorText = '未包含@'
      } else {
        status = true
        errorText = ''
      }
      // 如果不存在则表示是首次进入，第一次进入时置空errorText同时声明this.userFlag为true
      if (!this.userFlag) {
        errorText = ''
        this.userFlag = true
      }
      return {
        status: status,
        errorText: errorText
      }
    },
    passwordErrors () {
      let errorText, status
      if (!/^\w{6,16}$/g.test(this.passwordModel)) {
        status = false
        errorText = '请输入6-16位的密码'
      } else {
        status = true
        errorText = ''
      }
      if (!this.passwordFlag) {
        errorText = ''
        this.passwordFlag = true
      }
      return {
        status: status,
        errorText: errorText
      }
    }
  },
  methods: {
    onLogin () {
      if (!this.userErrors.status || !this.passwordErrors.status) {
        this.errorText = '部分选项未通过'
      } else {
        this.errorText = ''
        this.$axios.get('https://easy-mock.com/mock/5a27a82a7f2b435f137cfcc1/example/login')
        .then((res) => {
          // 登录验证
          if (res.data.login.username === this.usernameModel && res.data.login.password.toString() === this.passwordModel.toString()) {
            this.$emit('has-log', res.data)
            this.$store.commit('updataLoginStatus', true)
          } else if (res.data.login.username !== this.usernameModel) {
            this.errorText = '登录信息有误，请重新检查'
          } else if (res.data.login.password.toString() !== this.passwordModel.toString()) {
            this.errorText = '登录信息有误，请重新检查'
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .loginLogo{
    display: block;
    width: 100px;
    margin: 10px auto 20px;
  }
  p.prompt {
    width: 100%;
    font-size: 16px;
    text-align: center;
    color: red;
  }
</style>
