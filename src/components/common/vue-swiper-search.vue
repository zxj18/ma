<template>
  <div class="swiper">
    <swiper :options="swiperOption">
      <swiper-slide
        v-for="(slide, index) in banner"
        :key="index">
        <div
          class="banner-img"
          :style="{ background: 'url('+ slide.cover +')no-repeat',backgroundSize: 'cover' }"
          @click="$emit('bannerClick',slide)"/>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
/*eslint-disable*/
import 'swiper/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'carrousel',
  props:['banner'],
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true, // 允许点击小圆点跳转
        },
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false // 手动切换之后继续自动轮播
        },
      },
    };
  },
  mounted() {
    // setInterval(() => {
    //   console.log('simulate async data');
    //   if (this.swiperSlides.length < 10) {
    //     this.swiperSlides.push(this.swiperSlides.length + 1);
    //   }
    // }, 3000);
  },
  components: {
    swiper,
    swiperSlide,
  },
};
</script>

<style scoped lang="less">
  .swiper {
    width: 100%;
    height: 188px;

    .banner-img {
      border-radius: 20px;
      overflow: hidden;
      width: 100%;
      height: 188px;
    }
  }
</style>
