<template>
<!-- 银行选择组件 -->
  <div class="chooser-component">
    <ul class="chooser-list">
      <li v-for="(item, index) in bankArr" @click="chosenSelection(index)" :title="item.label" :class="[item.name, {active: index === nowIndex}]"></li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nowIndex: 0,
      bankArr: []
    }
  },
  mounted () {
    this.$axios.get('https://easy-mock.com/mock/5a27a82a7f2b435f137cfcc1/example/bank').then((res) => {
      this.bankArr = res.data.banks
    })
  },
  methods: {
    chosenSelection (index) {
      this.nowIndex = index
      this.$emit('on-change', this.bankArr[index])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chooser-component {
  position: relative;
  display: inline-block;
}
.chooser-list li.active {
  border: 1px solid #333333;
  box-shadow: 2px 2px 5px #000000;
}
.chooser-list li {
    display: inline-block;
    width: 117px;
    height: 32px;
    background-image: url(../assets/banks/banks.png);
    background-repeat: no-repeat;
    margin: 19.6px;
    margin-right: 22px;
    border: 1px solid #e3e3e3;
    transition: all .3s;
    cursor: pointer;
}
.chooser-list li:nth-of-type(5n) {
  margin-right: 0;
}
.zhaoshang {
    background-position: -2160px 0;
}
.jianshe {
    background-position: -720px 0;
}
.pufa {
    background-position: -1800px 0;
}
.jiaotong {
    background-position: -3120px 0;
}
.minsheng {
    background-position: -2760px 0;
}
.pingan {
    background-position: -2400px 0;
}
.beijing {
    background-position: -960px 0;
}
.xingye {
    background-position: 0 0;
}
.shanghai {
    background-position: -1560px 0;
}
.guangfa {
    background-position: -840px 0;
}
.gongshang {
    background-position: -2640px 0;
}
.nongye {
    background-position: -1680px 0;
}
.guangda {
    background-position: -2280px 0;
}
.zhongguo {
    background-position: -2520px 0;
}
.zhongxin {
    background-position: -480px 0;
}
.chuxu {
    background-position: -120px 0;
}
.bnongshang {
    background-position: -1440px 0;
}
.huaxia {
    background-position: -2040px 0;
}
.snongshang {
    background-position: -2880px 0;
}

.baifubao {
    background-position: -1320px 0;
}
</style>
