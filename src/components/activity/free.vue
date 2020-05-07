<template>
  <div class="free">
    <book-score></book-score>
    <book-score></book-score>
    <book-score></book-score>
    <book-score></book-score>
    <div class="book-empty"></div>
  </div>
</template>

<script>
import BookScore from '@/components/common/book-score.vue';

export default {
  data() {
    return {

    };
  },
  created() {
  },
  methods: {

  },
  components: {
    BookScore,
  },
};
</script>

<style scoped lang="less">
  .free {
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
</style>
