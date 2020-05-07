<template>
  <div class="sign-in" v-if="show" @click="$emit('close')">
    <div class="content" @click.stop>
      <img @click="$emit('close')" class="close" src="../../assets/images/close.png">
      <div class="title">连续签到 1 天</div>
      <div class="vouchers">
        <div
          v-for="(item, i) in couponList"
          @click="tapTag(item, i)"
          :key="item.id">
          <div
            v-if="item.useType === 1"
            class="item"
            :class="{'item-bg' : !item.isHighlight , 'item-bg-active': item.isHighlight }">
            <div class="day">Day {{item.signDay}}</div>
            <div class="tag">指定券*{{item.couponNum}}</div>
            <img v-if="item.isCheck" class="check" src="../../assets/images/sign_in_checked.png">
          </div>
          <div
            v-else
            class="item-big"
            :class="{ 'item-big-bg': !item.isHighlight, 'item-big-bg-active' : item.isHighlight }">
            <div class="day">Day {{item.signDay}}</div>
            <div class="tag">限时全免券*{{item.couponNum}}</div>
            <img v-if="item.isCheck" class="check" src="../../assets/images/sign_in_checked.png">
          </div>
        </div>
      </div>
      <div class="tips">
        最多領取連續七天簽到獎勵,若中斷<br>
        或簽滿七天則重新開始
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['show'],
  data() {
    return {
      signParam: {
        toSignDay: undefined,
      },
      couponList: [],
    };
  },
  methods: {
    tapTag(item, i) {
      if (!item.isCheck && item.isHighlight) {
        console.log(i);
        // this.couponList[i].isCheck = !this.couponList[i].isCheck;
        this.signParam.toSignDay = item.signDay;
        this.sign();
      }
    },
    initSignList() {
      this.$api.common.getSignList().then((res) => {
        if (res.code === 200) {
          this.couponList = [];
          this.couponList = res.data;
          this.getContinueSignCount();
        }
      });
    },
    getContinueSignCount() {
      this.$api.user.getContinueSignCount().then((res) => {
        if (res.code === 200) {
          const temp = this.couponList;
          console.log(temp);
          const size = temp.length;
          let i;
          for (i = 0; i < size; i += 1) {
            let a;
            if (parseInt(res.data.cSignDay, 10) + 1 < parseInt(temp[i].signDay, 10)) {
              a = { ...temp[i], isHighlight: false };
            } else {
              a = { ...temp[i], isHighlight: true };
            }
            if (parseInt(res.data.cSignDay, 10) >= parseInt(temp[i].signDay, 10)) {
              a = { ...a, isCheck: true };
            } else {
              a = { ...a, isCheck: false };
            }
            this.couponList.splice(i, 1, a);
          }
        }
      });
    },
    sign() {
      this.$api.user.sign(this.signParam).then((res) => {
        if (res.code === 200) {
          const coupon = localStorage.getItem('coupon');
          localStorage.setItem('coupon', parseInt(coupon, 10) + 1);
          console.log(res.data);
          this.initSignList();
        } else {
          this.$toast(res.message);
        }
      });
    },
  },
  created() {
    this.initSignList();
  },
};
</script>

<style scoped lang="less">
  .sign-in {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
      width: 568px;
      background-color: #fff;
      position: relative;
      padding: 65px 44px 55px;
      border-radius: 36px;
      box-sizing: border-box;
      .close {
        position: absolute;
        top: 26px;
        right: 23px;
        width:43px;
        height:43px;
      }
      .title {
        font-weight:500;
        font-size: 43px;
        text-align: center;
        margin-bottom: 50px;
      }
      .vouchers {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .item {
          width:223px;
          height:137px;
        }
        .item-big {
          width:272px;
          height:137px;
        }
        .item, .item-big {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-weight: 500;
          position: relative;
          margin-bottom: 25px;

          .day {
            font-size:21px;
            margin-bottom: 10px;
          }
          .tag {
            padding-bottom: 6px;
            font-size:26px;
          }
          .check {
            position: absolute;
            right: -10px;
            bottom: -10px;
            width:42px;
            height:42px;
          }
        }
        .item-bg {
          background: url('../../assets/images/sign_in_type1_no.png')no-repeat;
          background-size: cover;
        }
        .item-bg-active {
          background: url('../../assets/images/sign_in_type1_yes.png')no-repeat;
          background-size: cover;
        }
        .item-big-bg {
          background: url('../../assets/images/sign_in_type2_no.png')no-repeat;
          background-size: cover;
        }
        .item-big-bg-active {
          background: url('../../assets/images/sign_in_type2_yes.png')no-repeat;
          background-size: cover;
        }
        .item-bg, .item-big-bg {
          .day, .tag {
            color: #fff;
          }
          .tag {
            // background-color: #ead68c;
          }
        }
        .item-bg-active, .item-big-bg-active {
          .day {
            color: #000;
          }
          .tag {
            // background-color: #FFAE00;
            color: #fff;
          }
        }
      }
      .tips {
        margin-top: 40px;
        line-height: 32px;
        font-size:24px;
        font-weight:500;
        color: #D0D0D0;
        text-align: center;
      }
    }
  }
</style>
