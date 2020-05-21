<template>
  <div class="details-item" @click="tapItem(book,chapter)">
    <div class="left">
      <img :src="chapter.cover" />
      <div class="cont">
        <!--        <div class="num">第{{chapter.episode}}话</div>-->
        <div class="title">{{chapter.title}}</div>
        <div class="date">{{chapter.cartoonUpdateTime}}</div>
          <!-- <div class="date">{{book.serialized}}</div> -->

      </div>
    </div>
    <div class="right" v-if="book.priceType !== 3" >
      <div v-if="book.priceType === 1">

        <button class="free-btn">免费</button>

      </div>
         <div v-else-if="chapter.exemption === 1">

        <button class="free-btn">免费</button>

      </div>

      <div v-else>
        <div v-if="chapter.isBuy === 1">
          <button class="yet-buy-btn">已购</button>
        </div>
        <div v-else-if="chapter.isUseCoupon === 1">
          <button class="free-btn">已用优惠券</button>
        </div>
        <div v-else-if="book.priceType !== 1">
          <div v-if="book.specialPrice === book.price">
            <button class="buy-btn">{{book.price}}点券</button>

          </div>

          <div v-else>
            <button class="special-btn">
              <span v-if="book.specialPrice !== book.price" class="old">{{book.price}}点券</span>
              <span>{{book.specialPrice}}点券</span>

            </button>
          </div>

        </div>
      </div>
    </div>
    <div v-else class="right">
    </div>
  </div>
</template>

<script>
// import BuyChapterPopup from '@/components/common/buy-chapter-popup.vue';
import { getToken } from '../../utils/auth';


export default {
  props: ['chapter', 'book', 'totalSpecialPrice'],
  data() {
    return {

    };
  },
  methods: {
    // eslint-disable-next-line vue/no-dupe-keys
    tapItem(book, chapter) {
      if (chapter.exemption === 1 || book.priceType === 1 || chapter.isBuy === 1 || chapter.isUseCoupon === 1) {
        debugger;
        if (getToken()) {
          this.$router.push({
            name: 'content',
            query: {
              cartoonId: this.chapter.cartoonId,
              episode: this.chapter.episode,
              totalepisode: this.chapter.totalEpisode,
              bookSpeicalPrice: this.totalSpecialPrice,
              specialPrice: this.chapter.specialPrice,
              bookName: this.chapter.title,
              book: this.book,


            },
          });
        } else {
          this.$router.push({ path: 'login' });
        }
      } else {
        debugger;
        this.$emit('tap', book, chapter);
      }
    },

  },
  components: {

    // BuyChapterPopup,
  },
};
</script>

<style scoped lang="less">
.details-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 70px;
  .left {
    display: flex;
    img {
      width: 241px;
      height: 166px;
      border-radius: 8px;
      margin-right: 32px;
    }
    .cont {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .num {
        margin-bottom: 20px;
      }
      .title {
        margin-bottom: 59px;
        width: 264px;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .date {
        color: #8b8989;
        font-weight: 400;
        font-size: 27px;
      }
    }
  }
  .right {
    button {
      padding: 14px 0;
      width: 120px;
      text-align: center;
      border-radius: 18px;
      background-color: #fff;
      font-size: 21px;
    }
    .free-btn {
      color: #418df6;
      border: 1px solid #418df6;
    }
    .yet-buy-btn {
      color: #8b8989;
      border: 1px solid #8b8989;
    }
    .buy-btn {
      color: #ffd000;
      border: 1px solid #ffd000;
    }
    .special-btn {
      color: #ffd000;
      border: 1px solid #ffd000;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 20px;
      .old {
        margin-bottom: 5px;
        text-decoration: line-through;
      }
    }
  }
}
</style>
