// 数据分析模块
<template>
  <div class="sales-board">
      <div class="sales-board-intro">
        <h2>流量分析</h2>
        <p>是指在获得网站访问量基本数据的情况下对有关数据进行统计、分析，从中发现用户访问网站的规律，并将这些规律与网络营销策略等相结合，从而发现目前网络营销活动中可能存在的问题，并为进一步修正或重新制定网络营销策略提供依据。当然这样的定义是站在网络营销管理的角度来考虑的</p>
      </div>
      <div class="sales-board-form">
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  购买数量：
              </div>
              <div class="sales-board-line-right">
                <keep-alive>
                  <v-counter :min="20" :max="100" @on-change="onParamChange('buyNum',$event)"></v-counter>
                </keep-alive>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  产品类型：
              </div>
              <div class="sales-board-line-right">
                <keep-alive>
                  <v-selection :selections="productTypes" @on-change="onParamChange('buyType', $event)"></v-selection>
                </keep-alive>

              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  有效时间：
              </div>
              <div class="sales-board-line-right">
                <keep-alive>
                  <v-chooser :selections="periodList" @on-change="onParamChange('period', $event)"></v-chooser>
                </keep-alive>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  产品版本：
              </div>
              <div class="sales-board-line-right">
                <keep-alive>
                  <v-chooser :selections="versionList" @on-change="onParamChange('versions', $event)"></v-chooser>
                </keep-alive>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  总价：
              </div>
              <div class="sales-board-line-right">
                  {{ price }}元
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">&nbsp;</div>
              <div class="sales-board-line-right">
                  <div class="button" @click="showPayDialog">
                    立即购买
                  </div>
              </div>
          </div>
      </div>
      <div class="sales-board-des">
        <h2>产品说明</h2>
        <p>网站访问统计分析报告的基础数据源于网站流量统计信息，但其价值远高于原始数据资料。专业的网站访问统计分析报告对网络营销的价值，正如专业的财务分析报告对企业经营策略的价值。</p>

        <h3>用户行为指标</h3>
        <ul>
          <li>用户行为指标主要反映用户是如何来到网站的、在网站上停留了多长时间、访问了哪些页面等，主要的统计指标包括：</li>
          <li>用户在网站的停留时间；</li>
          <li>用户来源网站（也叫“引导网站”）；</li>
          <li>用户所使用的搜索引擎及其关键词；</li>
          <li>在不同时段的用户访问量情况等。</li>
        </ul>

        <h3>浏览网站方式</h3>
        <ul>
          <li>用户上网设备类型</li>
          <li>用户浏览器的名称和版本</li>
          <li>访问者电脑分辨率显示模式</li>
          <li>用户所使用的操作系统名称和版本</li>
          <li>用户所在地理区域分布状况等</li>
        </ul>
      </div>
      <my-dialog :is-show="isShowPayDialog" @close="hidePayDialog">
        <table class="buy-dialog-table">
          <tr>
            <th>购买数量</th>
            <th>产品类型</th>
            <th>有效时间</th>
            <th>产品版本</th>
            <th>总价</th>
          </tr>
          <tr>
            <td>{{ buyNum }}</td>
            <td>{{ buyType.label }}</td>
            <td>{{ period.label }}</td>
            <td>
              <span>{{ versions.label }}</span>
            </td>
            <td>{{ price }}</td>
          </tr>
        </table>
        <h3 class="buy-dialog-title">请选择银行</h3>
        <bank-chooser @on-change="onChangeBanks"></bank-chooser>
        <div class="button buy-dialog-btn" @click="confirmBuy">
          确认购买
        </div>
      </my-dialog>
      <my-dialog :is-show="isShowErrDialog" @close="hideErrDialog">
        支付失败！
      </my-dialog>
      <check-order :is-show-check-dialog="isShowCheckOrder" :order-id="orderId" @on-close-check-dialog="hideCheckOrder"></check-order>
  </div>
</template>

<script>
import MyDialog from '@/components/base/dialog'
import VSelection from '@/components/base/selection'
import VCounter from '@/components/base/counter'
import VChooser from '@/components/base/chooser'
import BankChooser from '@/components/bankChooser'
import CheckOrder from '@/components/checkOrder'
export default {
  data () {
    return {
      buyNum: 0,
      buyType: {},
      versions: {},
      period: {},
      productTypes: [{label: 'test', value: 0}],
      versionList: [{label: 'test', value: 0}],
      periodList: [{label: 'test', value: 0}],
      price: 0,
      isShowPayDialog: false,
      bankId: null,
      orderId: null,
      isShowCheckOrder: false,
      isShowErrDialog: false
    }
  },
  components: {
    MyDialog,
    VSelection,
    VCounter,
    VChooser,
    BankChooser,
    CheckOrder
  },
  methods: {
    onParamChange (attr, val) {
      this[attr] = val
      this.getPrice()
    },
    getPrice () {
      let passParams = {
        buyNumber: this.buyNum,
        buyType: this.buyType.value,
        period: this.period.value,
        version: this.versions
      }
      this.$axios.post('https://easy-mock.com/mock/5a27a82a7f2b435f137cfcc1/example/getPrice', passParams).then((res) => {
        this.price = res.data.getPrice.amount
      }).catch((err) => {
        console.log(err)
      })
    },
    showPayDialog () {
      if (this.$store.getters.getLoginStatus) {
        this.isShowPayDialog = true
      } else {
        alert('请先登录~')
      }
    },
    hidePayDialog () {
      this.isShowPayDialog = false
    },
    hideErrDialog () {
      this.isShowErrDialog = false
    },
    hideCheckOrder () {
      this.isShowCheckOrder = false
    },
    onChangeBanks (bankObj) {
      this.bankId = bankObj.id
    },
    confirmBuy () {
      let passParams = {
        buyNumber: this.buyNum,
        buyType: this.buyType.value,
        period: this.period.value,
        version: this.versions,
        bankId: this.bankId
      }
      this.$axios.get('https://easy-mock.com/mock/5a27a82a7f2b435f137cfcc1/example/bank', passParams).then((res) => {
        console.log('请求成功')
        this.orderId = res.data.createOrder.orderId
        this.isShowCheckOrder = true
        this.isShowPayDialog = false
      }).catch((err) => {
        this.isShowErrDialog = true
        console.log(err)
      })
    }
  },
  mounted () {
    this.$axios.get('https://easy-mock.com/mock/5a27a82a7f2b435f137cfcc1/example/originalPrice').then((res) => {
      this.price = res.data.getPrice.amount
    })
    this.$axios.get('https://easy-mock.com/mock/5a27a82a7f2b435f137cfcc1/example/analysis').then((res) => {
      this.productTypes = res.data.buyTypes
      this.versionList = res.data.versionList
      this.periodList = res.data.periodList
    }).then(() => {
      this.buyNun = 1
      this.buyType = this.productTypes[0]
      this.versions = this.versionList[0]
      this.period = this.periodList[0]
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .buy-dialog-title {
    font-size: 16px;
    font-weight: bold;
  }
  .buy-dialog-btn {
    display: block;
    margin: 20px auto;
    width: 100px;
    text-align: center;
  }
  .buy-dialog-table {
    width: 100%;
    margin-bottom: 20px;
  }
  .buy-dialog-table td,
  .buy-dialog-table th{
    border: 1px solid #e3e3e3;
    text-align: center;
    padding: 5px 0;
  }
  .buy-dialog-table th {
    background: #333333;
    color: #fff;
    border: 1px solid #333333;
  }
</style>
