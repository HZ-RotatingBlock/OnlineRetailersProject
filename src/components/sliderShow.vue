<template>
  <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
    <!-- 幻灯组件 -->
    <div class="slide-img">
      <router-link :to="slides[nowIndex].href">
        <transition name="slide-trans">
          <img v-if="isShow" :src="slides[nowIndex].src">
        </transition>
        <transition name="slide-trans-old">
          <img v-if="!isShow" :src="slides[nowIndex].src">
        </transition>
      </router-link>
      <!-- <a :href="slides[nowIndex].href"> -->
        <!-- <transition name="slide-trans">
          <img v-if="isShow" :src="slides[nowIndex].src">
        </transition>
        <transition name="slide-trans-old">
          <img v-if="!isShow" :src="slides[nowIndex].src">
        </transition> -->
      <!-- </a> -->
    </div>
    <h2 class="slide-title" style="color:#ffffff">{{ slides[nowIndex].title }}</h2>
    <!-- 指示器 -->
    <ul class="slide-pages">
      <li @click="goto(prevIndex)">&lt;</li>
      <li v-for="(item, index) in slides" @click="goto(index)">
        <a :class="{on: index === nowIndex}">{{ index + 1 }}</a>
      </li>
      <li @click="goto(nextIndex)">&gt;</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      default: []
    },
    inv: {
      type: Number,
      default: 5000
    }
  },
  data () {
    return {
      nowIndex: 0,
      isShow: true
    }
  },
  methods: {
    goto (index) {
      // isShow被设置为false时旧的transition向左消失
      this.isShow = false
      // 10ms后isShow又变回true，因此又有transition从右往左进入的效果同时nowIndex改变为新值，图片更新进入
      setTimeout(() => {
        this.isShow = true
        this.nowIndex = index
      }, 10)
    },
    runInv () {
      this.invId = setInterval(() => {
        this.goto(this.nextIndex)
      }, this.inv)
    },
    clearInv () {
      clearInterval(this.invId)
    }
  },
  computed: {
    prevIndex () {
      if (this.nowIndex === 0) {
        return this.slides.length - 1
      } else {
        return this.nowIndex - 1
      }
    },
    nextIndex () {
      if (this.nowIndex === this.slides.length - 1) {
        return 0
      } else {
        return this.nowIndex + 1
      }
    }
  },
  mounted () {
    this.runInv()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .slide-trans-enter-active {
    transition: all .5s;
  }
  .slide-trans-enter {
    transform: translateX(900px);
  }
  .slide-trans-old-leave-active {
    transition: all .5s;
    transform: translateX(-900px);
  }
  .slide-show {
    position: relative;
    margin: 15px 15px 15px 0;
    width: 900px;
    height: 500px;
    overflow: hidden;
  }
  .slide-show h2 {
    position: absolute;
    width: 100%;
    height: 100%;
    color: #fff;
    background: #333333;
    opacity: .5;
    bottom: 0;
    height: 30px;
    line-height: 30px;
    text-align: left;
    padding-left: 15px;
  }
  .slide-img {
    width: 100%;
  }
  .slide-img img {
    width: 100%;
    position: absolute;
    top: 0;
  }
  .slide-pages {
    position: absolute;
    bottom: 10px;
    right: 15px;
  }
  .slide-pages li {
    display: inline-block;
    position: relative;
    padding: 0 10px;
    color: #ffffff;
    cursor: pointer;
  }
  .slide-pages li a {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 15px;
    height: 15px;
    font-size: 12px;
    font-weight: 700;
    text-align: center;
    line-height: 15px;
    color: #ffffff;
    transition: all .5s;
    border-radius: 50%;
    background: #333333;
    transform: scale(1) translate(-50%, -80%);
  }
  .slide-pages li a:hover{
    transform: scale(1.2)  translate(-50%, -80%);
  }
  .slide-pages li .on{
    color: #333333;
    background: #ffffff;
    transform: scale(1.2)  translate(-50%, -80%);
  }
</style>
