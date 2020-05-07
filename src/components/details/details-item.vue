<template>
  <div class="details-item" @click="tapItem(chapter)">
    <div class="left">
      <img :src="chapter.cover">
      <div class="cont">
<!--        <div class="num">第{{chapter.episode}}话</div>-->
        <div class="title">{{chapter.title}}</div>
        <div class="date">{{chapter.cartoonUpdateTime}}</div>
      </div>
    </div>
    <div class="right" v-if="book.priceType !== 1">
      <div v-if="chapter.priceType === 2">
        <button class="free-btn">特价</button>
      </div>
      <div v-else>
        <div v-if="chapter.isBuy === 1">
          <button class="yet-buy-btn">已购</button>
        </div>
        <div v-else-if="chapter.isUseCoupon === 1">
          <button class="free-btn">已用优惠券</button>
        </div>
        <div v-else>
          <div v-if="chapter.specialPrice === chapter.price">
            <button class="buy-btn">{{chapter.price}}点券</button>
          </div>
          <div v-else>
            <button class="special-btn">
              <span class="old">{{chapter.price}}点券</span>
              <span>{{chapter.specialPrice}}点券</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="right">
      <button class="free-btn" >{{book.priceType}}</button>

    </div>

  </div>
</template>

<script>
import { getToken } from '../../utils/auth';

export default {
  props: ['chapter', 'book', 'totalSpecialPrice'],
  data() {
    return {
    };
  },
  methods: {
    tapItem(chapter) {
      if (chapter.priceType === 1 || chapter.isBuy === 1 || chapter.isUseCoupon === 1) {
        if (getToken()) {
          this.$router.push({
            name: 'content',
            query: {
              cartoonId: chapter.cartoonId,
              episode: chapter.episode,
              totalepisode: this.book.totalEpisode,
              bookSpeicalPrice: this.totalSpecialPrice,
              bookName: this.book.title,
            },
          });
        } else {
          this.$router.push({ path: 'login' });
        }
      } else {
        this.$emit('tap', chapter);
      }
    },

  },
};
</script>

<style scoped lang="less">
.details-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 30px;
  font-weight:500;
  margin-bottom: 70px;
  .left {
    display: flex;
    img {
      width:241px;
      height:166px;
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
        color: #8B8989;
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
      border-radius: 18PX;
      background-color: #fff;
      font-size: 21px;
    }
    .free-btn {
      color: #418DF6;
      border: 1PX solid #418DF6;
    }
    .yet-buy-btn {
      color: #8B8989;
      border: 1PX solid #8B8989;
    }
    .buy-btn {
      color: #FFD000;
      border: 1PX solid #FFD000;
    }
    .special-btn {
      color: #FFD000;
      border: 1PX solid #FFD000;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 20PX;
      .old {
        margin-bottom: 5px;
        text-decoration: line-through;
      }
    }
  }
}
</style>
