<template>
  <div class="register">
    <img class="banner" src="../../assets/images/user_bg.png">
    <div class="main">
      <div class="btn-box">
        <button class="register-btn">注册</button>
        <button class="login-btn" @click="goPage('login')">登入</button>
      </div>
      <div class="title">电子邮箱注册</div>
      <div class="form">
        <div class="input-box">
          <input class="account" type="text" v-model="param.account" placeholder="请输入会员账号">
          <input class="password" type="password" v-model="param.password" placeholder="请输入密码">
        </div>
        <button :disabled="isDisabled" @click="register">注册</button>
        <div class="check-box">
          <div class="item mr25" @click="check(1)">
            <div :class="{check: !isCheckTerms, checked: isCheckTerms }"></div>
            <p>同意使用条款</p>
          </div>
          <div class="item" @click="check(2)">
            <div :class="{check: !isCheckPrivacy, checked: isCheckPrivacy }"></div>
            <p>同意隐私政策</p>
          </div>
        </div>
      </div>
      <div class="tips-box">
        <div class="line"></div>
        <!-- <p>用社群账号1秒完成会员注册</p> -->
        <div class="line"></div>
      </div>
      <!-- <div class="round-box">
        <div class="round"></div>
        <div class="round"></div>
        <div class="round"></div>
        <div class="round"></div>
        <div class="round"></div>
      </div> -->
    </div>
    <router-link class="footer" :to="{ name: 'resetPasswords'}" >若您忘记账号密码，请按【这里】</router-link>
  </div>
</template>

<script>
import { setToken } from '../../utils/auth';

export default {
  data() {
    return {
      isCheckTerms: false,
      isCheckPrivacy: true,
      isDisabled: false,
      param: {
        account: '',
        password: '',
      },
      fromPath: '',
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fromPath = from.path;
    });
  },
  methods: {
    goPage(page) {
      this.$router.push({ name: page });
    },
    check(type) {
      if (type === 1) {
        this.isCheckTerms = !this.isCheckTerms;
      } else {
        this.isCheckPrivacy = !this.isCheckPrivacy;
      }
    },
    register() {
      if (!this.isCheckTerms) {
        this.$toast('请同意使用条款');
        return;
      }
      if (!this.isCheckPrivacy) {
        this.$toast('同意隐私政策');
        return;
      }
      this.$api.user.register(this.param).then((res1) => {
        if (res1.code === 200) {
          this.$api.user.login(this.param).then((res) => {
            if (res.code === 200) {
              setToken(res.data.token);
              console.log(res.data);
              localStorage.setItem('nickName', res.data.nickName);
              localStorage.setItem('account', res.data.account);
              localStorage.setItem('coupon', res.data.coupon);
              localStorage.setItem('money', res.data.money);
              localStorage.setItem('id', res.data.id);
              localStorage.setItem('avator', res.data.avator);
              localStorage.setItem('token', res.data.token);
              if (this.fromPath === '/login') {
                this.$router.push({ path: 'mine' });
              } else {
                this.$router.go(-1);
              }
            } else {
              this.$toast(res.message);
            }
          });
        } else {
          this.$toast(res1.message);
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
  .register {
    font-size: 34px;
    position: relative;
    padding-bottom: 88px;
    .banner {
      width: 100%;
      height:196px;
    }
    .main {
      padding: 0 82px 0;
      .title {
        font-size: 38px;
        font-weight:500;
        text-align: center;
        margin-bottom: 40px;
      }
      .form {
        margin-bottom: 134px;
        .input-box {
          border: 1PX solid #DFDFDF;
          border-radius: 15px;
          margin-bottom: 42px;
          overflow: hidden;
          input::-webkit-input-placeholder {
            color: #CACACA;
            font-size: 28px;
          }
          input {
            width: 100%;
            text-indent: 28px;
            font-size: 28px;
            height: 86px;
            line-height: 86px;
          }
          .password {
            border-top: 1PX solid #DFDFDF;
            height: 85px;
            line-height: 85px;
          }
        }
        button {
          width: 100%;
          padding: 24px 0;
          border-radius: 40px;
          background-color: #FFCC00;
          &:disabled {
            background-color: #F7E59C;
          }
        }
        .check-box {
          margin-top: 35px;
          font-size: 23px;
          color: #D1D1D1;
          display: flex;
          justify-content: center;
          height: 40px;
          .mr25{
            margin-right: 25px;
          }
          .item {
            display: flex;
            align-items: center;
            justify-content: center;
            .check {
              width:20px;
              height:20px;
              border: 1PX solid #DDD;
              margin-right: 11px;
            }
            .checked {
              width:20px;
              height:20px;
              border: 1PX solid #FFCC00;
              background-color: #FFCC00;
              margin-right: 11px;
            }
          }
        }
      }
      // .tips-box {
      //   display: flex;
      //   align-items: center;
      //   justify-content: center;
      //   margin-bottom: 35px;
      //   .line {
      //     width: 100px;
      //     height: 1px;
      //     background-color: #D8D6D6;
      //   }
      //   p {
      //     margin: 0 10px;
      //     font-size: 26px;
      //     color: #D1D1D1;
      //   }
      // }
      .round-box {
        display: flex;
        justify-content: space-between;
        width: 436px;
        margin: 0 auto;
        .round {
          width:56px;
          height:56px;
          background:#DEDDDD;
          border-radius:50%;
        }
      }
      .btn-box {
        margin: 63px 0 98px;
        display: flex;
        justify-content: center;
        button {
          background-color: #fff;
          padding: 22px 0;
          font-weight:400;
          display: block;
        }
        .register-btn {
          width: 257px;
          background: #FFCC00;
          color: #000;
        }
        .login-btn {
          background: #B5B4B4;
          width: 267px;
          color: #fff;
        }
      }
    }
    .footer {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height:73px;
      line-height: 73px;
      text-align: center;
      font-size: 26px;
      font-weight: 400;
      color: #8B8989;
      background-color: #F8F8F8;
    }
  }
</style>
