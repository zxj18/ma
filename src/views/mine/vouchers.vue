<template>
  <div class="vouchers">
    <header-box
      :title="'免费观看券'"
    ></header-box>
    <div class="tabs">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{active: index === tabI}"
        @click="tapTab(index)">{{tab}}</div>
    </div>
    <div class="type-list" v-if="tabI === 0">
      <select-box
            :text="text"
            :list="list"
            @choose="choose"
      ></select-box>
      <select-box
            :text="text1"
            :list="list1"
            @choose="choose1"
      ></select-box>
    </div>
    <ul class="list">
      <li :class="(coupon.useType === 1) ? 'bgAssign':'bgFree'" v-for="coupon in couponList" :key="coupon.id">
        <span class="type">{{coupon.useType === 1 ? '指定券' : '全免券'}}</span>
        <div class="content">
          <div class="left">
            <p class="name">{{coupon.name}}</p>
            <p class="scope">适用范围：《{{coupon.cartoonTitle}}》</p>
            <p class="scope" style="margin-top: 5px" v-if="coupon.useType === 1">第{{coupon.sEpisode}}话至第{{coupon.eEpisode}}话</p>
            <p class="use-date">使用期限：{{coupon.sTime.substring(0,10)}}-{{coupon.eTime.substring(0,10)}}</p>
          </div>
          <div class="right">
            <span class="use" v-if="coupon.status === 0" @click="userCoupon(coupon)">立即使用</span>
            <span class="used" v-if="coupon.status === 1">已使用</span>
            <span class="overdue" v-if="coupon.status === 2">已过期</span>
          </div>
        </div>
      </li>
    </ul>
    <attention
      :show="isAttention"
      @close="closeAttention"
      @yes="setAdult">
    </attention>
  </div>
</template>

<script>
/*eslint-disable*/
import HeaderBox from '@/components/common/header.vue';
import SelectBox from '@/components/common/select-box.vue';
import Attention from '@/components/home/attention.vue';
import {getAdult, setAdult} from "../../utils/auth";

export default {
  data() {
    return {
      tabs: [],
      tabI: 0,
      text: '类型',
      list: ['全部', '全免券', '指定券'],
      text1: '状态',
      list1: ['全部', '新到', '快过期'],
      couponList: [],
      param: {
        useType: undefined,
        status: 0,
        pageNum: 1,
        pageSize: 100,
      },
      useCouponParam: {
        couponId: '',
      },
      cartoonParams: {
        cartoonId: '',
      },
      listParams: {
        cartoonId: '',
        pageNum: 1,
        pageSize: 500,
      },
      isAdult: false,
      isAttention: false,
      coupon:'',
    };
  },
  methods: {
    closeAttention() {
      this.isAttention = false;
      this.isAdult = false;
    },
    setAdult() {
      this.isAttention = false;
      setAdult();
      this.initData();
      if (this.coupon){
        this.goToCartoon(this.coupon);
      }
    },
    choose(val,index) {
      this.text = val;
      if (index === 0){
        this.param.useType = undefined;
      } else if (index === 1) {
        this.param.useType = 0;
      } else if (index === 2) {
        this.param.useType = 1;
      }
      this.getUserCoupon(this.tabI);
    },
    choose1(val) {
      this.text1 = val;
    },
    tapTab(i) {
      this.tabI = i;
      this.getUserCoupon(this.tabI);
    },
    getUserCouponStatics() {
      this.$api.user.getUserCouponStatics().then((res) => {
        if (res.code === 200) {
          const list = res.data;
          this.tabs.push('待使用 '+list.unUse);
          this.tabs.push('已使用 '+list.used);
          this.tabs.push('已过期 '+list.expired);
        }
      });
    },
    outTime(date1){
      var oDate1 = new Date();
      var oDate2 = new Date(date1);
      if(oDate1.getTime() > oDate2.getTime()){//转换成毫秒进行比较
        return true;
      } else {
        return false;
      }
    },
    userCoupon(coupon){
      this.coupon = coupon;
      const time = coupon.eTime;
      if (this.outTime(time)){
        this.$toast('观看券已过期');
        return;
      }
      console.log(this.isAdult);
      if (coupon.isAdult === '1' && !this.isAdult){
        this.isAttention = true;
        return;
      }
      this.goToCartoon(coupon);
    },
    goToCartoon(coupon) {
      this.useCouponParam.couponId = coupon.id;
      this.$api.user.useCoupon(this.useCouponParam).then((res) => {
        if (res.code === 200) {
          console.log(res.data);
          this.cartoonParams.cartoonId = coupon.cartoonId;
          this.listParams.cartoonId = coupon.cartoonId;
          this.$api.cartoon.getCartoonContentsList(this.listParams).then((res) => {
            if (res.code === 200) {
              let totalSpecialPrice = res.data.totalSpecialPrice;
              this.$router.push({
                name: 'content',
                query: {
                  cartoonId: coupon.cartoonId,
                  episode: coupon.sEpisode,
                  bookName: coupon.cartoonTitle,
                  totalepisode: res.data.content.length,
                  bookSpeicalPrice: totalSpecialPrice,
                },
              });
            }
          });
        }else{
          this.$toast(res.message);
        }
      });
    },
    getUserCoupon(status) {
      this.param.status = status;
      this.$api.user.getUserCoupon(this.param).then((res) => {
        if (res.code === 200) {
          console.log(res.data);
          this.couponList = res.data.content;
        }
      });
    },
    initData() {
      this.isAdult = getAdult() === '1';
    },
  },
  created() {
    this.initData();
    this.getUserCouponStatics();
    this.getUserCoupon(0);
  },
  components: {
    HeaderBox,
    SelectBox,
    Attention,
  },
};
</script>

<style scoped lang="less">
.vouchers {
  .tabs {
    font-size: 30px;
    display: flex;
    justify-content: space-between;
    padding: 28px 50px;
    border-bottom: 1PX solid #F1F1F1;
  }
  .active {
    color: #FFC655;
    font-weight: bold;
  }
  .type-list {
    display: flex;
    padding: 34px 34px 0 0;
    justify-content: flex-end;
    .select-box {
      margin-left: 44px;
    }
  }
  .list {
    padding-top: 34px;
    li {
      position: relative;
      width: 682px;
      height: 271px;
      margin: 0 auto 22px;
      &.bgFree {
        background: url('../../assets/images/free_voucher.png') no-repeat;
        background-size: cover;
      }
      &.bgAssign {
        background: url('../../assets/images/assign_voucher.png') no-repeat;
        background-size: cover;
      }
      .type {
        position: absolute;
        font-size: 12PX;
        color: #fff;
        text-align: center;
        width: 131px;
        height: 32px;
        line-height: 32px;
        left: 0;
        top: 0;
        font-weight:bold;
      }
    }
  }

  .content {
    display: flex;
    height: 100%;
    color: #fff;
    justify-content: space-between;

    .left {
      position: relative;
      width: 100%;
      height: 168px;
      margin: 67px 0 0 37px;

      .name {
        font-size: 41px;
        margin-bottom: 14px;
      }

      .scope {
        font-size: 26px;
      }

      .use-date {
        position: absolute;
        bottom: 0;
        font-size: 22px;
      }
    }

    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 46px;

      span {
        display: inline-block;
        width: 160px;
        height: 57px;
        line-height: 57px;
        color: #fff;
        font-size: 25px;
        text-align: center;
      }

      .use {
        background: url('../../assets/images/use_btn.png') no-repeat;
        background-size: 100% 100%;
        color: #FF7800;
      }

      .overdue {
        background: url('../../assets/images/overdue_btn.png') no-repeat;
        background-size: 100% 100%;
      }

      .used {
        background: url('../../assets/images/used_btn.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
