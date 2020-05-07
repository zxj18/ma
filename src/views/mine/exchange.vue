<template>
  <div class="exchange">
    <header-box
      :title="'兑换点券'"
    ></header-box>
    <div class="banner">
      <vue-swiper :banner="this.banners" @bannerClick="bannerClick"/>
    </div>
    <div class="cash-box">
      <input type="text" placeholder="请输入兑换码" v-model="exchangeParam.code">
      <span @click="exchange"></span>
    </div>
    <div class="matter-list">
      <!-- <h3>点券兑换注意事项</h3>
      <ul>
        <li>1.内容详情内容详情内容详情内容详情内容详情</li>
        <li>1.内容详情内容详情内容详情内容详情内容详情</li>
        <li>1.内容详情内容详情内容详情内容详情内容详情</li>
        <li>1.内容详情内容详情内容详情内容详情内容详情</li>
        <li>1.内容详情内容详情内容详情内容详情内容详情</li>
        <li>1.内容详情内容详情内容详情内容详情内容详情</li>
        <li>1.内容详情内容详情内容详情内容详情内容详情</li>
      </ul> -->
    </div>
  </div>
</template>

<script>
import HeaderBox from '@/components/common/header.vue';
import VueSwiper from '@/components/common/vue-swiper.vue';

export default {
  data() {
    return {
      bannerParam: {
        type: 5,
      },
      banners: [],
      exchangeParam: {
        code: '',
      },
    };
  },
  methods: {
    exchange() {
      this.$api.user.exchangeCode(this.exchangeParam).then((res) => {
        this.$toast(res.message);
      });
    },
    initBanner(param) {
      this.$api.banner.list(param).then((res) => {
        if (res.code === 200) {
          this.banners = res.data;
        }
      });
    },
    bannerClick(banner) {
      this.$router.push({
        path: 'details',
        params: {
          id: banner.id,
        },
      });
    },
  },
  created() {
    this.initBanner(this.bannerParam);
  },
  components: {
    HeaderBox,
    VueSwiper,
  },
};
</script>

<style scoped lang="less">
.exchange {
  background: #F8F8F8;
  .banner {
    width: 750px;
    img {
      width: 100%;
      max-width: 100%;
      max-height: 196px;
    }
  }
  .cash-box {
    display: flex;
    height: 137px;
    align-items: center;
    input {
      font-size: 30px;
      color:rgba(139,137,137,1);
      width: 491px;
      height: 80px;
      margin:0 12px 0 27px;
      text-indent: 32px;
    }
    span {
      background: url('../../assets/images/exchange_btn.png')no-repeat;
      background-size: 100% 100%;
      width: 179px;
      height: 60px;
    }
  }
  .matter-list {
    background: #fff;
    padding: 85px 114px 0 42px;
    h3 {
      font-size: 30px;
      color: #231815;
      margin-bottom: 44px;
    }
    li {
      margin-bottom: 48px;
    }
  }
}
</style>
