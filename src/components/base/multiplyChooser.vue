<template>
<!-- 多选组件 -->
    <div class="chooser-component">
        <ul class="chooser-list">
          <li v-for="(item, index) in selections" @click="selectItem(index)" :class="{ active: checkIndex(index) }" :title="item.label">{{ item.label }}</li>
        </ul>
      </div>
    </div>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      nowIndexArr: [0]
    }
  },
  props: {
    selections: {
      type: Array,
      default: [
        {
          label: 'test',
          value: 0
        }
      ]
    }
  },
  methods: {
    selectItem (index) {
      if (this.nowIndexArr.indexOf(index) !== -1) {
        this.nowIndexArr.splice(this.nowIndexArr.indexOf(index), 1)
      } else if (this.nowIndexArr.indexOf(index) === -1) {
        this.nowIndexArr.push(index)
      }
      let nowObjectArray = _.map(this.nowIndexes, (idx) => {
        return this.selections[idx]
      })
      this.$emit('on-change', nowObjectArray)
    },
    checkIndex (index) {
      return this.nowIndexArr.indexOf(index) !== -1
    }
  }
}
</script>

<style scoped>
.chooser-component {
  position: relative;
  display: inline-block;
}
.chooser-list li{
  display: inline-block;
  border: 1px solid #e3e3e3;
  height: 25px;
  line-height: 25px;
  padding: 0 8px;
  margin-right: 5px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
}
.chooser-list li.active,
.chooser-list li:hover {
  border-color: #333333;
  background: #333333;
  color: #fff;
}
</style>
