<template>
  <div class="book-special">
    <book>
      <div class="special">
        <div class="price-box">
          <div class="price">243点券</div>
          <div class="tag">秒杀</div>
        </div>
        <div class="old-price">
          388点券
        </div>
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

    };
  },
  methods: {

  },
  components: {
    Book,
  },
};
</script>

<style scoped lang="less">
  .special {
    .price-box {
      display: flex;
      align-items: center;
      color: #EB0404;
      .price {
        font-size: 27px;
        font-weight:bold;
      }
      .tag {
        font-size: 22px;
        padding: 2px 4px;
        border: 1PX solid #EB0404;
        border-radius: 3px;
        margin-left: 7px;
      }
    }
    .old-price {
      font-size: 26px;
      color: #B1B1B1;
      text-decoration: line-through;
      margin-top: 13px;
    }
  }
</style>
