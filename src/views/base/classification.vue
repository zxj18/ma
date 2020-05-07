<template>
  <div class="classification">
    <roof-tab
      :data="roofTabDat"
      :acitveIndex="tabI"
      @tapTab='tapRoofTab'>
      <router-link :to="{ name: 'search' }">
        <img class="icon-search" src="../../assets/images/home_search.png">
      </router-link>
    </roof-tab>
    <classify v-show="tabI === 0" :priceType="priceType"></classify>
    <rank v-show="tabI === 1"></rank>
  </div>
</template>

<script>
import RoofTab from '@/components/common/roof-tab.vue';
import Classify from '@/components/classification/classify.vue';
import Rank from '@/components/classification/rank.vue';

export default {
  data() {
    return {
      roofTabDat: ['分类', '排名'],
      tabI: 0,
      priceType: '',
    };
  },

  created() {
    const { type, priceType } = this.$route.query;
    if (type) {
      this.tabI = type;
    }
    this.priceType = priceType;
  },

  methods: {
    tapRoofTab(i) {
      this.tabI = i;
    },
  },

  components: {
    RoofTab,
    Classify,
    Rank,
  },
};
</script>

<style scoped lang="less">
  .classification {
    font-size: 30px;
    .icon-search {
      width: 44px;
    }
  }
</style>
