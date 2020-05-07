<template>
  <div class="reset">
    <div class="header">重设密码</div>
    <div class="form">
      <div class="item">
        <div class="title">账号</div>
        <input type="text" v-model="param.account" placeholder="请输入会员账号">
      </div>
      <div class="item">
        <div class="input-code">
          <div class="title">验证码</div>
          <input type="text" v-model="param.code" placeholder="请输入邮件验证码">
        </div>
        <div class="btn" @click="getCode">接收密码变更验证邮件</div>
      </div>
      <div class="item">
        <div class="title">新密码</div>
        <input type="text" v-model="param.newPassword" placeholder="请输入新密码">
      </div>
    </div>
    <button class="confirm" @click="resetPwd">确认</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDisabled: true,
      param: {
        account: '',
        code: '',
        newPassword: '',
        type: 'forgetPwd',
      },
    };
  },
  created() {

  },
  methods: {
    getCode() {
      this.$api.common.getCode(this.param).then((res) => {
        this.$toast(res.message);
      });
    },
    resetPwd() {
      this.$api.user.resetPwd(this.param).then((res) => {
        if (res.code === 200) {
          this.$router.push({ path: 'login' });
        }
        this.$toast(res.message);
      });
    },
  },
};
</script>

<style scoped lang="less">
  .reset {
    padding: 163px 50px 0;
    font-size: 34px;
    .header {
      font-size: 46px;
      font-weight:500;
      text-align: center;
      margin-bottom: 95px;
    }
    .form {
      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1PX solid #DFDFDF;
        padding: 30px 0;
        .title {
          flex: 0 0 108px;
          margin-right: 16px;
        }
        .input-code {
          display: flex;
          align-items: center;
        }
        .btn {
          font-size: 23px;
          font-weight: 400;
          color: #FFCC00;
          border: 1PX solid #FFCC00;
          padding: 13px 0;
          flex: 0 0 252px;
          text-align: center;
        }
        input {
          font-size: 28px;
          flex: 1;
          &::-webkit-input-placeholder {
            color: #CACACA;
            font-size: 26px;
          }
        }
      }
      .item:last-child {
        border-bottom: none;
      }
    }
    .confirm {
      background-color: #FFCC00;
      width: 585px;
      height: 81px;
      line-height: 81px;
      text-align: center;
      border-radius: 40px;
      margin: 86px auto 0;
      display: block;
      &:disabled {
        background-color: #F7E59C;
      }
    }
  }
</style>
