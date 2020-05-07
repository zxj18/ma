<template>
  <div class="logout" v-if="show" @click="$emit('close')">
      <div class="content" @click.stop>
        <h3>您确定要登出吗？</h3>
        <p>退出登入后书柜和账户信息将不再展示</p>
        <div class="button-list">
            <img src="../../assets/images/think_again_btn.png" @click="$emit('close')">
            <img src="../../assets/images/yes_btn.png" @click="$emit('close')">
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['show'],
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style scoped lang="less">
  .logout {
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
      height: 562px;
      background-color: #fff;
      position: relative;
      border-radius: 36px;
      box-sizing: border-box;
      h3 {
        font-size: 43px;
        margin-top: 122px;
        text-align: center;
      }
      p {
        font-size: 30px;
        color: #808080;
        width: 420px;
        margin: 92px auto 58px;
        line-height: 60px;
      }
      .button-list {
        display: flex;
        justify-content: space-between;
        padding: 0 40px;
        img {
          width: 225px;
          height: 75px;
        }
      }
    }
  }
</style>
