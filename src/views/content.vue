<template>
  <div class="comic">
    <div class="header" v-show="isShowHeader">
      <header-box :name="this.title" @back="back">
        <router-link :to="{ name: 'home'}">
          <img class="icon-home" src="../assets/images/content_home_white.png">
        </router-link>
        <router-link :to="{ name: 'bookcase'}">
          <img class="icon-bookcase" src="../assets/images/content_bookcase_white.png">
        </router-link>
      </header-box>
    </div>
    <div class="content" @click="tapMain" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <img class="chapter-ban" src="../assets/images/chapter_ban.png" v-show="isAdult">
      <img v-for="(item, index) in list" :key="index" :src="item.url" >
      <p v-show="infiniteMsgShow" class="tips">加载更多ing</p>
      <p v-show="!infiniteMsgShow" class="tips"> 没有更多数据</p>
    </div>
    <div class="directory" id="directory" v-if="isShowDirectory">
      <div v-for="chapter in chapterList" :key="chapter.id" class="item" @click="tapContentItem(chapter.episode, true)">
        <img :src="chapter.cover" v-bind:id="'chapter' + chapter.episode" v-bind:class="[{ 'chapter-selected': chapter.episode ==  episode}, {}]">
        <p>{{chapter.title}}</p>
      </div>
    </div>
    <div class="recommend" v-if="isShowRecommend">
      <p class="name">为你推荐</p>
      <div class="recommend-cont">
        <book class="book-box"></book>
        <book class="book-box"></book>
        <book class="book-box"></book>
        <book class="book-box"></book>
      </div>
    </div>
    <div class="footer" v-show="isShowFooter" >
      <div class="title" @click="tapDirectory">目录</div>
      <div class="switch">
        <img :src="isUpClick ? iconUpYes : iconUpNo">
        <p :class="{disable: !isUpClick }" @click="pre">上一话</p>
      </div>
      <div class="switch">
        <p :class="{disable: !isDownClick }" @click="next">下一话</p>
        <img :src="isDownClick ? iconDownYes : iconDownNo">
      </div>
      <div @click="tapGoTop">
        <div class="go-top">
          <p>到顶</p>
          <div class="icon-top"></div>
        </div>
      </div>
    </div>
    <charge-fail-popup
      v-if="isShowFailPopup"
      @select="failPopupSelect">
    </charge-fail-popup>
    <buy-chapter-popup
      v-if="isShowBuyPopup"
      :chapter="chapter"
      :bookSpeicalPrice="bookSpeicalPrice"
      @select="buyPopupSelect">
    </buy-chapter-popup>
  </div>
</template>

<script>
import HeaderBox from '@/components/common/header-content.vue';
import Book from '@/components/common/book.vue';
import ChargeFailPopup from '@/components/common/charge-fail-popup.vue';
import BuyChapterPopup from '@/components/common/buy-chapter-popup.vue';
import iconUpNo from '@/assets/images/content_up_no_white.png';
import iconUpYes from '@/assets/images/content_up_yes_white.png';
import iconDownNo from '@/assets/images/content_down_no_white.png';
import iconDownYes from '@/assets/images/content_down_yes_white.png';
import { getToken, getAdult } from '../utils/auth';

export default {
  data() {
    return {
      chapter: '',
      list: [],
      isShowFailPopup: false,
      isShowBuyPopup: false,
      iconUpNo,
      iconUpYes,
      iconDownNo,
      iconDownYes,
      isUpClick: true,
      isDownClick: false,
      isShowRecommend: false,
      isShowFooter: true,
      isShowHeader: true,
      isShowDirectory: false,
      initScroll: 0,
      bookSpeicalPrice: this.$route.query.bookSpeicalPrice,
      totalEpisode: this.$route.query.totalepisode,
      cartoonId: this.$route.query.cartoonId,
      episode: this.$route.query.episode,
      title: this.$route.query.bookName,
      params: {
        pageNum: 1,
        pageSize: 10,
        cartoonId: this.$route.query.cartoonId,
        episode: this.$route.query.episode,
      },
      listParams: {
        cartoonId: this.$route.query.cartoonId,
        pageNum: 1,
        pageSize: 500,
      },
      chapterList: [],
      buyParams: {
        cartoonId: this.$route.query.cartoonId,
        chapterId: '',
      },
      busy: true,
      isPre: false,
      infiniteMsgShow: false,
      isAdult: false,
    };
  },
  created() {
    this.getContentDetailList();
    this.getCartoonContentsList();
    this.checkStatus();
    this.initData();
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true);
  },
  methods: {
    initData() {
      this.isAdult = getAdult() === '1';
      console.log(this.isAdult);
    },
    back() {
      this.$router.push({
        name: 'details',
        query: { id: this.cartoonId },
      });
    },
    pre() {
      const episode = parseInt(this.episode, 10) - 1;
      if (episode < 1) {
        return;
      }
      this.isPre = true;
      this.tapContentItem(episode);
    },
    next() {
      const episode = parseInt(this.episode, 10) + 1;
      if (episode > this.totalEpisode) {
        return;
      }
      this.isPre = false;
      this.tapContentItem(episode);
    },
    addBook() {
      this.$api.fav.addCartoonToFav(this.params).then((res) => {
        console.log(res);
        console.log('addBook');
      });
    },
    checkStatus() {
      this.isDownClick = this.totalEpisode !== this.episode && this.totalEpisode > this.episode;
      this.isUpClick = parseInt(this.episode, 10) > 1;
    },
    failPopupSelect(index) {
      if (index) {
        console.log('去充值');
      }
      this.isShowFailPopup = false;
    },
    buyPopupSelect(selectItem, buttonIndex) {
      if (buttonIndex === 1) {
        if (!getToken()) {
          this.$router.push({ name: 'login' });
        } else {
          if (selectItem === 1) {
            this.buyParams.chapterId = '';
          } else {
            if (this.pre) {
              this.episode = parseInt(this.episode, 10) - 1;
            } else {
              this.episode = parseInt(this.episode, 10) + 1;
            }
            this.params.episode = this.episode;
            this.buyParams.chapterId = this.params.episode;
          }
          this.$api.user.buyCartoon(this.buyParams).then((res) => {
            if (res.code === 200) {
              this.addBook();
              this.getCartoonTapItem(this.params.episode);
            } else {
              this.isShowFailPopup = true;
            }
          });
        }
      } else if (buttonIndex === 0) {
        this.isShowBuyPopup = false;
      }
    },
    tapMain() {
      this.isShowHeader = !this.isShowHeader;
      this.isShowFooter = !this.isShowFooter;
      // this.isShowFooter = this.isShowDirectory ? false : !this.isShowFooter;
      this.isShowDirectory = false;
    },
    tapDirectory() {
      this.isShowFooter = false;
      this.isShowDirectory = !this.isShowDirectory;
      this.scrollToEpisode();
    },
    tapGoTop() {
      document.scrollingElement.scrollTop = 0;
    },
    tapContentItem(episode, isScrollTo = false) {
      let i;
      let needBuy = true;
      for (i = 0; i < this.chapterList.length; i += 1) {
        if (this.chapterList[i].episode === episode) {
          this.chapter = this.chapterList[i];
          if (this.chapterList[i].isBuy === 1 || this.chapterList[i].priceType === 1 || this.chapterList[i].isUseCoupon === 1) {
            needBuy = false;
            break;
          }
        }
      }
      console.log('needBuy');
      console.log(needBuy);
      if (needBuy) {
        this.isShowBuyPopup = true;
      } else {
        this.isShowBuyPopup = false;
        this.getContentDetailList(episode);
        if (isScrollTo) {
          document.querySelectorAll('.chapter-selected')[0].classList.remove('chapter-selected');
          document.getElementById(`chapter${this.params.episode}`).classList.add('chapter-selected');
          this.scrollToEpisode();
        }
      }
    },
    getContentDetailList(episode) {
      if (episode) {
        if (this.episode !== episode) {
          this.params.pageNum = 1;
          this.list = [];
        }
        this.episode = episode;
        this.params.episode = episode;
      }
      this.$api.cartoon.getCartoonContentsDetailList(this.params).then((res) => {
        if (res.code === 200) {
          const lists = res.data.content;
          for (let i = 0; i < lists.length; i += 1) {
            this.list.push({ ...lists[i] });
          }
          if (this.params.pageNum < res.data.totalPages) {
            this.busy = false;
            console.log(this.busy);
          } else if (this.params.pageNum === res.data.totalPages) {
            this.infiniteMsgShow = false;
          }
          this.checkStatus();
        }
      });
    },
    getCartoonContentsList() {
      this.$api.cartoon.getCartoonContentsList(this.listParams).then((res) => {
        if (res.code === 200) {
          this.chapterList = res.data.content;
        }
      });
    },
    getCartoonTapItem(episode) {
      this.$api.cartoon.getCartoonContentsList(this.listParams).then((res) => {
        if (res.code === 200) {
          this.chapterList = res.data.content;
          this.tapContentItem(episode, true);
        }
      });
    },
    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      const scroll = scrollTop - this.i;
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      this.i = scrollTop;
      if (scroll < 0 || scrollTop + windowHeight === scrollHeight) {
        this.isShowHeader = true;
        this.isShowFooter = true;
      } else {
        this.isShowHeader = false;
        this.isShowFooter = false;
      }
    },
    scrollToEpisode() {
      setTimeout(() => {
        document.getElementById(`chapter${this.episode}`).classList.remove('chapter-selected');
        document.getElementById(`chapter${this.params.episode}`).classList.add('chapter-selected');
        document.getElementById('directory').scrollTo({
          left: document.querySelector('.chapter-selected').offsetLeft,
          behavior: 'smooth',
        });
      }, 100);
    },
    loadMore() {
      this.infiniteMsgShow = true;
      this.params.pageNum += 1;
      this.busy = true;
      this.getContentDetailList();
    },
  },
  components: {
    HeaderBox,
    Book,
    ChargeFailPopup,
    BuyChapterPopup,
  },
};
</script>

<style scoped lang="less">
  .comic {
    .header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      .icon-home{
        width:39px;
        height:39px;
      }
      .icon-bookcase {
        width:34px;
        height:41px;
        margin-left: 44px;
      }
    }
    .content {
      img {
        font-size: 0;
        display: block;
        width: 100%;
      }
      .tips {
        margin-top: 50px;
        margin-bottom: 50px;
        text-align: center;
      }
    }
    .directory {
      padding: 25px 24px 30px;
      display: flex;
      width: 100%;
      box-sizing: border-box;
      background-color: #fff;
      position: fixed;
      left: 0;
      bottom: 0;
      overflow-x: scroll;
      overflow-y: hidden;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 25px;
        .chapter-selected {
            border: 5PX solid #FFCC00;
            border-radius: 4PX;
        }
        img {
          width:241px;
          height:166px;
          margin-bottom: 25px;
          border-radius: 10px;
        }
        p {
          color: #231815;
          font-size: 30px;
          font-weight: 500;
        }
      }
    }
    .recommend {
      position: fixed;
      bottom: 98px;
      z-index: 1;
      border-bottom:1px solid #E9E9E9;
      background-color: #fff;
      width: 100%;
      padding: 30px 30px 0;
      .name {
        font-weight:bold;
        font-size: 34px;
        color: #231815;
        margin-bottom: 30px;
      }
      .recommend-cont {
        width: 690px;
        display: flex;
        overflow-x: scroll;
        overflow-y: hidden;
        .book-box {
          margin-right: 17px;
          margin-bottom: 0;
        }
      }
    }
    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 98px;
      background-color: #000;
      position: fixed;
      left: 0;
      bottom: 0;
      font-size: 30px;
      font-weight:400;
      z-index: 2;
      >div {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1PX solid #A0A0A0;
        &:last-child {
          border-right: 0;
        }
        .go-top {
          font-size:25px;
          padding: 10px 23px;
          display: flex;
          justify-content: center;
          color: #fff;
          border: 1PX solid #fff;
          .icon-top {
            width: 0;
            height: 0;
            border: 9px solid;
            border-color: transparent transparent #fff;
            margin: -2px 0 0 9px;
          }
        }
      }
      .title {
        font-weight:500;
        font-size: 32px;
        color: #fff;
      }
      .switch {
        img {
          width: 30px;
          height: 30px;
          margin: 0 12px;
        }
        p {
          color: #fff;
        }
        .disable {
          color: #AFAEAE;
        }
      }
    }
  }
</style>
