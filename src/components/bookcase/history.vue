<template>
  <div class="history">
    <div class="list" v-if="list.length > 0">
      <div class="section">
        <div class="title">7天内</div>
        <div class="content">
          <div class="item"
          v-for="(book, i) in list"
          :key="book.id">
            <div v-if="isEdit" :class="{ check: !book.checked, checked: book.checked }"></div>
            <big-book :book="book">
              <div v-if="!isEdit" class="btn">续看第{{book.episode}}话</div>
            </big-book>
            <div v-if="isEdit" @click="$emit('select', i)" class="item-mask"></div>
          </div>
        </div>
      </div>
<!--      <div class="section">-->
<!--        <div class="title">更早</div>-->
<!--        <div class="content">-->
<!--          <div class="item"-->
<!--          v-for="(book, i) in list"-->
<!--          :key="book.id">-->
<!--            <div v-if="isEdit" :class="{ check: !book.checked, checked: book.checked }"></div>-->
<!--            <big-book :book="book">-->
<!--              <div v-if="!isEdit" class="btn">续看第1话</div>-->
<!--            </big-book>-->
<!--            <div v-if="isEdit" @click="$emit('select', i)" class="item-mask"></div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <empty v-else></empty>
  </div>
</template>

<script>
import BigBook from '@/components/common/history-big-book.vue';
import Empty from '@/components/bookcase/empty.vue';

export default {
  props: ['isEdit', 'list'],
  data() {
    return {

    };
  },
  created() {
  },
  methods: {
    select() {
      console.log('dd');
    },
  },
  components: {
    BigBook,
    Empty,
  },
};
</script>

<style scoped lang="less">
  .history {
    font-size: 27px;
    .list {
      .section {
        .title {
          padding: 32px 48px;
          font-weight:400;
          color: #8B8989;
          border-bottom: 1PX solid #F1F1F1;
        }
        .content {
          padding: 30px 30px 0;
          .item {
            display: flex;
            align-items: center;
            position: relative;
            .btn {
              font-size:22px;
              font-weight: 500;
              width: 172px;
              height: 54px;
              line-height: 54px;
              text-align: center;
              color: #FFD000;
              border: 1PX solid #FFD000;
              border-radius: 30px;
              position: absolute;
              right: 0;
            }
            .check {
              width:16PX;
              height:16PX;
              border-radius:50%;
              border: 1PX solid #E5E5E5;
              margin-right: 35px;
            }
            .checked {
              width:16PX;
              height:16PX;
              border-radius:50%;
              border: 1PX solid #E5E5E5;
              margin-right: 35px;
              position: relative;
              &::after {
                content: '';
                width: 8Px;
                height: 8Px;
                border-radius:50%;
                background-color: #FFD000;
                position: absolute;
                top: 4PX;
                left: 4PX;
              }
            }
            .item-mask {
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
            }
          }
        }
      }
    }
  }
</style>
