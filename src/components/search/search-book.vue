<template>
  <router-link :to="{ name: 'details', query: {'id':book.id,}}">
    <div class="big-book">
      <div class="left">
        <img class="picture" :src="book.cover">
        <img class="cover-ban" src="../../assets/images/cover_ban.png" v-show="isAdult">
      </div>
      <div class="content">
        <div class="title">
          <p>{{book.title}}</p>
        </div>
        <div class="author">作者：{{book.author}}</div>
        <div class="update">更新到第{{book.currentEpisode}}话</div>
      </div>
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
      margin-right: 43px;
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
      .title {
        font-size: 38px;
        font-weight:500;
        display: flex;
        margin-bottom: 46px;
        p {
          max-width: 400px;
          color: #FFB424;
          margin-right: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .author {
        color: #8B8989;
        font-weight:400;
        margin-bottom: 20px;
      }
      .update {
        width: 400px;
        color: #8B8989;
        font-weight:400;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>
