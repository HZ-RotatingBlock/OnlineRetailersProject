<template>
  <div id="app" @click="resetComponent">
    <div class="app-header">
      <div class="app-header-inner">
        <router-link to="/">
          <img src="./assets/logo.png">
        </router-link>
        <h1 class="header-title">VIEW.DATA</h1>
        <div class="header-nav">
          <ul class="nav-list">
            <li>{{ username }}</li>
            <li class="nav-pile" v-if="username !== ''">|</li>
            <li @click="quit" v-if="username !== ''">退出</li>
            <li @click="logClick" v-if="username === ''">登录</li>
            <li class="nav-pile">|</li>
            <li @click="regClick" v-if="username === ''">注册</li>
            <li class="nav-pile" v-if="username === ''">|</li>
            <li @click="aboutClick">关于</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="app-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="app-footer">
      <p>Copyright @ 2017 RotatingBlock ALL Rights Reserved</p>
    </div>
    <my-dialog :is-show="isShowLogDialog" @close="closeDialog('isShowLogDialog')">
      <log-form @has-log="onSuccessLog"></log-form>
    </my-dialog>
    <my-dialog :is-show="isShowRegDialog" @close="closeDialog('isShowRegDialog')">
      <reg-form @close="closeDialog('isShowRegDialog')"></reg-form>
    </my-dialog>
    <my-dialog :is-show="isShowAboutDialog" @close="closeDialog('isShowAboutDialog')">
      <img src="./assets/data.png" class="aboutLogo">
      <h2 style="margin: 0 auto 20px;text-align: center;font-size: 30px;font-weight: 700;">关于我们</h2>
      <p style="margin: 0 auto;padding-bottom: 30px;width: 80%;text-indent: 2em;font-size: 16px;line-height: 25px;">本报告在调研数据的基础上，采用定性与定量相结合的方式深入分析了专车市场发展的驱动因素与阻碍因素、专车市场背后的产业格局、专车企业的竞争格局、用户对专车市场的依赖程度、专车对其他交通工具运力的补充效应等，通过这五个章节的研究反映专车市场的发展态势和面临的问题。报告力求客观、深入、准确地反映中国专车市场发展情况，为政府、企事业单位和社会各界提供决策依据。 </p>
    </my-dialog>
  </div>
</template>

<script>
import MyDialog from '@/components/base/dialog'
import LogForm from '@/components/logform'
import RegForm from '@/components/regform'
import { eventBus } from '@/eventBus'
export default {
  data () {
    return {
      isShowLogDialog: false,
      isShowRegDialog: false,
      isShowAboutDialog: false,
      username: ''
    }
  },
  components: {
    MyDialog,
    LogForm,
    RegForm
  },
  methods: {
    logClick () {
      this.isShowLogDialog = true
    },
    regClick () {
      this.isShowRegDialog = true
    },
    aboutClick () {
      this.isShowAboutDialog = true
    },
    closeDialog (attr) {
      this[attr] = false
    },
    onSuccessLog (data) {
      this.closeDialog('isShowLogDialog')
      this.username = data.login.username
    },
    quit () {
      if (confirm('确定要退出吗？')) {
        this.$store.commit('updataLoginStatus', false)
        this.username = ''
      }
    },
    resetComponent () {
      eventBus.$emit('reset-component')
    }
  }
}
</script>

<style>
/* CSS reset */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
body {
  background: #f0f2f5;
  font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
  font-size: 14px;
  color: #444;
}
/* CSS reset finish */
.aboutLogo {
    display: block;
    width: 150px;
    margin: 10px auto 20px;
  }
#app {
  display: flex;
  flex-flow: column;
  min-width: 1200px;
  min-height: 100vh;
}
.app-header {
  width: 100%;
  height: 90px;
  line-height: 90px;
  color: #b2b2b2;
  background: #333333;
}
.app-header-inner {
  position: relative;
  margin: 0 auto;
  width: 1200px;
}
.header-logo {
  float: left;
}
.header-title {
  position: absolute;
  top: 0;
  left: 110px;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  line-height: 90px;
  color: #ffffff;
}
.app-header-inner img {
  position: absolute;
  left: 10px;
  width: 90px;
}
.header-nav {
  float: right;
}
.header-nav ul {
  overflow: hidden;
}
.header-nav li {
  float: left;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
}
.nav-pile {
  padding: 0 10px;
}
.app-content {
  flex: 1;
}
.app-footer {
  margin-top: 30px;
  width: 100%;
  height: 80px;
  font-weight: 700;
  text-align: center;
  line-height: 80px;
  color: #ffffff;
  background: #333;
  clear: both;
}
.container {
  margin: 0 auto;
  width: 1200px;
}
a:hover{
  color: #0073bc;
}
.hr {
  height: 1px;
  width: 100%;
  background: #ddd;
}
.button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  color: #ffffff;
  background: #333333;
  border-radius: 3px;
  transition: all .3s;
  cursor: pointer;
}
.login-form .button {
  display: block;
  margin: 0 auto;
  padding: 5px 10px;
  width: 80px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
}
.button:hover {
  color: #fff;
  box-shadow: 3px 3px 5px #000;
}
.g-form-line {
  position: relative;
  padding: 15px 0;
}
.g-form-label {
  position: absolute;
  top: 0;
  left: 50%;
  width: 90px;
  height: 42px;
  line-height: 42px;
  font-size: 16px;
  text-align: right;
  display: inline-block;
  transform: translateX(-191px)
}
.g-form-input {
  display: inline-block;
}
.g-form-input input {
  position: absolute;
  top: 0;
  left: 50%;
  height: 40px;
  width: 200px;
  font-size: 20px;
  line-height: 40px;
  vertical-align: middle;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  transform: translateX(-91px)
}
.g-form-btn {
  width: 100%;
}
.g-form-error {
  position: absolute;
  top: 0;
  right: 20px;
  width: 160px;
  font-size: 16px;
  line-height: 42px;
  text-align: left;
  color: red;
}
</style>
