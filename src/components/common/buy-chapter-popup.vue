<template>
  <confirm
    :buttons="['关闭', { title: '确认', active: true }]"
    @select="failPopupSelect">
    <div class="buy-popus">
      <p class="title">购买该章节</p>
      <div class="cont">
        <div class="item"
          v-for="item in list"
          :key="item.id"
          @click="selectItem(item)">
          <div class="info">
            <div :class="{ check: !item.checked, checked: item.checked }"></div>
            <p>{{item.name}}</p>
          </div>
          <button v-if="item.price" class="buy-btn">{{item.price}}</button>
        </div>
      </div>
    </div>
  </confirm>
</template>

<script>
/*eslint-disable*/
import Confirm from '@/components/common/confirm.vue';

export default {
  props: ['chapter','bookSpeicalPrice'],
  data() {
    return {
      selectId: 0,
      list: [
      //   {
      //   id: 0,
      //   name: '第' + this.chapter.episode + '话',
      //   checked: true,
      //   price: this.chapter.specialPrice +'点券',
      // }, {
      //   id: 1,
      //   name: '购买全部章节',
      //   checked: false,
      //   price: this.bookSpeicalPrice + '点券',
      // }
      // , {
      //   id: 2,
      //   name: '使用指定观看券',
      //   checked: false,
      // }, {
      //   id: 3,
      //   name: '使用全免观看券',
      //   checked: false,
      // }
      ],
    };
  },
  methods: {
    failPopupSelect(i) {
      console.log(i);
      this.$emit('select', this.selectId,i);
    },
    selectItem(item) {
      this.list.forEach((val) => {
        val.checked = val.id === item.id;
      });
      this.selectId = item.id;
    },
    initData(){
      let array = [];
      if (this.chapter){
        let obj = {};
        obj.id = 0;
        obj.name = '第' + this.chapter.episode + '话';
        obj.checked = true;
        obj.price = this.chapter.specialPrice +'点券';
        array.push(obj);
      }
      let obj2 = {};
      obj2.id = 1;
      obj2.name = '购买全部章节';
      obj2.checked = !this.chapter;
      obj2.price =  this.bookSpeicalPrice + '点券';
      array.push(obj2);
      let i;
      for (i = 0; i < array.length; i += 1) {
        this.list.push({ ...array[i]});
      }
    },
  },
  created() {
    this.initData();
  },
  components: {
    Confirm,
  },
};
</script>

<style scoped lang="less">
  .buy-popus {
    font-size: 35px;
    .title {
      font-weight:500;
      font-size: 43px;
      color: #231815;
      text-align: center;
      margin-bottom: 70px;
    }
    .cont {
      padding: 0 20px;
      .item {
        &:last-child {
          margin-bottom: 0;
        }
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 40px;
        .info {
          display: flex;
          align-items: center;
        }
        .buy-btn {
          padding: 6px 0;
          width: 166px;
          text-align: center;
          border-radius: 30px;
          background-color: #fff;
          font-size: 22px;
          color: #FFD000;
          border: 1PX solid #FFD000;
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
      }
    }
  }
</style>
