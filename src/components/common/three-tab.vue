<template>
  <div class="three-tab">
    <div
      v-for="(tab, index) in data"
      :key="index"
      :class="{active: index === acitveI}"
      @click="tapTab(index)">
      {{tab}}
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
  .three-tab {
    width: 232px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .active {
      color: #FFC655;
      font-weight: bold;
    }
  }
</style>
