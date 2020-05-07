<template>
  <div class="book-update">
    <book v-if="book" :book="book" >
      <div class="update">
        更新至第{{book.currentEpisode}}话
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
  .update {
    font-size: 27px;
    font-weight: 400;
    color: #8B8989;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
