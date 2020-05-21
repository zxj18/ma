<template>
  <router-link :to="{ name: 'details', query: {id: book.id} }" v-if="book">
    <div class="book">
      <div class="picture-box">
        <div class="cover-ban"  v-if="book.isAdult ===1">
        <img src="../../assets/images/cover_ban.png" style="width:20px;height:20px;"/>
        </div>

        <img class="picture" :src="book.cover" >
        <div class="tags">
          <div class="tag-free" v-if="book.priceType==1">免费</div>
          <div class="tag-free" v-if="book.priceType==0">特价</div>

          <div class="tag-recommend" v-if="book.isRecommend==1">推荐</div>
        </div>
      </div>
      <p class="title">{{book.title}}</p>
      <slot></slot>
    </div>
  </router-link>
</template>

<script>
import { getAdult } from '../../utils/auth';

export default {
  props: ['book'],
  data() {
    return {
      isAdult: false,
    };
  },
  methods: {
    initData() {
      this.isAdult = getAdult() === '1';
    },
  },
  mounted() {
    this.initData();
  },
};
</script>

<style scoped lang="less">
  .book {
    width: 218px;
    margin-bottom: 30px;

    .picture-box {
      position: relative;
      height:291px;
      .cover-ban {
        display: block;
        position: absolute;
        width: 50px;
        height: 50px;
        top: 2.5%;
        right: 2.5%;
      }
      .picture {
        width: 100%;
        height:100%;
        border-radius: 10px;
      }
      .tags {
        height: 100px;
        position: absolute;
        left: 0;
        bottom: 24px;
        font-size: 18px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

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

    .title {
      margin: 30px 0 22px;
      color: #231815;
      font-weight:500;
      font-size:30px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
