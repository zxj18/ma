<template>
  <confirm
    :buttons="['关闭', { title: '去充值', active: true }]"
    @select="failPopupSelect">
    <div class="fail-popus">
      <img class="icon" src="../../assets/images/details_fail.png">
      <p>购买失败</p>
      <div>点数不足，请充值！</div>
    </div>
  </confirm>
</template>

<script>
import Confirm from '@/components/common/confirm.vue';

export default {
  props: [],
  data() {
    return {

    };
  },
  methods: {
    failPopupSelect(i) {
      this.$emit('select', i);
    },
  },
  components: {
    Confirm,
  },
};
</script>

<style scoped lang="less">
  .fail-popus {
    .icon {
      width:156px;
      height:195px;
    }
    p {
      margin: 60px 0 36px;
      font-weight: 500;
      font-size: 43px;
    }
    div {
      font-size: 34px;
      color: #8B8989;
      font-weight: 400;
    }
  }
</style>
