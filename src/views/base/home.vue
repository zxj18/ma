<template>
  <div class="home">
    <div class="header">
      <div class="title">
        <img src="../../assets/images/home.png" alt />
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
    <div class="Bubble">
      <img style="margin-left:40px;" src="../../assets/images/Bubble.png">
      <img class="Bappleout"  @click="hiddenShow()"  src="../../assets/images/Bapple.out.png">
      </div>
    <vue-swiper :banner="this.banner" @bannerClick="bannerClick" />
    <div class="main">
      <div class="category">
        <div class="head">
          <img src="../../assets/images/home_type1.png" />
          <p>精選</p>
           <div class="con">
          <img  v-on:click="initRecommend" style="margin-left:200px;margin-bottom:-5px;border-radius: 0px 0px 10px 10px; " src="../../assets/images/home_btn1.png" />
          <h3  v-on:click="initRecommend" style="margin-left:225px;margin-top:-14px;font-weight: 500;font-size:16px;">换一批</h3>
        </div>
        </div>

        <div class="content">
          <router-link
            v-for="recommend  in recommends"
            :key="recommend.id"
            class="recommend-item"
            :to="{ name: 'details', query: {'id':recommend.id,} }"
          >
            <img :src="recommend.cover" style="width:109.09px;height:145.63px;border-bottom-radius: 10px;" />
            <!-- <div class="tags">
              <div class="tag-free" v-if="recommend.priceType === 0">特价</div>
              <div class="tag-free" v-if="recommend.priceType === 1">免费</div>
              <div class="tag-recommend" v-if="recommend.isRecommend==0">推荐</div>
            </div> -->
            <img class="cover-ban" src="../../assets/images/cover_ban.png" v-show="isAdult" />
            <p class="recommend-name">{{recommend.title}}</p>
            <div class="score">
              <div class="star">
                <img src="../../assets/images/star.png" />
                <img src="../../assets/images/star.png" />
                <img src="../../assets/images/star.png" />
                <img src="../../assets/images/star.png" />
                <img src="../../assets/images/star_un.png" />
              </div>
              <p>4.0</p>
            </div>
            <!-- <h2>{{recommend.priceType}}</h2> -->
          </router-link>
        </div>
      </div>

      <!-- <div class="category">
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
      </div>-->
      <div class="banner">
        <vue-swiper :banner="this.banner1" @bannerClick="bannerClick1" />
      </div>
      <div class="category">
        <div class="head">
          <img src="../../assets/images/home_type4.png" />
          <p>連載</p>
        </div>
        <div class="content">
          <book-update v-for="book in pursues" :key="book.id" :book="book" />
          <div class="book-empty"></div>
          </div>
          <router-link :to="{ name: 'classification', query: { type: 0, priceType: 1,}}">
            <div class="btn">
              <img src="../../assets/images/endall.png" />
              <p>查看全部连载</p>
            </div>
          </router-link>

        <div class="category">
          <div class="head" style="margin-top:10px;">
            <img src="../../assets/images/end.png" />
            <p>已完结</p>
          </div>
          <div class="content">
            <book-score v-for="book in this.specialDatas" :key="book.id" :book="book" />
            <div class="book-empty"></div>
          </div>
          <router-link :to="{ name: 'classification', query: { type: 0, priceType: 0,}}">
            <div class="btn">
              <img src="../../assets/images/endall.png" />
              <p>查看全部完结</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <sign-in :show="isShowSignIn" @close="showSignIn"></sign-in>
    <attention :show="isAttention" @close="closeAttention" @yes="setAdult"></attention>
  </div>
</template>

<script>
/*eslint-disable*/
import Book from '@/components/common/book.vue';
import BookUpdate from '@/components/common/book-update.vue';
import BookScore from '@/components/common/book-score.vue';
import VueSwiper from '@/components/common/vue-swiper.vue';
import SignIn from '@/components/home/sign-in.vue';
import Attention from '@/components/home/attention.vue';
import { hasLogin, setAdult, setUnAdult, getAdult } from '../../utils/auth';

export default {
  data() {
    return {
      isShowSignIn: false,
      show: false,
      bannerParam: {
        type: 1,
        typeNum:1,


      },
       bannerParam1: {
        type: 2,
        typeNum:1,

        },
      banner: [],
      banner1: [],
      recommends: [],
      specialData: [],
      specialDatas: [],
      bookRank: [],
      pursues: [],
      isAdult: false,
      isAttention: false,
       params: {
        // platform: this.$route.query.platform,
      }
    };

  },
  mounted() {
    this.initData();
  },

  methods: {
    initData() {
      this.isAdult = getAdult() === '1';
      console.log(this.isAdult);
      this.initBanner(this.bannerParam);
      this.initBanner(this.bannerParam1);
      this.initRecommend();
      this.freeOrSpecialPrice();
      this.cartoonEnd();
      this.gitvisitors()

      this.cartoonRank();
      this.cartoonPursue();
    },
    showSignIn() {
      if (hasLogin(this)) {
        this.isShowSignIn = !this.isShowSignIn;
      }
    },
    hiddenShow() {
      var con =document.querySelector('.Bubble')
      con.style.display="none"

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
      this.$api.banner.list(param).then((res) => {
        if (res.code === 200) {
          if (param.type === 1) {
            this.banner = res.data;
          } else {
            this.banner1 = res.data;
          }
        }
      });
    },

    initRecommend() {
      this.$api.cartoon.getRecommend().then((res) => {
        if (res.code === 200) {
          this.recommends = res.data;
        }
      });
    },
    //免费特价接口
    freeOrSpecialPrice() {
      this.$api.cartoon.freeOrSpecialPrice().then((res) => {
        if (res.code === 200) {
          this.specialData = res.data;
        }
      });
    },
    //完结接口
    cartoonEnd() {
      this.$api.cartoon.cartoonEnd().then((res) => {
        if (res.code === 200) {
          this.pursues = res.data;

        }
      });
    },
    //首页统计访问数
       gitvisitors() {
      this.$api.cartoon.gitvisitors().then((res) => {
        if (res.code === 200) {
          console.log(res.data)
        }
      });
    },



    cartoonRank() {
      this.$api.cartoon.cartoonRank().then((res) => {
        if (res.code === 200) {
          this.bookRank = res.data;
        }
      });
    },
    //连载接口
    cartoonPursue() {
      this.$api.cartoon.cartoonPursue().then((res) => {
        if (res.code === 200) {
          this.specialDatas = res.data;
        }
      });
    },
    bannerClick(banner) {
      if (banner.urlType === 0) {
        document.location = 'http://baidu.com/';
      }
      if (banner.urlType === 1) {
        this.$router.push({
          path: 'details',
          query: {
            id: banner.cartoonId,
          },
        });
      }
      if (banner.urlType === 2) {
        this.$router.push({
          path: 'wallet',
          query: {
            id: banner.cartoon_id,
          },
        });
      }
       if (banner.urlType === 3) {
        this.$router.push({
          path: 'wallet',
           query: {
           typeNum:banner.type,

          },
        });
      }
    },
    bannerClick1(banner) {
      if (banner.urlType === 0) {
        document.location = 'http://baidu.com/';
      }
      if (banner.urlType === 1) {
        this.$router.push({
          path: 'details',
          query: {
            id: banner.cartoonId,
          },
        });
      }
      if (banner.urlType === 2) {
        this.$router.push({
          path: 'wallet',
          query: {
            id: banner.cartoon_id,
          },
        });
      }
    },
  },

  components: {
    Book,
    BookUpdate,
    BookScore,
    VueSwiper,
    SignIn,
    Attention,
  },
};
</script>

<style scoped lang="less">
 .Bappleout {
 position: relative;
 left:-38px;
 top:-70px;

 }
 .Bubble{
  position: relative;
  top:40px;
  z-index:9999;
 }
 .Bubble{
   margin-top:-80px ;
 }
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
        background: url('../../assets/images/off_btn.png') no-repeat;
        background-size: 100% 100%;
      }
      .on {
        background: url('../../assets/images/on_btn.png') no-repeat;
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
          white-space: nowrap;
          min-height: 110px;
          // margin-left: 12px;
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
      .score {
        display: flex;
        align-items: center;
        .star {
          width: 138px;
          display: flex;
          justify-content: space-between;
          margin-right: 17px;
          img {
            width: 22px;
            height: 21px;
          }
        }
        p {
          font-size: 24px;
          color: #ffd000;
          font-weight: 500;
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
      .tags {
        height: 100px;
        position: absolute;
        left: 0;
        top: 155px;
        bottom: 24px;
        font-size: 18px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        > div {
          color: #fff;
          padding: 8px 14px;
          border-radius: 0 2px 2px 0;
        }
        .tag-free {
          background-color: #418df6;
          margin-bottom: 5px;
        }

        .tag-recommend {
          background-color: #ffb400;
        }
      }
    }
  }
}
</style>
