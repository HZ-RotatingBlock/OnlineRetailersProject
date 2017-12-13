<template>
  <div class="order-wrap">
    <h3>您的产品</h3>
    <div class="order-list-choose">
      <div class="order-list-option">
        选择产品：
        <v-selection :selections="products" @on-change="productChange"></v-selection>
      </div>

      <div class="order-list-option">
        开始日期：
        <v-date-picker @on-change="changeStartDate"></v-date-picker>
      </div>

      <div class="order-list-option">
        结束日期：
        <v-date-picker @on-change="changeEndDate"></v-date-picker>
      </div>

      <div class="order-list-option">
        关键词：
        <input type="text" class="order-query" v-model.lazy="query">
      </div>
    </div>
    <div class="order-list-table">
      <table>
        <tr>
          <th v-for="head in tableHeads" @click="changeOrder(head)" :class="{active: head.active}">{{ head.label }}</th>
        </tr>
        <tr v-for="rows in tableData" v-if="listShow">
          <td v-for="item in rows">{{ item }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import VSelection from '@/components/base/selection'
import VDatePicker from '@/components/base/datepicker'
import _ from 'lodash'
export default {
  data () {
    return {
      listShow: true,
      query: '',
      productId: 0,
      products: [{label: 'test', value: 0}],
      tableHeads: [{label: 'test', value: 0}],
      // tableData: [{label: 'test', value: 0}],
      startDate: '',
      endDate: '',
      // 排序变量初始化
      currentOrder: 'desc'
    }
  },
  computed: {
    tableData () {
      return this.$store.getters.getOrderList
    }
  },
  components: {
    VSelection,
    VDatePicker
  },
  watch: {
    query () {
      this.getTableData()
    }
  },
  methods: {
    productChange (obj) {
      this.$store.commit('updataParams', {
        key: 'productId',
        val: obj.value
      })
      this.$store.dispatch('fetchOrderList')
      // this.productId = obj.value
      // this.getTableData()
    },
    changeStartDate (date) {
      this.$store.commit('updataParams', {
        key: 'startDate',
        val: date
      })
      this.$store.dispatch('fetchOrderList')
      // this.startDate = date
      // this.getTableData()
      // this.getList()
    },
    changeEndDate (date) {
      this.$store.commit('updataParams', {
        key: 'endDate',
        val: date
      })
      this.$store.dispatch('fetchOrderList')
      // this.endDate = date
      // this.getTableData()
      // this.getList()
    },
    changeOrder (headItem) {
      this.tableHeads.map((item) => {
        item.active = false
        return item
      })
      headItem.active = true
      if (this.currentOrder === 'asc') {
        this.currentOrder = 'desc'
      } else if (this.currentOrder === 'desc') {
        this.currentOrder = 'asc'
      }
      this.$store.commit('updataOrderList', _.orderBy(this.$store.getters.getOrderList, headItem.key, this.currentOrder))
    },
    getList () {
      this.$axios.get('https://easy-mock.com/mock/5a27a82a7f2b435f137cfcc1/example/orderList').then((res) => {
        this.products = res.data.products.slice(0)
        this.tableHeads = res.data.tableHeads.slice(0)
      }).catch((err) => {
        console.log(err)
      })
    },
    getTableData () {
      // let reqParam = {
      //   query: this.query,
      //   productId: this.productId,
      //   starDate: this.startDate,
      //   endDate: this.endDate
      // }
      // this.$axios.post('https://easy-mock.com/mock/5a27a82a7f2b435f137cfcc1/example/getOrderList', reqParam).then((res) => {
      //   this.tableData = res.data.getOrderList.list.slice(0)
      // }).catch((err) => {
      //   console.log(err)
      // })
      this.$store.dispatch('fetchOrderList')
    }
  },
  mounted () {
    this.getList()
    // this.getTableData()
    this.$store.dispatch('fetchOrderList')
    console.log(this.$store)
  }
}
</script>

<style scoped>
.order-wrap {
  width: 1200px;
  min-height: 800px;
  margin: 20px auto;
  overflow: hidden;
}
.order-wrap h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.order-query {
  height: 25px;
  line-height: 25px;
  border: 1px solid #e3e3e3;
  outline: none;
  text-indent: 10px;
}
.order-list-option {
  display: inline-block;
  padding-left: 15px;
}
.order-list-option:first-child {
  padding-left: 0;
}
.order-list-table {
  margin-top: 20px;
}
.order-list-table table {
  width: 100%;
  background: #fff;
}
.order-list-table td,
.order-list-table th {
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 10px 0;
}
.order-list-table th {
  background: #333333;
  color: #fff;
  border: 1px solid #333333;
  cursor: pointer;
}
.order-list-table tr:hover {
  color: #ffffff;
  background: rgba(51, 51, 51, .7);
  cursor: pointer;
}
.order-list-table th.active {
  background: #000000;
}
</style>
