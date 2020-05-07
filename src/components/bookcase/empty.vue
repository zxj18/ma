<template>
  <div class="empty">
    <img class="icon-empty" src="../../assets/images/bookcase_empty.png">
    <p class="text">没有任何内容哦~</p>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped lang="less">
  .empty {
    position: fixed;
    top: 100px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    background-color: #fff;
    display: flex;
    align-items: center;
    flex-direction: column;
    .icon-empty {
      width:429px;
      height:328px;
      margin: 250px 0 50px;
    }
    .text {
      font-size: 34px;
      color: #CECECE;
    }
  }
</style>
