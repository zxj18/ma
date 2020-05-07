<template>
  <div class="user">
    <div class="header">
      <header-box
        :title="'个人资料'"
      ></header-box>
    </div>
    <div class="avatar-box" @click="goPage('modifyAvatar')">
      <img class="avatar" src="../../assets/images/default_user_avatar.png">
      <img class="camera" src="../../assets/images/user_camera.png">
    </div>
    <div class="content">
      <div class="item" @click="goPage('modifyId')">
        <div class="left">
          名字
        </div>
        <div class="right">
          <p>{{userInfo.nickName}}</p>
          <img class="arrow" src="../../assets/images/arrow.png">
        </div>
      </div>
      <div class="item">
        <div class="left">
          邮箱
        </div>
        <div class="right">
          <p>{{userInfo.account}}</p>
        </div>
      </div>
      <div class="item">
        <div class="left">
          账号
        </div>
        <div class="right">
          <p>{{userInfo.id}}</p>
        </div>
      </div>
    </div>
    <div class="logout-btn" @click="showLogout">
      <img src="../../assets/images/logout_btn.png" alt="">
    </div>
    <loginout
      :show="isShowLogout"
      @close="Logout">
    </loginout>
  </div>
</template>

<script>
import HeaderBox from '@/components/common/header.vue';
import Loginout from '@/components/userInfo/logout.vue';
import { removeToken } from '../../utils/auth';

export default {
  data() {
    return {
      isShowLogout: false,
      userInfo: '',
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    goPage(page) {
      this.$router.push({ name: page });
    },
    showLogout() {
      this.isShowLogout = !this.isShowLogout;
    },
    Logout() {
      removeToken();
      localStorage.clear();
      this.$router.back();
    },
    getUserInfo() {
      this.$api.user.getInfo().then((res) => {
        if (res.code === 200) {
          this.userInfo = res.data;
          console.log(this.userInfo);
        }
      });
    },
  },
  components: {
    HeaderBox,
    Loginout,
  },
};
</script>

<style scoped lang="less">
  .user {
    .header-box {
      background-color: transparent;
    }
    font-size: 32px;
    .header {
      height: 320px;
      background: url('../../assets/images/mine_bg.png')no-repeat;
      background-size: cover;
    }
    .avatar-box {
      position: relative;
      width:243px;
      height:243px;
      border-radius: 50%;
      margin: -121px auto;
      overflow: hidden;
      .avatar {
        width: 100%;
        height: 100%;
      }
      .camera {
        width:40px;
        height:35px;
        position: absolute;
        left: 105px;
        bottom: 22px;
      }
    }
    .content {
      margin-top: 183px;
      padding-left: 58px;
      .item {
        padding: 32px 32px 32px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1PX solid #F1F1F1;
        .left {
          color: #8B8989;
        }
        .right {
          display: flex;
          align-items: center;
        }
      }
    }
    .arrow {
      width:14px;
      height:23px;
      margin-left: 30px;
    }
    .logout-btn {
      width: 585px;
      margin: 90px auto 0;
      text-align: center;
      img {
        max-width: 100%;
      }
    }
  }
</style>
