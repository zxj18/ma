<template>
  <div class="select-box">
    <div class="default" @click="unfold">
      <p>{{text}}</p>
      <img class="triangle" src="../../assets/images/triangle.png">
    </div>
    <div class="multi-select" v-if="hidden">
      <div
        v-for="(item, index) in list"
        :key="index"
        @click="choose(item, index)">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['text', 'list'],
  data() {
    return {
      hidden: false,
    };
  },
  methods: {
    unfold() {
      this.hidden = !this.hidden;
    },
    choose(val, index) {
      this.unfold();
      this.$emit('choose', val, index);
    },
  },
};
</script>

<style scoped lang="less">
  .select-box {
    width: 118px;
    font-size: 25px;
    height: 39px;
    background-color: #f8f8f8;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .default {
      display: flex;
      align-items: center;
      .triangle{
        width: 18px;
        height:15px;
        margin-left: 9px;
      }
    }
    .multi-select {
      position: absolute;
      top: 39px;
      left: 0;
      width: 100%;
      padding-top: 26px;
      background-color: #f8f8f8;
      text-align: center;
      z-index: 2;
      > div {
        margin-bottom: 26px;
      }
    }
  }
</style>
