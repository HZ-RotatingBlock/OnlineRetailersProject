<template>
  <!-- 弹窗组件 -->
  <transition name="drop">
    <div class="dialog-wrap" v-if="isShow">
      <div class="dialog-cover" @click="dialogClose"></div>
      <div class="dialog-content">
        <p class="dialog-close" @click="dialogClose">X</p>
        <slot>empty</slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    dialogClose () {
      this.$emit('close')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .drop-enter-active, .drop-leave-active {
    transition: all .5s ease;
  }
  /* .drop-leave-active {
    transition: all .3s ease;
  } */
  .drop-enter, .drop-leave-active {
    opacity: 0;
    /* transform: translateY(-500px) */
  }

  .dialog-wrap {
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .dialog-cover {
    z-index: 5;
    opacity: .3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #333333;
  }
  .dialog-content {
    overflow: auto;
    z-index: 10;
    position: fixed;
    top: 20%;
    left: 50%;
    margin-left: -25%;
    padding: 2%;
    width: 800px;
    max-height: 100%;
    font-size: 14px;
    line-height: 1.6;
    background: #ffffff;
    border: 2px solid #333333;
    border-radius: 3px;
    box-shadow: 3px 3px 10px #000000;
  }
  .dialog-close {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
    text-align: center;
    transition: all .3s;
    cursor: pointer;
  }
  .dialog-close:hover {
    transform: rotate(360deg);
    color: #4fc08d;
  }
</style>
