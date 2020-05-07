<template>
<div class="search">
  <div class="header">
    <div class="input-box">
      <form action="javascript:return true">
        <input type="search" v-model="text" placeholder="搜索关键字..." @keyup.13="searchClick">
      </form>
      <img v-if="hasShowClose" @click="clearText" class="close" src="../assets/images/close.png">
    </div>
    <p class="cancel" @click="cancel">取消</p>
  </div>
  <div class="init" v-if="hasShowInit">
    <div class="section">
      <div class="head">
        <div class="left">
          <img class="icon1" src="../assets/images/search_hot.png">
          <p>大家都在搜</p>
        </div>
      </div>
      <div class="content">
        <span class="tag" v-for="(item, i) in hotSearch" @click="tapTag(item)" :key="i">{{item.searchName}}</span>
      </div>
    </div>
    <div class="banner-box">
      <div class="banner">
        <vue-swiper-search :banner="this.banner" @bannerClick="bannerClick" />
      </div>
    </div>
          <div class="section" v-if="hasLogin">
            <div class="head">
              <div class="left">
                <img class="icon2" src="../assets/images/search_record.png">
                <p>搜索记录</p>
              </div>
              <img class="del" @click="clear" src="../assets/images/search_del.png">
            </div>
            <div class="content">
              <span
                class="tag"
                @click="tapTag(item)"
                v-for="(item, i) in historyList"
                :key="i">{{item.searchName}}</span>
            </div>
          </div>
  </div>
  <div class="result" v-else>
    <serach-book v-for="book in books" :key="book.id" :book="book" />
    <p class="tip" v-if="books == ''">沒有搜索到關於“<span>{{text}}</span>”的記錄哦</p>
  </div>
</div>
</template>

<script>
import SerachBook from '@/components/search/search-book.vue';
import VueSwiperSearch from '@/components/common/vue-swiper-search.vue';
import { getToken } from '../utils/auth';

export default {
  data() {
    return {
      text: '',
      hotSearch: [],
      historyList: [],
      hasShowInit: true,
      banner: [],
      bannerParam: {
        type: 3,
      },
      searchParam: {
        pageNum: 1,
        pageSize: 10,
        searchName: this.text,
      },
      books: [],
      saveKeyParam: {
        searchName: this.text,
      },
    };
  },
  created() {
    this.initHotSearch();
    this.initHistorySearch();
    this.initBanner(this.bannerParam);
    console.log('gettoken');
    console.log(getToken());
    console.log(this.token());
    console.log(this.token() !== undefined);
  },
  computed: {
    hasShowClose() {
      return !!this.text;
    },
    hasLogin() {
      return this.token() !== undefined;
    },
  },
  methods: {
    token() {
      return getToken();
    },
    initBanner(param) {
      this.$api.banner.list(param).then((res) => {
        if (res.code === 200) {
          this.banner = res.data;
        }
      });
    },
    cancel() {
      this.$router.back();
    },
    clear() {
      this.$api.user.delHistorySearch().then((res) => {
        if (res.code === 200) {
          this.historyList = [];
        }
      });
    },
    clearText() {
      this.text = '';
      this.hasShowInit = true;
      this.initHistorySearch();
    },
    searchClick() {
      this.hasShowInit = false;
      this.search(this.text);
    },
    tapTag(item) {
      this.hasShowInit = false;
      this.text = item.searchName;
      this.search(this.text);
    },
    initHotSearch() {
      this.$api.cartoon.peopleSearch().then((res) => {
        if (res.code === 200) {
          this.hotSearch = res.data;
        }
      });
    },
    initHistorySearch() {
      this.$api.user.getHistorySearch().then((res) => {
        if (res.code === 200) {
          this.historyList = res.data;
        }
      });
    },
    search(text) {
      this.searchParam.searchName = text;
      this.$api.cartoon.search(this.searchParam).then((res) => {
        if (res.code === 200) {
          this.books = res.data.content;
        }
      });
    },
    bannerClick(banner) {
      this.$router.push({
        path: 'details',
        query: {
          id: banner.cartoon_id,
        },
      });
    },
  },
  components: {
    SerachBook,
    VueSwiperSearch,
  },
};
</script>

<style scoped lang="less">
.search {
    font-size: 28px;
    .header {
        box-sizing: border-box;
        padding: 0 36px 0 15px;
        display: flex;
        height: 88px;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 35px;
        .input-box {
            position: relative;
            height: 60px;
            input {
                width: 600px;
                background-color: #F8F8F8;
                height: 60px;
                text-indent: 40px;
                border-radius: 30px;
                font-size: 28px;
            }
            .close {
                position: absolute;
                top: 13px;
                right: 14px;
                width: 32px;
                height: 32px;
            }
        }
        .cancel {
            padding: 25px 0 15px 4px;
        }
    }
    .section {
        .head {
            display: flex;
            justify-content: space-between;
            padding: 0 40px;
            color: #A8A7A7;
            margin-bottom: 52px;
            .left {
                display: flex;
                align-items: center;
                img {
                    margin-right: 14px;
                }
                .icon1 {
                    width: 25px;
                    height: 27px;
                }
                .icon2 {
                    width: 26px;
                    height: 26px;

                }
            }
            .del {
                width: 26px;
                height: 26px;
                padding: 6px 0 6px 10px;
            }
        }
        .content {
            max-height: 340px;
            overflow: scroll;
            padding: 0 30px;
            display: flex;
            flex-wrap: wrap;
            .tag {
                background-color: #F8F8F8;
                padding: 18px 38px;
                font-weight: 500;
                font-size: 26px;
                border-radius: 30px;
                margin: 0 15px 30px 0;
                max-width: 602px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
    .banner-box {
        padding: 0 30px;
        .banner {
            height: 188px;
            margin-bottom: 35px;
            border-radius: 20px;
            img {
                width: 100%;
                height: 188px;
            }
        }
    }
    .result {
        padding: 0 42px;
        .tip {
            margin-top: 55px;
            color: #9C9C9C;
            text-align: center;
            span {
                color: #FFD000;
            }
        }
    }
}
</style>
