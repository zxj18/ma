<template>
  <div class="rank" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div class="tabs">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{active: index === tabI}"
        @click="tapTab(index)">{{tab}}</div>
    </div>
    <div class="content">
      <big-book v-for="book in this.cartoonsList" :key="book.id" :book="book"/>
    </div>
    <p v-show="infiniteMsgShow" class="tips">加载更多ing</p>
    <p v-show="!infiniteMsgShow" class="tips"> 没有更多数据</p>
  </div>
</template>

<script>
import BigBook from '@/components/common/big-book.vue';

export default {
  data() {
    return {
      tabs: ['人气榜', '新番榜', '收藏榜'],
      tabI: 0,
      params: {
        pageNum: 1,
        pageSize: 10,
        priceType: 0, // 价格类型 1免费 2特价
        rankType: 0, //  排名类型，0人气榜 1新番榜 2收藏榜
        cartoonCatId: '', //  排分类id
        serialized: '', //  是否连载 0完结 1连载
        isNew: '',
        isHot: '',
        isRecommend: '',
      },
      cartoons: {},
      cartoonsList: [],
      busy: true,
      infiniteMsgShow: false,
    };
  },
  created() {
    this.getCartoon();
  },
  methods: {
    tapTab(i) {
      this.tabI = i;
      this.params.rankType = i;
      this.getCartoon(this.params);
    },
    getCartoon() {
      this.$api.cartoon.getCartoon(this.params).then((res) => {
        if (res.code === 200) {
          const lists = res.data.content;
          for (let i = 0; i < lists.length; i += 1) {
            this.cartoonsList.push({ ...lists[i] });
          }
          if (this.params.pageNum < res.data.totalPages) {
            this.busy = false;
            console.log(this.busy);
          } else if (this.params.pageNum === res.data.totalPages) {
            this.infiniteMsgShow = false;
          }
        }
      });
    },
    loadMore() {
      this.infiniteMsgShow = true;
      this.params.pageNum += 1;
      this.busy = true;
      this.getCartoon();
    },
  },
  components: {
    BigBook,
  },
};
</script>

<style scoped lang="less">
  .rank {
    .tabs {
      display: flex;
      justify-content: space-between;
      padding: 28px 89px;
      border-bottom: 1PX solid #F1F1F1;
    }
    .active {
      color: #FFC655;
      font-weight: bold;
    }
    .content {
      padding: 32px 28px 0;
    }
    .tips {
      margin-bottom: 30px;
      text-align: center;
    }
  }
</style>
