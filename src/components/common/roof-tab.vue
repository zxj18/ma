<template>
  <div class="roof-tab">
    <div class="tab-box">
      <div
        v-for="(tab, index) in data"
        :key="index + 'index'"
        :class="{ tab: true, acitve: acitveI === index}"
        @click="tapTab(index)">
        {{tab}}
      </div>
    </div>
    <div class="slot">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data', 'acitveIndex'],
  computed: {
    acitveI() {
      return this.acitveIndex || 0;
    },
  },
  methods: {
    tapTab(i) {
      this.$emit('tapTab', i);
    },
  },
};
</script>

<style scoped lang="less">
  .roof-tab {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px 30px 30px;
    .tab-box {
      display: flex;
      align-items: flex-end;
      font-size: 34px;
      > div {
        margin-right: 37px;
      }
      .acitve {
        font-size: 42px;
        font-weight:bold;
      }
    }
  }
</style>
