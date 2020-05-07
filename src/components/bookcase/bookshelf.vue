<template>
  <div class="bookshelf">
    <div class="list" v-if="list.length > 0">
      <div class="item"
        v-for="(book, index) in list"
        :key="book.id">
        <book-update :book="book"/>
        <div class="book-mask" @click="$emit('select', index)" v-if="isEdit">
          <div class="book-img"></div>
          <img class="icon" :src="book.checked ? iconYes : iconNo">
        </div>
      </div>
      <div class="book-empty"></div>
    </div>
    <empty v-else></empty>
  </div>
</template>

<script>
import BookUpdate from '@/components/common/book-update.vue';
import Empty from '@/components/bookcase/empty.vue';
import iconNo from '@/assets/images/bookcase_no.png';
import iconYes from '@/assets/images/bookcase_yes.png';

export default {
  props: ['isEdit', 'list'],
  data() {
    return {
      iconNo,
      iconYes,
    };
  },
  components: {
    BookUpdate,
    Empty,
  },
};
</script>

<style scoped lang="less">
  .bookshelf {
    position: relative;
    .list {
      padding: 29px 32px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .item {
        position: relative;
        .book-mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;

          .book-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 218px;
            height:291px;
            z-index: 2;
            background-color: #000;
            border-radius: 10px;
            opacity:0.5;
          }
          .icon {
            position: absolute;
            top: 13px;
            right: 13px;
            width:31px;
            height:31px;
            z-index: 3;
          }
        }
      }
    }
  }
</style>
