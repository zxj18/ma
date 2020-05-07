<template>
  <div class="special-offer">
    <book-special></book-special>
    <book-special></book-special>
    <book-special></book-special>
    <book-special></book-special>
    <div class="book-empty"></div>
  </div>
</template>

<script>
import BookSpecial from '@/components/common/book-special.vue';

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
    BookSpecial,
  },
};
</script>

<style scoped lang="less">
  .special-offer {
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
</style>
