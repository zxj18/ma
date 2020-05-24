<template>
  <div class="header-box">
    <div class="left">
      <img class="icon-rollback" @click="rollback" src="../../assets/images/rollback.png">
      <p v-if="name" class="name">{{name}}</p>
    </div>
    <div v-if="title" class="middle">{{title}}</div>
    <div class="right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'name'],
  methods: {
    rollback() {
      if (this.$listeners.back) {
        this.$emit('back');
      // eslint-disable-next-line no-empty
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style scoped lang="less">
  .header-box {
    width: 100%;
    height: 88px;
    background-color: #fff;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 34px;
    .left {
      display: flex;
      align-items: center;
      .icon-rollback {
        width:18px;
        height:29px;
        padding: 20px 30px 30px;
      }
      .name {
        width: 480px;
        font-size: 30px;
        font-weight: 400px;
        color: #3F3633;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .middle {
      position: absolute;
      width: 500px;
      text-align: center;
      left: 125px;
      font-size: 34px;
      font-weight: 500;
      text-align: center;
    }
  }
</style>
