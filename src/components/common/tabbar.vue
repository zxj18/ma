<template lang="html">
  <div class="tabbar">
    <div class="tabbar-thin-line"></div>
    <router-link
      replace
      class="tabbar-item"
      v-for="item in data"
      :key="item.id"
      :to="{ path: item.path }">
      <img v-if="$route.path!==item.path" :src="item.select">
      <img v-if="$route.path===item.path" :src="item.selected">
      <div class="text" :class="{active: $route.path===item.path}">{{item.text}}</div>
    </router-link>
  </div>
</template>

<script>

export default {
  props: ['data'],
};
</script>

<style lang="less" scoped>
  .tabbar {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 98px;
    background-color: #FFFFFF;
    display: flex;
    z-index: 999;

    .tabbar-thin-line {
      position: absolute;
      width: 100%;

      &:after {
        position: absolute;
        content: '';
        top: -50%;
        bottom: -50%;
        left: -50%;
        right: -50%;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        border-bottom: 1px solid #e2e2e2;
      }
    }

    .tabbar-item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      color: #000000;
      flex-direction: column;
      position: relative;

      img {
        width: 47px;
        height: 41px;
      }

      .text {
        margin-top: 11px;
        color: #b4b4b4;
      }
      .active {
        color: #000;
      }
    }

  }
</style>
