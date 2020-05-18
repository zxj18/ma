<template>
  <confirm>
    <ul class="conn">
      <li v-for="item in getlist" :key="item.id">
        <button @click="tapRecharge(item.id)">{{ item.show_name }}</button>
      </li>
    </ul>
  </confirm>
</template>

<script>
/*eslint-disable*/
import Confirm from '@/components/common/confirm.vue';

export default {
  props: ['typeId', 'selectRechargePkgId','pkgMoney'],
  data() {
    return {
      getlist: [],
      getPawList: [],
      payParams: {
        //money: (Math.random() / 10).toFixed(2),
        money: this.pkgMoney,
        recharge_package_id: '',
        payType: '2'
      }
      // params: {
      //   typeId: this.$route.query.id
      // }
    };
  },
  methods: {
    tapRecharge(payWayIds) {
      console.log(payWayIds);
      // if (text === 1) {
      //   this.payParams.payType = "2";
      // } else {
      //   this.payParams.payType = "3";
      // }
      this.payParams.recharge_package_id = this.selectRechargePkgId;
      this.payParams.payWayId = payWayIds;
      console.log(this.payParams.recharge_package_id);
      this.$api.order.pay(this.payParams).then(res => {
        if (res.code === 200) {
          window.location.href = res.data.pay_url;
        }
      });
    },

    getpayWayList() {
      this.$api.payWay.getpayWayList({ typeId: this.typeId }).then(res => {
        if (res.code === 200) {
          this.getlist = res.data;
        }
      });
    }
  },
  created() {
    this.getpayWayList();
  },
  watch: {
    typeId() {
      this.getpayWayList();
    }
  },
  components: {
    Confirm
  }
};
</script>

<style scoped lang="less">
.conn li button {
  width: 492px;
  height: 78px;
  background: rgba(255, 204, 0, 1);
  margin-top: 40px;
  border-radius: 50px;
}
.buy-popus {
  font-size: 35px;
  .title {
    font-weight: 500;
    font-size: 43px;
    color: #231815;
    text-align: center;
    margin-bottom: 70px;
  }
  .cont {
    padding: 0 20px;
    .item {
      &:last-child {
        margin-bottom: 0;
      }
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 40px;
      .info {
        display: flex;
        align-items: center;
      }
      .buy-btn {
        padding: 6px 0;
        width: 166px;
        text-align: center;
        border-radius: 30px;
        background-color: #fff;
        font-size: 22px;
        color: #ffd000;
        border: 1px solid #ffd000;
      }
      .check {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1px solid #e5e5e5;
        margin-right: 35px;
      }
      .checked {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1px solid #e5e5e5;
        margin-right: 35px;
        position: relative;
        &::after {
          content: '';
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #ffd000;
          position: absolute;
          top: 4px;
          left: 4px;
        }
      }
    }
  }
}
</style>
