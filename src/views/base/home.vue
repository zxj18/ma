<template>
  <div class="home">
    <div class="header">
      <div class="title">
        <img src="../../assets/images/logo_index.png" alt />
        <span :class="{on:isAdult}" @click="showAdult"></span>
      </div>
      <div class="icon-box">
        <router-link :to="{ name: 'search' }">
          <img class="icon-search" src="../../assets/images/home_search.png" />
        </router-link>
        <router-link :to="{ name: 'bookcase', query: { type: 1} }">
          <img class="icon-history" src="../../assets/images/home_history.png" />
        </router-link>
        <img class="icon-sign-in" @click="showSignIn" src="../../assets/images/home_sign_in.png" />
      </div>
    </div>
    <vue-swiper :banner="this.banner" @bannerClick="bannerClick" />
    <div class="main">
      <div class="category">
        <div class="head">
          <img src="../../assets/images/home_type1.png" />
          <p>推荐</p>
        </div>

        <div class="content">
          <router-link
            v-for="recommend  in recommends"
            :key="recommend.id"
            class="recommend-item"
            :to="{ name: 'details', query: {'id':recommend.id,} }"
          >
            <img :src="recommend.cover" style="width:109.09px;height:145.63px;" />
            <img class="cover-ban" src="../../assets/images/cover_ban.png" v-show="isAdult" />
            <p class="recommend-name">{{recommend.title}}</p>
          </router-link>
        </div>

        <div class="btn" v-on:click="initRecommend">
          <img src="../../assets/images/home_btn1.png" />
          <p>换一批</p>
        </div>
      </div>
      <div class="category">
        <div class="head">
          <img src="../../assets/images/home_type2.png" />
          <p>免费 / 特价</p>
        </div>
        <div class="content">
          <book-score v-for="book in this.specialData" :key="book.id" :book="book" />
          <div class="book-empty"></div>
        </div>
        <router-link :to="{ name: 'classification', query: { type: 0, priceType: 1,}}">
          <div class="btn">
            <img src="../../assets/images/home_btn2.png" />
            <p>查看全部免费 / 特价</p>
          </div>
        </router-link>
      </div>
      <div class="category">
        <div class="head">
          <img src="../../assets/images/home_type3.png" />
          <p>本周排名</p>
        </div>
        <div class="content">
          <book v-for="(book,index) in this.bookRank" :key="book.id" :book="book">
            <div class="book-rank">
              <img v-if="index===0" src="../../assets/images/home_top1.png" />
              <p v-if="index===0" class="top1">Top 1</p>
              <img v-if="index===1" src="../../assets/images/home_top2.png" />
              <p v-if="index===1" class="top1">Top 2</p>
              <img v-if="index===2" src="../../assets/images/home_top3.png" />
              <p v-if="index===2" class="top3">Top 3</p>
            </div>
          </book>
        </div>
        <router-link :to="{ name: 'classification', query: { type: 1} }">
          <div class="btn">
            <img src="../../assets/images/home_btn3.png" />
            <p>查看完整榜单</p>
          </div>
        </router-link>
      </div>
      <div class="banner">
        <vue-swiper :banner="this.banner1" @bannerClick="bannerClick1" />
      </div>
      <div class="category">
        <div class="head">
          <img src="../../assets/images/home_type4.png" />
          <p>追更</p>
        </div>
        <div class="content">
          <book-update v-for="book in pursues" :key="book.id" :book="book" />
          <div class="book-empty"></div>
        </div>
      </div>
    </div>

    <sign-in :show="isShowSignIn" @close="showSignIn"></sign-in>
    <attention :show="isAttention" @close="closeAttention" @yes="setAdult"></attention>
  </div>
</template>

<script>
/*eslint-disable*/
import Book from "@/components/common/book.vue";
import BookUpdate from "@/components/common/book-update.vue";
import BookScore from "@/components/common/book-score.vue";
import VueSwiper from "@/components/common/vue-swiper.vue";
import SignIn from "@/components/home/sign-in.vue";
import Attention from "@/components/home/attention.vue";
import { hasLogin, setAdult, setUnAdult, getAdult } from "../../utils/auth";

export default {
  data() {
    return {
      isShowSignIn: false,
      bannerParam: {
        type: 0
      },
      bannerParam1: {
        type: 1
      },
      banner: [],
      banner1: [],
      recommends: [],
      specialData: [],
      bookRank: [],
      pursues: [],
      isAdult: false,
      isAttention: false
    };
  },
  mounted() {
    this.initData();
  },

  methods: {
    initData() {
      this.isAdult = getAdult() === "1";
      console.log(this.isAdult);
      this.initBanner(this.bannerParam);
      this.initBanner(this.bannerParam1);
      this.initRecommend();
      this.freeOrSpecialPrice();
      this.cartoonRank();
      this.cartoonPursue();
    },
    showSignIn() {
      if (hasLogin(this)) {
        this.isShowSignIn = !this.isShowSignIn;
      }
    },
    showAdult() {
      this.isAdult = !this.isAdult;
      if (this.isAdult) {
        this.isAttention = true;
      } else {
        setUnAdult();
        this.initData();
      }
    },
    closeAttention() {
      this.isAttention = false;
      this.isAdult = false;
    },
    setAdult() {
      this.isAttention = false;
      setAdult();
      this.initData();
    },
    initBanner(param) {
      this.$api.banner.list(param).then(res => {
        if (res.code === 200) {
          if (param.type === 0) {
            this.banner = res.data;
          } else {
            this.banner1 = res.data;
          }
        }
      });
    },
    initRecommend() {
      this.$api.cartoon.getRecommend().then(res => {
        if (res.code === 200) {
          this.recommends = res.data;
        }
      });
    },
    freeOrSpecialPrice() {
      this.$api.cartoon.freeOrSpecialPrice().then(res => {
        if (res.code === 200) {
          this.specialData = res.data;
        }
      });
    },
    cartoonRank() {
      this.$api.cartoon.cartoonRank().then(res => {
        if (res.code === 200) {
          this.bookRank = res.data;
        }
      });
    },
    cartoonPursue() {
      this.$api.cartoon.cartoonPursue().then(res => {
        if (res.code === 200) {
          this.pursues = res.data;
        }
      });
    },
    bannerClick(banner) {
      this.$router.push({
        path: "details",
        query: {
          id: banner.cartoon_id
        }
      });
    },
    bannerClick1(banner) {
      this.$router.push({
        path: "details",
        query: {
          id: banner.id
        }
      });
    }
  },

  components: {
    Book,
    BookUpdate,
    BookScore,
    VueSwiper,
    SignIn,
    Attention
  }
};
</script>

<style scoped lang="less">
.home {
  font-size: 30px;
  padding: 0 30px;

  .header {
    display: flex;
    justify-content: space-between;
    padding: 30px 0;
    margin-bottom: 20px;

    .title {
      font-size: 42px;
      color: #231815;
      font-weight: bold;
      img {
        width: 154px;
        max-width: 100%;
      }
      span {
        display: inline-block;
        margin: 0 0 2px 24px;
        max-width: 100%;
        width: 95px;
        height: 43px;
        background: url("../../assets/images/off_btn.png") no-repeat;
        background-size: 100% 100%;
      }
      .on {
        background: url("../../assets/images/on_btn.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .tag-recommend {
      background-color: #ffb400;
    }

    .icon-box {
      img {
        margin-left: 35px;
      }
      .icon-search {
        width: 44px;
        height: 43px;
      }
      .icon-history {
        width: 42px;
        height: 42px;
      }
      .icon-sign-in {
        width: 42px;
        height: 42px;
      }
    }
  }
  .banner {
    height: 310px;
    margin-bottom: 50px;
    border-radius: 20px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .main {
    margin-top: 50px;
    .category {
      &:last-child {
        margin-bottom: 0;
      }
      margin-bottom: 50px;
      .head {
        display: flex;
        align-items: center;
        margin-bottom: 30px;

        img {
          width: 35px;
          margin-right: 22px;
        }

        p {
          font-size: 34px;
          color: #231815;
          font-weight: bold;
        }
      }
      .content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .recommend-item {
          position: relative;
          width: 32%;
          // height:234px;
          white-space: nowrap;
          min-height: 110px;
          margin-right: 9px;
          border-radius: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 20px;

          .cover-ban {
            display: block;
            position: absolute;
            width: 50px;
            height: 50px;
            top: 2.5%;
            right: 2.5%;
          }
          img {
            width: 333px;
            height: 296px;
          }

          .recommend-name {
            width: 210px;
            margin: 23px 0 18px;
            color: #231815;
            font-weight: 500;
            // padding-left: 28px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .recommend-tips {
            width: 210px;
            font-size: 27px;
            color: #8b8989;
            padding-left: 28px;
            margin-bottom: 46 px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .book-rank {
          display: flex;
          align-items: center;
          img {
            width: 25px;
            margin-right: 16px;
          }
          p {
            font-size: 26px;
          }
          .top1 {
            color: #ffc655;
          }
          .top2 {
            color: #b2c9da;
          }
          .top3 {
            color: #eec6a6;
          }
        }
      }
      .btn {
        display: flex;
        background-color: #f8f8f8;
        align-items: center;
        justify-content: center;
        border-radius: 50px;
        padding: 32px 0;
        margin-top: 20px;

        img {
          width: 32px;
          margin-right: 24px;
        }

        p {
          color: #8b8989;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
