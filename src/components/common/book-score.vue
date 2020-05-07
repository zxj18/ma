<template>
  <div class="book-score">
    <book :book="book">
      <div class="score">
        <div class="star">
          <img src="../../assets/images/star.png" v-if="this.score>=1">
          <img src="../../assets/images/star.png" v-if="this.score>=2">
          <img src="../../assets/images/star.png" v-if="this.score>=3">
          <img src="../../assets/images/star.png" v-if="this.score>=4">
          <img src="../../assets/images/star.png" v-if="this.score>=5">
          <img src="../../assets/images/star_un.png" v-if="this.score<1">
          <img src="../../assets/images/star_un.png" v-if="this.score<2">
          <img src="../../assets/images/star_un.png" v-if="this.score<3">
          <img src="../../assets/images/star_un.png" v-if="this.score<4">
          <img src="../../assets/images/star_un.png" v-if="this.score<5">
        </div>
        <p v-if="book.score">{{this.score}}</p>
      </div>
    </book>
  </div>
</template>

<script>
import Book from './book.vue';

export default {
  props: ['book'],
  data() {
    return {
      score: 0,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.book.score > 5) {
        this.score = Math.floor((this.book.score - 5) * 10) / 10;
      } else {
        this.score = Math.floor(this.book.score * 10) / 10;
      }
      this.score = this.score.toFixed(1);
    },
  },
  components: {
    Book,
  },
};
</script>

<style scoped lang="less">
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
</style>
