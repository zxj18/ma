<template>
<div class="mailVerify">
  <header-box></header-box>
  <p class="title">邮箱验证</p>
  <div class="input-box">
    <div class="mail">邮箱<input placeholder="请输入您的邮箱"></div>
    <div class="verify-code">验证码<input placeholder="请输入邮箱验证码"><span class="btn">接收密码变更验证邮箱</span></div>
  </div>
  <p class="pay-btn">
    <button>充值</button>
  </p>
</div>
</template>

<script>
import HeaderBox from '@/components/common/header.vue';

export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    HeaderBox,
  },
};
</script>

<style scoped lang="less">
.mailVerify {
    .title {
        font-size: 46px;
        font-weight: 500;
        color: rgba(0,0,0,1);
        text-align: center;
        margin: 69px 0 124px;
    }
    .input-box {
        display: flex;
        padding: 0 70px;
        flex-direction: column;
        div {
            font-size: 34px;
            color: #000;
            padding: 28px 0;
            border-bottom: 1px solid rgba(223,223,223,1);
            input::-webkit-input-placeholder {
                color: #CACACA;
                font-size: 26px;
            }
        }
        input {
          height: 25px;
          line-height: 25px;
        }
        .mail {
            input {
                margin-left: 71px;
            }
        }
        .verify-code {
            position: relative;
            input {
                width: 220px;
                margin-left: 38px;
            }
            .btn {
                position: absolute;
                display: inline-block;
                padding: 13px;
                font-size: 23px;
                color: rgba(255,204,0,1);
                border: 1PX solid rgba(255,204,0,1);
                border-radius: 6px;
                top: 18px;
                right: -20px;
            }
        }
    }
    .pay-btn {
        text-align: center;
        button {
            width: 585px;
            height: 81px;
            line-height: 81px;
            background: rgba(255,204,0,1);
            text-align: center;
            color: #000;
            font-size: 34px;
            margin: 104px 0 0;
            border-radius: 50px;
        }
    }
}
</style>
