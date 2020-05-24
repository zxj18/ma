<template>
  <div class="details">
    <header-box :name="book.title" @back="back">
      <router-link :to="{ name: 'home'}">
        <img class="icon-home" src="../assets/images/content_home.png">
      </router-link>
      <router-link :to="{ name: 'bookcase'}">
        <img class="icon-bookcase" src="../assets/images/content_bookcase.png">
      </router-link>
    </header-box>
    <div class="banner">
      <img class="banner" :src="book.detailCover">
<!--      <img class="banner" src="../assets/images/mine_bg.png">-->
      <div class="tags">
        <div class="tag-free" v-if="book.priceType === 1">免费</div>
        <div class="tag-recommend" v-if="book.isRecommend === 1">推荐</div>
      </div>
    </div>
    <div class="info">
      <div class="top">
        <div :class="book.isFav === 1  ? 'name' : 'name-joined'">{{book.title}}</div>
        <button
          class="btn"
          @click="tapJoin"
          v-bind:class="{ joined: book.isFav === 1 }"
          >
          {{book.isFav === 1  ? '已加入书架' : '加入书柜'}}
        </button>
      </div>
      <div class="bottom">
        <div class="comic-info">
          <span class="comic-status"  v-if="book.serialized === 1">连载中</span>
            <span class="comic-status"  v-if="book.serialized === 0">完结</span>
          <span>至第{{book.totalEpisode}}话</span>
          <span class="round">·</span>
          <span class="author" v-if="book.author">作家：{{book.author}}</span>
          <span class="author" v-else>作家：匿名</span>
        </div>
        <div  @click="goPage('score')">
          <div class="go-score">
            去评分
          </div>
        </div>
        <div class="rank">
          <div>
            <span>人气：</span>
            <span class="highlight" v-if="book.readTimes">{{book.readTimes}}</span>
            <span class="highlight" v-else>0</span>
          </div>
          <div class="score-box">
            <span>评分：</span>
            <div class="score">
              <div class="star">
                <img src="../assets/images/star.png" v-if="book.score>=1">
                <img src="../assets/images/star.png" v-if="book.score>=2">
                <img src="../assets/images/star.png" v-if="book.score>=3">
                <img src="../assets/images/star.png" v-if="book.score>=4">
                <img src="../assets/images/star.png" v-if="book.score>=5">
                <img src="../assets/images/star_un.png" v-if="book.score<1">
                <img src="../assets/images/star_un.png" v-if="book.score<2">
                <img src="../assets/images/star_un.png" v-if="book.score<3">
                <img src="../assets/images/star_un.png" v-if="book.score<4">
                <img src="../assets/images/star_un.png" v-if="book.score<5">
              </div>
              <p>{{this.score()}}</p>
            </div>
          </div>
        </div>
        <div class="desc">{{book.description}}</div>
      </div>
    </div>
    <div class="directory">
      <div class="head">
        <div class="left">
          <p>目录</p>
          <div v-if="book.isHistory===0"></div>
          <div v-if="book.isHistory===1">上次看到第{{book.history}}话</div>
        </div>
        <select-box
          :text="text"
          :list="list"
          @choose="choose"
        ></select-box>
      </div>
      <div class="content">
        <details-item
          v-for="item in bookList"
          :key="item.id"
          :chapter="item"
          :book="book"
          :totalSpecialPrice = "totalSpecialPrice"
          @tap="tapItem"
        ></details-item>
      </div>
    </div>
    <div class="footer"  v-if="!isAllBuy">

      <div class="price" v-show="book.priceType === 0" >
        <p>购买全部章节:</p>
        <div class="highlight num" >{{this.totalSpecialPrice}}点</div>
        <!-- <div class="highlight num" v-if="book.price!==book.specialPrice">{{ (book.totalEpisode-book.startingChapter+1)*book.specialPrice}}点</div>
        <div class="tips" v-if="book.price!==book.specialPrice">立省{{(book.price-book.specialPrice)*book.totalEpisode-book.startingChapter+1}}点</div>
        <div class="tips" v-if="book.price===book.specialPrice"></div> -->
      </div>
      <button class="btn" v-show="book.priceType === 0" v-if="book.serialized ===0" @click="tapBuy">全部购买</button>
    </div>
    <charge-fail-popup
      v-if="isShowFailPopup"
      @select="failPopupSelect">
    </charge-fail-popup>

    <buy-chapter-popup
      v-if="isShowBuyPopup"
      :book="book"
      :chapter="chapter"
      :bookSpeicalPrice="this.totalSpecialPrice"
      @select="buyPopupSelect">
    </buy-chapter-popup>
  </div>
</template>

<script>
import SelectBox from '@/components/common/select-box.vue';
import HeaderBox from '@/components/common/header.vue';
import DetailsItem from '@/components/details/details-item.vue';
import ChargeFailPopup from '@/components/common/charge-fail-popup.vue';
import BuyChapterPopup from '@/components/common/buy-chapter-popup.vue';
import { getToken } from '../utils/auth';

export default {
  data() {
    return {
      book: '',
      text: '顺序',
      list: ['顺序', '倒序'],
      isShowFailPopup: false,
      isShowBuyPopup: false,
      chapter: '',
      bookList: [],
      totalPrice: '',
      totalSpecialPrice: '',
      isAllBuy: '',
      isAllFree: true,
      params: {
        cartoonId: this.$route.query.id,
        cartoonIds: '',
      },
      listParams: {
        cartoonId: this.$route.query.id,
        pageNum: 1,
        pageSize: 500,
      },
      buyParams: {
        cartoonId: this.$route.query.id,
        chapterId: '',
        totalPrice: '',
      },
      fromPath: '',
    };
  },
  created() {
    this.getDetail();
    this.getCartoonContentsList();
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fromPath = from.path;
    });
  },
  methods: {
    score() {
      let score = 0;
      if (this.book.score > 5) {
        score = Math.floor((this.book.score - 5) * 10) / 10;
      } else {
        score = Math.floor(this.book.score * 10) / 10;
      }
      score = score.toFixed(1);
      return score;
    },
    goPage(page) {
      if (this.token()) {
        this.$router.push({ name: page });
      } else {
        this.$router.push({ name: 'login' });
      }
    },
    token() {
      return getToken();
    },
    back() {
      if (this.fromPath === '/content') {
        this.$router.push({ path: '/' });
      } else {
        this.$router.go(-1);
      }
    },
    choose(val) {
      if (this.text === val) {
        return;
      }
      this.text = val;
      this.bookList = this.bookList.reverse();
    },
    tapBuy() {
      this.chapter = '';
      this.isShowBuyPopup = true;
    },
    tapItem(book, chapter) {
      console.log(chapter);
      this.chapter = chapter;
      this.isShowBuyPopup = true;
    },
    tapJoin() {
      if (this.book.isFav === 1) {
        this.delBook();
      } else {
        this.addBook();
      }
    },
    delBook() {
      this.params.cartoonIds = this.params.cartoonId;
      this.$api.fav.delCartoonFromFav(this.params).then((res) => {
        if (res.code === 200) {
          this.book.isFav = 0;
        }
      });
    },
    addBook() {
      this.$api.fav.addCartoonToFav(this.params).then((res) => {
        if (res.code === 200) {
          this.book.isFav = 1;
        }
      });
    },
    failPopupSelect(index) {
      if (index) {
        this.$router.push({ name: 'wallet' });
      }
      this.isShowFailPopup = false;
    },
    buyPopupSelect(selectItem, buttonIndex) {
      // debugger;
      if (buttonIndex === 1) {
        if (!getToken()) {
          this.$router.push({ name: 'login' });
        } else {
          if (selectItem === 1) {
            this.buyParams.chapterId = '';
            this.buyParams.totalPrice = this.totalSpecialPrice;
          } else {
            this.buyParams.chapterId = this.chapter.episode;
          }
          this.$api.user.buyCartoon(this.buyParams).then((res) => {
            if (res.code === 200) {
              this.addBook();
              this.isShowBuyPopup = false;
              this.getCartoonContentsList();
              console.log(res.data);
            } else {
              this.isShowFailPopup = true;
            }
          });
        }
      } else if (buttonIndex === 0) {
        this.isShowBuyPopup = false;
      }
    },
    getDetail() {
      this.$api.cartoon.getCartoonDetail(this.params).then((res) => {
        if (res.code === 200) {
          this.book = res.data;
          if (this.book.priceType === 1) {
            this.isAllFree = true;
          }
        }
      });
    },
    getCartoonContentsList() {
      this.$api.cartoon.getCartoonContentsList(this.listParams).then((res) => {
        if (res.code === 200) {
          this.bookList = res.data.content;
          console.log(res.data);
          this.totalSpecialPrice = res.data.totalSpecialPrice;
          this.totalPrice = res.data.totalPrice;
          this.isAllBuy = res.data.isAllBuy;
          for (let i = 0; i < this.bookList.length; i += 1) {
            if (this.bookList[i].priceType !== 1 && this.bookList[i].isBuy !== 1 && this.bookList[i].isUseCoupon !== 1) {
              this.isAllFree = false;
            }
          }
        }
      });
    },
  },
  components: {
    SelectBox,
    HeaderBox,
    DetailsItem,
    ChargeFailPopup,
    BuyChapterPopup,
  },
};
</script>

<style scoped lang="less">
  .details{
    font-size: 27px;
    font-weight:400;
    position: relative;
    padding-bottom: 116px;
    .icon-home{
      width:39px;
      height:39px;
    }
    .icon-bookcase {
      width:34px;
      height:41px;
      margin-left: 44px;
    }
    .banner {
      height: 300px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .tags {
        height: 100px;
        position: absolute;
        left: 0;
        top: 33px;
        font-size: 18px;
        display: flex;
        flex-direction: column;

        >div {
          color: #fff;
          padding: 8px 14px;
          border-radius: 0 2PX 2PX 0;
        }

        .tag-free {
          background-color: #418DF6;
          margin-bottom: 5px;
        }

        .tag-recommend {
          background-color: #FFB400;
        }
      }
    }
    .btn {
      background-color: #FFD000;
      border-radius: 40px;
      padding: 18px 38px;
      font-weight:400;
      font-size: 27px;
      &:disabled {
        color: #fff;
        background-color: #B5B4B4;
      }
    }
    .highlight {
      color: #FFD000;
    }
    .info {
      padding: 55px 36px 60px;
      box-shadow:0px 4px 21px 0px rgba(14,5,10,0.12);
      .top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 25px;
        align-items: center;
        .name {
          width: 460px;
          font-size: 48px;
          font-weight:500;
          color: #231815;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .name-joined {
          width: 460px;
          font-size: 48px;
          font-weight:500;
          color: #231815;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .joined {
          background: #B5B4B4;
          color: #fff;
        }
      }
      .bottom {
        position: relative;
        color: #8B8989;
        .comic-info {
          margin-bottom: 35px;
        }
        .comic-status {
          margin-right: 23px;
        }
        .round {
          margin: 0 23px;
        }
        .go-score {
          font-size: 27px;
          position: absolute;
          display: inline-block;
          border-bottom: 1PX solid #FFD000;
          color: #FFD000;
          top: 56px;
          right: 20px;
          padding-bottom: 12px;
        }
        .rank {
          color: #8B8989;
          margin-bottom: 50px;
          display: flex;
          align-items: center;
          .score-box {
            margin-left: 40px;
            display: flex;
            align-items: center;
            .score {
              display: flex;
              align-items: center;
              .star {
                width: 138px;
                display: flex;
                justify-content: space-between;
                margin-right: 17px;
                img {
                  width:22px;
                  height:21px;
                }
              }
              p {
                font-size:24px;
                color: #FFD000;
                font-weight:500;
              }
            }
          }
        }
        .desc {
          width: 680px;
          color: #231815;
          font-size: 24px;
          line-height: 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
    .directory {
      padding: 0 40px;
      .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 67px 0 61px;
        .left {
          display: flex;
          align-items: center;
          p {
            font-size: 34px;
            color: #231815;
            font-weight: bold;
            margin-right: 24px;
          }
          div {
            color: #418DF6;
            font-size: 27px;
          }
        }
      }
    }
    .footer {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 116px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 36px;
      box-sizing: border-box;
      border-top: 1PX solid #F1F1F1;
      background-color: #fff;
      .price {
        display: flex;
        align-items: center;
        justify-content: center;
        p {
          font-size: 22px;
        }
        .num {
          font-size: 42px;
          margin-right: 20px;
          margin-left: 16px;
        }
        .tips {
          color: #B5B4B4;
          font-size: 25px;
        }
      }
    }
  }
</style>
