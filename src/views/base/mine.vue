<template>
  <div class="mine">
    <div class="header">
      <div class="info" v-if="this.userInfo.token">
        <div>
          <p class="name" v-if="this.userInfo.nickName">{{this.userInfo.nickName}}</p>
          <p class="name" v-else>{{this.userInfo.account}}</p>
          <p class="id">ID: {{this.userInfo.id}} </p>
        </div>
        <img class="avatar" src="../../assets/images/default_avatar.png">
      </div>
      <div class="btn-box" v-else>
        <div class="cont">
          <router-link :to="{ name: 'login' }">登入</router-link>
          <div class="division">/</div>
          <router-link :to="{ name: 'register' }">注册</router-link>
        </div>
      </div>
    </div>
    <div class="tabs">
      <div class="tab tab-left" @click="goPage('wallet')">
        <div class="tab-info">
          <img class="tab-icon1" src="../../assets/images/mine_tab1.png">
          <div>
            <p class="tab-title">钱包</p>
            <p class="num" v-if="this.userInfo.token" >{{this.userInfo.money}}</p>
          </div>
        </div>
        <img class="tab-arrow" src="../../assets/images/mine_tab_arrow.png">
      </div>
      <div class="tab tab-right" @click="goPage('vouchers')">
        <div class="tab-info">
          <img class="tab-icon2" src="../../assets/images/mine_tab2.png">
          <div>
            <p class="tab-title">免费观看券</p>
            <p class="num" v-if="this.userInfo.token" >{{this.userInfo.coupon}}张</p>
          </div>
        </div>
        <img class="tab-arrow" src="../../assets/images/mine_tab_arrow.png">
      </div>
    </div>
    <div class="cell-box">
      <div  @click="goPage('userInfo')">
        <div class="cell">
          <div class="cell-left">
            <img class="cell-icon1" src="../../assets/images/mine_icon1.png">
            <p>个人资料</p>
          </div>
          <div class="cell-right">
            <img class="arrow" src="../../assets/images/arrow.png">
          </div>
        </div>
      </div>
      <div  @click="goPage('message')">
        <div class="cell">
          <div class="cell-left">
            <img class="cell-icon2" src="../../assets/images/mine_icon2.png">
            <p>消息</p>
          </div>
          <div class="cell-right">
              <div class="tag" v-if="this.messageCount>0">{{this.messageCount}}</div>
              <img class="arrow" src="../../assets/images/arrow.png">
          </div>
        </div>
      </div>
      <div  @click="goPage('exchange')">
        <div class="cell">
          <div class="cell-left">
            <img class="cell-icon3" src="../../assets/images/mine_icon3.png">
            <p>兑换点券</p>
          </div>
          <div class="cell-right">
            <img class="arrow" src="../../assets/images/arrow.png">
          </div>
        </div>
      </div>
      <router-link :to="{ name: 'serviceCenter' }">
        <div class="cell">
          <div class="cell-left">
            <img class="cell-icon4" src="../../assets/images/mine_icon4.png">
            <p>客服中心</p>
          </div>
          <div class="cell-right">
            <img class="arrow" src="../../assets/images/arrow.png">
          </div>
        </div>
      </router-link>
      <router-link :to="{ name: 'about' }">
        <div class="cell">
          <div class="cell-left">
            <img class="cell-icon5" src="../../assets/images/mine_icon5.png">
            <p>关于我们</p>
          </div>
          <div class="cell-right">
            <img class="arrow" src="../../assets/images/arrow.png">
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { getToken } from '../../utils/auth';

export default {
  data() {
    return {
      userInfo: {
        nickName: localStorage.getItem('nickName'),
        account: localStorage.getItem('account'),
        coupon: localStorage.getItem('coupon'),
        money: localStorage.getItem('money'),
        id: localStorage.getItem('id'),
        avator: localStorage.getItem('avator'),
        token: localStorage.getItem('token'),
      },
      messageCount: '',

    };
  },
  methods: {
    goPage(page) {
      if (this.token()) {
        this.$router.push({ name: page });
      } else {
        this.$router.push({ name: 'login' });
      }
    },
    getUnReadCount() {
      if (this.token()) {
        this.$api.message.getUnReadCount().then((res) => {
          if (res.code === 200) {
            this.messageCount = res.data;
          }
        });
      }
    },
    getUserInfo() {
      if (this.token()) {
        this.$api.user.getInfo().then((res) => {
          if (res.code === 200) {
            localStorage.setItem('nickName', res.data.nickName);
            localStorage.setItem('account', res.data.account);
            localStorage.setItem('coupon', res.data.coupon);
            localStorage.setItem('money', res.data.money);
            localStorage.setItem('id', res.data.id);
            localStorage.setItem('avator', res.data.avator);
            localStorage.setItem('token', res.data.token);
            this.userInfo = res.data;
            // console.log(this.userInfo);
          }
        });
      }
    },
    token() {
      return getToken();
    },
    // hasLogin() {
    //   const token = getToken();
    //   return !token;
    //   return false;
    // },
  },
  mounted() {
  },
  created() {
    this.getUnReadCount();
    this.getUserInfo();
  },
};
</script>

<style scoped lang="less">
  .mine {
    font-size: 32px;
    .header {
      width: 100%;
      height: 380px;
      background: url('../../assets/images/mine_bg.png')no-repeat;
      background-size: cover;
      .btn-box {
        width: 334px;
        height:82px;
        padding-top: 116px;
        margin: 0 auto;
        box-shadow: 0px 4px 6px 0px rgba(255,198,0,0.51);
        font-size: 38px;
        font-weight: 500;
        .cont {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          border-radius: 24PX;
          overflow: hidden;
          .division {
            margin: 0 10px;
          }
        }
      }
      .info {
        padding: 78px 81px 0 31px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name {
          width: 460px;
          min-height:100px;
          font-size: 49px;
          font-weight: 500;
          // margin-bottom: 33px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .id {
          font-size: 27px;
          font-weight: 400;
        }

        img {
          width: 148px;
          height: 148px;
          border-radius: 50%;
        }
      }
    }
    .tabs {
      margin: -82px 40px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      box-shadow:0px 9px 24px 0px rgba(14,5,10,0.09);
      height: 164px;
      font-size:30px;
      font-weight: 400;
      .tab-left {
        border-right: 1PX solid #DADADA;
        padding: 0 21px 0 45px;
      }
      .tab-right {
        padding: 0 17px 0 31px;
      }
      .tab {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .tab-info {
          display: flex;
          align-items: center;
          .tab-icon1 {
            width:55px;
            height:46px;
            margin-right: 30px;
          }
          .tab-icon2 {
            width:60px;
            height:47px;
            margin-right: 30px;
          }
          .num {
            margin-top: 22px;
          }
        }
        .tab-arrow {
          width: 14px;
          height: 23px;
        }
      }
    }
    .cell-box {
      padding-left: 45px;
      margin-top: 42px;
      color: #333;
      .cell {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 38px 0 38px 4px;
        border-bottom: 1PX solid #E9E9E9;
        .cell-left {
          display: flex;
          align-items: center;
          img {
            margin-right: 16px;
            width:40px;
          }
          .cell-icon1 {
            width:40px;
            height:31px;
          }
          .cell-icon2 {
            width:38px;
            height:35px;
          }
          .cell-icon3 {
            width:35px;
            height:32px;
          }
          .cell-icon4 {
            width:35px;
            height:32px;
          }
          .cell-icon5 {
            width:38px;
            height:31px;
          }
        }
        .cell-right {
          display: flex;
          align-items: center;
          margin-right: 43px;
          .tag {
            width: 30px;
            font-size: 18px;
            font-weight: 500;
            color: #fff;
            padding: 0 12px;
            height: 30px;
            line-height: 30px;
            background: url('../../assets/images/message_tag.png')no-repeat;
            background-size: contain;
            text-align: center;
          }
          .arrow {
            width:14px;
            height:23px;
            margin-left: 16px;
          }
        }
      }
    }
  }
</style>
