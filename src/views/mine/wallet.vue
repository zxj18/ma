<template>
  <div class="body">
  <div class="header" >
  <div class="wallet">
    <header-box :title="'充值'">
      <select-box :text="text" :list="list" @choose="choose"></select-box>
    </header-box>
    <div class="header">
      <div class="left">
        <p>点券余额</p>
        <h3>{{ this.money }}</h3>
      </div>
      <div class="right">
        <span class="detail" @click="toRecord">明细</span>
      </div>
    </div>
    <div class="list">
      <div class="list-header">
        <span>金额 （{{ this.text }}）</span>
        <span class="tl">基本点券 + 赠送点券</span>
      </div>
      <ul>
        <li v-for="(pkg, index) in rechargePkgList" :key="pkg.id" @click="tapPkg(pkg, index)">
          <div class="left">
            <img class="icon-buy" src="../../assets/images/buy_yes.png" alt v-if="pkg.select" />
            <img class="icon-buy" src="../../assets/images/buy_no.png" alt v-else />
            <span class="amount">{{ pkg.price }}</span>
          </div>
          <div class="right">
            <img class="icon-point" src="../../assets/images/icon_point.png" />
            <span class="point">{{ pkg.baseMoney }}</span>
            <span class="add-point" v-if="pkg.giveMoney">
              +
              <span>{{ pkg.giveMoney }}点券</span>
            </span>
          </div>
        </li>
      </ul>
    </div>
    <div class="paylist">
      <div class="title">请选择储值方式</div>
      <div class="type">
        <div class="card">
          <li visa v-for="item in getlist" :key="item.id">
            <img :src="item.iconUrl" @click="tapBuy(item.id)" />
          </li>
          <!--
          <span style="margin-right:90px;">
            <img class="visa" src="http://mtvideoimg.oss-cn-hongkong.aliyuncs.com/83aa2193515d48a8986f6e28bc862092.jpg" alt
               @click="tapBuy" />
          </span>
          <span style="margin-right:30px;">
            <img
              class="paypal"
              src="http://mtvideoimg.oss-cn-hongkong.aliyuncs.com/9f4e5068c35541a6820e60060a9709d4.jpg"
              alt
               @click="tapBuy"
            />
          </span> -->
        </div>
      </div>
    </div>
    <div class="notice">
      <div class="title">付款注意事项</div>
      <ul>
        <li>1.確認付款即視為已閱讀，瞭解並同意接受使用條款及隱私政策。</li>
        <li>2.成功付款後，點券將於30分鐘內匯入帳戶，若24小時後仍未到賬，請聯系客服査詢。</li>
        <li>3.隨各支付平臺規定之不同，如付款時產生手續費，由用戶自行負擔。</li>
        <li>
          4.網站有舉辦商品促銷及優惠變更之權利，購買即表示用戶同意以當前價格進行購買，事後不得任意要求退換／交換。
        </li>
        <li>5.詳細購買，使用及退款方法請參閱使用條款或聯絡客服。</li>
      </ul>
    </div>
    <div v-html="html"></div>
    <buy-chapter-popups
      v-if="isShowBuyPopup"
      :book="book"
      :selectRechargePkgId="selectRechargePkgId"
      :chapter="chapter"
      :typeId="typeIds"
      :pkgMoney="pkgMoney"
      :pkg="pkg"

      :bookSpeicalPrice="this.totalSpecialPrice"
      @select="buyPopupSelect"

    >
    </buy-chapter-popups>
    <div></div>
  </div>
  </div>
  </div>
</template>
<script>
import HeaderBox from '@/components/common/header.vue';
import SelectBox from '@/components/common/select-box.vue';
import BuyChapterPopups from '@/components/common/buy-chapter-popups.vue';

export default {
  method: 'get',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },

  data() {
    return {
      text: 'RMB',
      list: ['RMB'],
      rechargePkgList: [],
      getlist: [],
      typeIds: [],


      isShowFailPopup: false,
      isShowBuyPopup: false,
      isShowBuyPopups: false,
      money: localStorage.getItem('money'),
      pkg: '',
      pkgMoney: '',
      param: {
        type: 0,
      },
      payParams: {
        money: (Math.random() / 10).toFixed(2),
        recharge_package_id: '',
        payType: '2',
      },
      params: {
        cartoonId: this.$route.query.id,
        cartoonIds: '',
      },
      selectRechargePkgId: '',
      html: '',
    };
  },
  mounted() {},

  methods: {
    tapRecharge(text) {
      if (text === 1) {
        this.payParams.payType = '2';
      } else {
        this.payParams.payType = '3';
      }
      this.payParams.recharge_package_id = this.selectRechargePkgId;
      console.log(this.payParams.recharge_package_id);
      this.$api.order.pay(this.payParams).then((res) => {
        if (res.code === 200) {
          window.location.href = res.data.pay_url;
        }
      });
    },

    tapPkg(pkg, index) {
      for (let i = 0; i < this.rechargePkgList.length; i += 1) {
        this.rechargePkgList[i].select = index === i;
        if (index === i) {
          this.selectRechargePkgId = this.rechargePkgList[i].id;
          this.pkgMoney = this.rechargePkgList[i].price;
        }
      }
      this.pkg = pkg;
    },


    choose(val) {
      this.text = val;
      this.getRechargePkgList();
    },
    getRechargePkgList() {
      if (this.text === 'RMB') {
        this.param.type = 0;
      } else {
        this.param.type = 1;
      }
      this.rechargePkgList = [];
      this.$api.user.getRechargePkgList(this.param).then((res) => {
        if (res.code === 200) {
          const list = res.data;
          this.selectRechargePkgId = list[0].id;
          this.pkgMoney = list[0].price;
          for (let i = 0; i < list.length; i += 1) {
            this.rechargePkgList.push({ ...list[i], select: i === 0 });
          }
        }
      });
    },
    getpayTypeList() {
      // eslint-disable-next-line no-self-assign
      this.$api.payType.getpayTypeList().then((res) => {
        if (res.code === 200) {
          this.getlist = res.data;
        }
      });
    },

    toRecord() {
      this.$router.push({ path: 'record' });
    },


    tapBuy(typeId) {
      this.chapter = '';
      this.isShowBuyPopup = true;
      console.log(typeId);
      this.typeIds = typeId;
      // this.$emit('typeId', this.typeId);
    },
  },
  created() {
    this.getRechargePkgList();
    this.getpayTypeList();
  },
  components: {
    HeaderBox,
    SelectBox,
    BuyChapterPopups,
  },
};
</script>

<style scoped lang="less">
.wallet {
  .header {
    display: flex;
    justify-content: space-between;
    width: 750px;
    height: 202px;
    background: url('../../assets/images/bg_recharge.png') no-repeat;
    background-size: cover;
    align-items: center;
    .left {
      color: rgba(0, 0, 0, 1);
      margin-left: 51px;
      p {
        font-size: 26px;
        margin-bottom: 4px;
      }
      h3 {
        font-size: 82px;
        font-weight: bold;
      }
    }
    .right {
      margin-right: 67px;
      .detail {
        display: inline-block;
        background: url('../../assets/images/detail_btn.png') no-repeat;
        background-size: 100% 100%;
        font-size: 29px;
        color: rgba(0, 0, 0, 1);
        width: 181px;
        height: 65px;
        line-height: 65px;
        text-align: center;
      }
    }
  }
  .list {
    .list-header {
      display: flex;
      background: rgba(248, 248, 248, 1);
      width: 750px;
      font-size: 30px;
      color: rgba(35, 24, 21, 1);
      padding: 26px 68px 26px 51px;
      box-sizing: border-box;
      span {
        flex: 1;
      }
      .tl {
        text-align: right;
      }
    }
    ul {
      font-size: 34px;
      li {
        display: flex;
        height: 109px;
        align-items: center;
        border-bottom: 1px solid #e9e9e9;
        &:last-child {
          border-bottom: none;
        }
        div {
          flex: 1;
        }
      }
    }
    .left {
      margin-left: 50px;
      .icon-buy {
        width: 32px;
        height: 32px;
        vertical-align: middle;
        margin-right: 26px;
      }
      .amount {
        vertical-align: middle;
      }
    }
    .right {
      margin-left: 30px;
      .icon-point {
        width: 30px;
        height: 30px;
        vertical-align: middle;
        margin-right: 30px;
      }
      .point,
      .add-point {
        vertical-align: middle;
        span {
          vertical-align: middle;
          color: #ffd000;
        }
      }
    }
  }
  li{
    list-style: none;
  }
  .paylist {
    .title {
      background: rgba(248, 248, 248, 1);
      color: #231815;
      font-size: 30px;
      padding: 24px 0 27px 52px;
    }
    .type {
      padding: 54px 30px 33px;
      .visa {
        width: 143px;
        height: 46px;
        margin: 34px 0 0 37px;
      }
      .paypal {
        display: inline-block;
        width: 175px;
        height: 46px;
        margin: 37px 0 0 22px;
      }
      .unionpay {
        display: inline-block;
        width: 123px;
        height: 76px;
        margin: 20px 0 0 40px;
      }
      .applepay {
        display: inline-block;
        width: 140px;
        height: 66px;
        margin: 30px 0 0 40px;
      }
      .card {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      .card,
      .mobile {
        span {
          display: inline-block;
          width: 221px;
          height: 121px;
          background: url('../../assets/images/bg_pay.png') no-repeat;
          background-size: 100% 100%;
        }
      }
      .card,
      .mobile {
        .active {
          background: url('../../assets/images/bg_pay_chose.png') no-repeat;
          background-size: 100% 100%;
        }
      }
      .mobile {
        & > p {
          font-size: 27px;
          margin: 66px 0 28px;
          color: rgba(139, 137, 137, 1);
        }
      }
    }
  }
  .notice {
    .title {
      background: rgba(248, 248, 248, 1);
      color: #231815;
      font-size: 30px;
      padding: 24px 0 27px 45px;
    }
    ul {
      font-size: 28px;
      margin: 57px 47px;
      line-height: 1.5;
      li {
        margin-bottom: 46px;
      }
    }
  }
}
</style>
