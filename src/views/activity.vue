<template>
  <div class="activity">
    <roof-tab
      :data="roofTabDat"
      :acitveIndex="tabI"
      @tapTab='tapRoofTab'>
      <router-link :to="{ name: 'search' }">
        <img class="icon-search" src="../assets/images/home_search.png">
      </router-link>
    </roof-tab>
    <div class="screening">
      <three-tab
        :data="classify"
        :acitveIndex="classifyI"
        @tapTab='tapClassify'>
      </three-tab>
      <select-box
        :text="text"
        :list="list"
        @choose="choose"
      ></select-box>
    </div>
    <free v-show="tabI === 0"> </free>
    <special v-show="tabI === 1"> </special>
  </div>
</template>

<script>
import RoofTab from '@/components/common/roof-tab.vue';
import Free from '@/components/activity/free.vue';
import Special from '@/components/activity/specialOffer.vue';
import ThreeTab from '@/components/common/three-tab.vue';
import SelectBox from '@/components/common/select-box.vue';

export default {
  data() {
    return {
      roofTabDat: ['免费', '特价'],
      tabI: 0,
      classify: ['全部', '连载', '完结'],
      classifyI: 0,
      text: '最热',
      list: ['推荐', '最热', '最新'],
    };
  },
  created() {
    const { type } = this.$route.query;
    if (type) {
      this.tabI = type;
    }
  },
  methods: {
    tapRoofTab(i) {
      this.tabI = i;
    },
    tapClassify(i) {
      this.classifyI = i;
    },
    choose(val) {
      this.text = val;
    },
  },
  components: {
    RoofTab,
    Free,
    Special,
    ThreeTab,
    SelectBox,
  },
};
</script>

<style scoped lang="less">
  .activity {
    font-size: 30px;
    .icon-search {
      width: 44px;
    }
    .screening {
      display: flex;
      justify-content: space-between;
      padding: 32px 30px;
    }
  }
</style>
