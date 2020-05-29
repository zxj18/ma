<template>
  <router-link :to="{ name: 'details', query: {id: book.id} }">
    <div class="big-book" v-if="book">
      <div class="left">
        <img class="picture" :src="book.cover">
         <div class="cover-ban"  v-if="book.isAdult ===1">
        <img class="cover-ban" src="../../assets/images/cover_ban.png">
        </div>
      </div>
      <div class="content">
        <div class="title">{{book.title}}</div>
        <div class="chapter">{{book.introduce}}</div>
       <div class="update">更新到第{{book.totalEpisode}}话</div>
      </div>
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
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.isAdult = getAdult() === '1';
    },
  },
};
</script>

<style scoped lang="less">
  .big-book {
    font-size: 27px;
    display: flex;
    align-items: center;
    margin-bottom: 37px;
    .left {
      position: relative;
      margin-right: 38px;
      .picture {
        width:218px;
        height:291px;
        border-radius: 10px;
      }
      .cover-ban {
        display: block;
        position: absolute;
        width: 50px;
        height: 50px;
        top: 2.5%;
        right: 2.5%;
      }
    }
    .content {
      max-width: 256px;
      .title {
        font-size: 38px;
        font-weight:500;
        margin-bottom: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .chapter {
        color: #3F3633;
        font-weight:400;
        margin-bottom: 43px;
        font-size:30px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .update {
        color: #8B8989;
        font-weight:400;
      }
    }
  }
</style>
