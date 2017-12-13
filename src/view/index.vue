<template>
  <div class="index-wrap">
    <div class="index-left">
      <!-- 左上产品列表 -->
      <div class="index-left-block">
        <h2>全部产品</h2>
        <template v-for="product in productList">
          <h3>{{ product.title }}</h3>
          <ul>
            <li v-for="item in product.list">
              <router-link :to="item.url">{{ item.name }}</router-link>
              <!-- <a :href="item.url">{{ item.name }}</a> -->
              <span v-if="item.hot" class="hot-tag">HOT</span>
            </li>
          </ul>
          <div class="hr" v-if="!product.last"></div>
        </template>
      </div>
      <!-- 左下最新消息 -->
      <div class="index-left-block lastest-news">
        <h2>最新消息</h2>
        <ul>
          <li v-for="item in newsList">
            <a :href="item.url">{{ item.title}}</a>
            <span v-if="item.hot" class="hot-tag">HOT</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="index-right">
      <!-- 幻灯组件 -->
      <keep-alive>
        <slider-show :slides="slides" :inv="invTime"></slider-show>
      </keep-alive>
      <!-- 右下宣传 -->
      <div class="index-board-item"
      v-for="(item, index) in boardList"
      :class="[{'line-last' : index % 2 !== 0},'index-board-' + item.id]">
        <div class="index-board-item-inner">
          <h2>{{ item.title }}</h2>
          <p>{{ item.description}}</p>
          <div class="index-board-button">
            <router-link :to="'detail/' + item.toKey" class="button">立即购买</router-link>
            <!-- <a href="#" class="button">立即购买</a> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SliderShow from '@/components/sliderShow'

export default {
  data () {
    return {
      invTime: 3000,
      newsList: [],
      boardList: [],
      productList: null,
      slides: [
        {
          src: require('@/assets/images/slideShow/pic1.jpg'),
          title: '数据统计',
          href: 'detail/count'
        },
        {
          src: require('@/assets/images/slideShow/pic2.jpg'),
          title: '数据预测',
          href: 'detail/forecast'
        },
        {
          src: require('@/assets/images/slideShow/pic3.jpg'),
          title: '流量分析',
          href: 'detail/analysis'
        },
        {
          src: require('@/assets/images/slideShow/pic4.jpg'),
          title: '广告发布',
          href: 'detail/publish'
        }
      ]
    }
  },
  components: {
    SliderShow
  },
  created () {
    this.$axios.get('https://easy-mock.com/mock/5a27a82a7f2b435f137cfcc1/example/indexBorderList').then((res) => {
      this.newsList = res.data.newsList.slice(0)
      this.boardList = res.data.boardList.slice(0)
      this.productList = res.data.productList
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  .index-wrap {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }
  .index-left {
    float: left;
    width: 300px;
    text-align: left;
  }
  .index-right {
    float: left;
    width: 900px;
  }
  .index-left-block {
    margin: 15px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
  }
  .index-left-block .hr {
    margin-bottom: 20px;
    width: 100%;
    height: 3px;
    background: #f0f2f5;
  }
  .index-left-block h2 {
    background: #333333;
    color: #fff;
    padding: 10px 15px;
    margin-bottom: 20px;
  }
  .index-left-block h3 {
    padding: 0 15px 5px 15px;
    font-weight: bold;
    color: #222;
  }
  .index-left-block ul {
    padding: 10px 15px;
  }
  .index-left-block li {
    padding: 5px 5px 5px 10px;
  }
  .index-board-list {
    overflow: hidden;
  }
  .index-board-item {
    float: left;
    width: 400px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
    padding: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
  }
  .index-board-item-inner {
    margin-top: 20px;
    margin-left: 20px;
    padding-left: 120px;
    min-height: 125px;
  }
  .index-board-car .index-board-item-inner{
    background: url(../assets/images/1.png) no-repeat;
  }
  .index-board-loud .index-board-item-inner{
    background: url(../assets/images/2.png) no-repeat;
  }
  .index-board-earth .index-board-item-inner{
    background: url(../assets/images/3.png) no-repeat;
  }
  .index-board-hill .index-board-item-inner{
    background: url(../assets/images/4.png) no-repeat;
  }
  .index-board-item h2 {
    font-size: 18px;
    font-weight: bold;
    color: #000;
    margin-bottom: 15px;
  }
  .line-last {
    margin-right: 0;
  }
  .lastest-news {
    min-height: 512px;
  }
  .lastest-news li {
    margin-bottom: 10px;
  }
  .lastest-news a {
    display: inline-block;
    width: 190px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

  }
  .hot-tag {
    display: inline-block;
    padding: 1px;
    font-size: 12px;
    color: #fff;
    background: #cc0033;
    transform: rotateZ(0deg);
    animation: hot_shake 1s ease-in-out infinite;
  }
  @keyframes hot_shake {
    from {
      transform: scale3d(1, 1, 1);
    }

    10%, 20% {
      transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
    }

    30%, 50%, 70%, 90% {
      transform: scale3d(1.05, 1.05, 1.05) rotate3d(0, 0, 1, 3deg);
    }

    40%, 60%, 80% {
      transform: scale3d(1.05, 1.05, 1.05) rotate3d(0, 0, 1, -3deg);
    }

    to {
      transform: scale3d(1, 1, 1);
    }
  }

  .new-item {
    display: inline-block;
    width: 230px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
