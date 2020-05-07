<template lang="html">
  <div class="base">
    <router-view></router-view>
    <tabbar :data="tabbarList"></tabbar>
  </div>
</template>

<script>
import IconHomeSelect from '@/assets/images/tabbar/home_un.png';
import IconHomeSelected from '@/assets/images/tabbar/home.png';
import IconClassificationSelect from '@/assets/images/tabbar/classification_un.png';
import IconClassificationSelected from '@/assets/images/tabbar/classification.png';
import IconBookcaseSelect from '@/assets/images/tabbar/bookcase_un.png';
import IconBookcaseSelected from '@/assets/images/tabbar/bookcase.png';
import IconMineSelect from '@/assets/images/tabbar/mine_un.png';
import IconMineSelected from '@/assets/images/tabbar/mine.png';
import Tabbar from '@/components/common/tabbar.vue';


export default {
  data() {
    return {
      tabbarList: [
        {
          id: 1,
          text: '首页',
          select: IconHomeSelect,
          selected: IconHomeSelected,
          path: '/',
        },
        {
          id: 2,
          text: '分类',
          select: IconClassificationSelect,
          selected: IconClassificationSelected,
          path: '/classification',
        },
        {
          id: 3,
          text: '书柜',
          select: IconBookcaseSelect,
          selected: IconBookcaseSelected,
          path: '/bookcase',
        },
        {
          id: 4,
          text: '我',
          select: IconMineSelect,
          selected: IconMineSelected,
          path: '/mine',
        },
      ],
    };
  },
  components: {
    Tabbar,
  },
  methods: {

  },
};
</script>

<style scoped lang="less">
  .base {
    padding-bottom: 98px;
  }
</style>
