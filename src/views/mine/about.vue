<template lang="html">
  <div class="about">
    <header-box
      :title="'关于我们'"
    ></header-box>
    <div class="content">
      <p class="logo">
        <img src="../../assets/images/logo_about.png">
      </p>
      <p class="version">V1.0.0-0330</p>
      <ul class="skipList">

        <li>
          隐私协议
          <span class="arrow">
            <img class="arrow" src="../../assets/images/arrow.png">

          </span>
        </li>

        <li>
          免责条款
          <span class="arrow">
            <img class="arrow" src="../../assets/images/arrow.png">
          </span>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import HeaderBox from '@/components/common/header.vue';

export default {
  data() {
    return {
    };
  },
  components: {
    HeaderBox,
  },
};
</script>

<style scoped lang="less">
.about {
    .content {
      width: 506px;
      margin: 221px auto 0;
      .logo {
          text-align: center;
          margin-bottom: 30px;
          img {
            max-width: 151px;
            width: 100%;
          }
      }
      .version {
          font-size: 28px;
          text-align: center;
          color: rgba(0,0,0,1);
      }
      .skipList {
          font-size: 32px;
          margin-top: 94px;
          li {
              border-bottom: 1px solid rgba(241,241,241,1);
              padding-bottom: 30px;
              margin-bottom: 68px;
              .arrow {
                float: right;
                img {
                  width: 14px;
                  height: 23px;
                  vertical-align: middle;
                  margin-right: 18px;
                }
              }
          }
      }
    }
}
</style>
