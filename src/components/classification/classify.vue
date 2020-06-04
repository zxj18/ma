<template>
  <div class="classify" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div class="tabs">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{active: index === tabI}"
        @click="tapTab(index,tab)">
        {{tab.name}}
      </div>
    </div>
    <div class="tabs2">
      <three-tab
        class="first-tab"
        :data="classifyA"
        :acitveIndex="classifyAI"
        @tapTab='tapClassifyA'>
      </three-tab>
      <three-tab
        :data="classifyB"
        :acitveIndex="classifyBI"
        @tapTab='tapClassifyB'>
      </three-tab>
      <select-box
        :text="text"
        :list="list"
        @choose="choose"
      ></select-box>
    </div>
    <div class="content">
      <book-score v-for="book in this.cartoonsList" :key="book.id" :book="book"/>
    </div>
    <p v-show="infiniteMsgShow" class="tips">加载更多ing</p>
    <p v-show="!infiniteMsgShow" class="tips" style="font-size:14px;"> 没有更多数据</p>
  </div>
</template>

<script>
import ThreeTab from '@/components/common/three-tab.vue';
import SelectBox from '@/components/common/select-box.vue';
import BookScore from '@/components/common/book-score.vue';

export default {
  props: ['priceType'],
  data() {
    return {
      // tabs: ['全部', '玄幻', '校园', '恋爱', '恐怖', '悬疑', '异能', '恋爱', '古风', '科幻', '都市', '日漫', '冒险', '爆笑'],
      tabs: [],
      tabI: 0,
      classifyA: ['全部', '连载', '完结'],
      classifyAI: 0,
      classifyB: ['全部', '免费', '特价'],
      classifyBI: 0,
      text: '最热',
      list: ['推荐', '最热', '最新'],
      params: {
        pageNum: 1,
        pageSize: 6,
        priceType: 0, // 价格类型 1免费 2特价
        rankType: '', //  排名类型，0人气榜 1新番榜 2收藏榜
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
    if (this.priceType && this.priceType === 1) {
      this.tapClassifyB(1);
    } else {
      this.getCartoon();
    }
    this.getCateList();
  },
  methods: {
    tapTab(i, tab) {
      this.cartoonsList = [];
      this.tabI = i;
      if (i === 0) {
        this.params.cartoonCatId = '';
      } else {
        this.params.cartoonCatId = tab.id;
      }
      this.getCartoon(this.params);
    },
    tapClassifyA(i) {
      this.cartoonsList = [];
      this.classifyAI = i;
      if (i === 0) {
        this.params.serialized = '';
      } else if (i === 1) {
        this.params.serialized = 1;
      } else {
        this.params.serialized = 0;
      }
      this.getCartoon(this.params);
    },
    tapClassifyB(i) {
      this.cartoonsList = [];
      this.classifyBI = i;
      if (i === 0) {
        this.params.priceType = '';
      } else if (i === 1) {
        this.params.priceType = 1;
      } else {
        this.params.priceType = 2;
      }
      this.getCartoon(this.params);
    },
    choose(val, index) {
      this.cartoonsList = [];
      this.text = val;
      console.log(index);
      this.params.isRecommend = '';
      this.params.isHot = '';
      this.params.isNew = '';
      if (index === 0) {
        this.params.isRecommend = 1;
      } else if (index === 1) {
        this.params.isHot = 1;
      } else {
        this.params.isNew = 1;
      }
      this.getCartoon(this.params);
    },
    getCartoon() {
      this.$api.cartoon.getCartoon(this.params).then((res) => {
        if (res.code === 200) {
          const lists = res.data.content;
          if (lists.length === 0) {
            this.infiniteMsgShow = false;
          }
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
    // 请求数据使用$api
    getCateList() {
      this.$api.cartoon.getCateList().then((res) => {
        if (res.code === 200) {
          this.tabs.push({ id: -1, name: '全部' });
          res.data.forEach((item) => {
            this.tabs.push(item);
          });
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
    ThreeTab,
    SelectBox,
    BookScore,
  },
};
</script>

<style scoped lang="less">
  .classify {
    .active {
      color: #FFC655;
      font-weight: bold;
    }
    .tabs {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      padding: 40px 6px 0;
      border-bottom: 1PX solid #F1F1F1;
      > div {
        width: 105px;
        text-align: center;
        margin-bottom: 40px;
      }
    }
    .tabs2 {
      display: flex;
      padding: 22px 27px;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1PX solid #F1F1F1;
      .first-tab {
        position: relative;
        &::after {
          content: '';
          width: 1PX;
          height: 36px;
          background-color: #E7E7E7;
          position: absolute;
          top: -2px;
          right: -34px;
        }
      }
    }
    .content {
      padding: 29px 32px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .tips {
      margin-bottom: 30px;
      text-align: center;
    }
  }
</style>
