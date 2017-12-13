<template>
<!-- 支付结果组件 -->
  <div>
    <my-dialog :is-show="isShowCheckDialog" @close="checkStatus">
      请检查你的支付状态！
      <div class="button" @click="checkStatus">
        支付成功
      </div>
      <div class="button" @click="checkStatus">
        支付失败
      </div>
    </my-dialog>
    <my-dialog :is-show="isShowSuccessDialog" @close="toOrderList">
      购买成功！
    </my-dialog>
    <my-dialog :is-show="isShowFailDialog" @close="toOrderList">
      购买失败！
    </my-dialog>
  </div>
</template>

<script>
import MyDialog from './base/dialog'
export default {
  props: {
    isShowCheckDialog: {
      type: Boolean,
      default: false
    },
    order_id: {
      type: [String, Number]
    }
  },
  data () {
    return {
      isShowSuccessDialog: false,
      isShowFailDialog: false
    }
  },
  components: {
    MyDialog
  },
  methods: {
    checkStatus () {
      this.$axios.post('https://easy-mock.com/mock/5a27a82a7f2b435f137cfcc1/example/createOrder', {
        orderId: this.order_id
      }).then((res) => {
        this.isShowSuccessDialog = true
        this.$emit('on-close-check-dialog')
      }).catch((err) => {
        this.isShowFailDialog = true
        this.$emit('on-close-check-dialog')
        console.log(err)
      })
    },
    toOrderList () {
      this.isShowSuccessDialog = false
      this.isShowFailDialog = false
      this.$router.push({path: '/orderList'})
      console.log(this.$router)
      console.log(this.$route)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
