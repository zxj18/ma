<template>
  <div class="service-center">
    <header-box
      :title="'客服中心'"
    ></header-box>
    <div class="notice">
      <h3>您有什么疑问吗？</h3>
      <p>我们将在本页面内为您解答疑问。 </p>
      <p>常见问题中没有您要的解答吗？建议您通过1：1 </p>
      <p>客服提问，我们将尽快为您解答。</p>
      <p>聯係我們:</p>
      <p>郵箱：xiaoxiaoman2020@gmail.com   </p>

      <!-- <p>123456@126.com <span>/</span> 0591-1234567</p> -->
    </div>
    <p class="common">常见问题</p>
    <div class="problem">
      <h3>1.購買之作品是否有觀看期限？</h3>
      <p>購買之作品皆可無限期觀看</p>
      <h3>2.如何儲值？</h3>
      <p>點擊右下角：我-錢包-選擇儲值金額-選擇儲值管道</p>
      <h3>3.如何知道現時我購買了哪些漫畫？</h3>
      <p>我的-錢包-明細-使用記錄</p>
    </div>
  </div>
</template>

<script>
import HeaderBox from '@/components/common/header.vue';

export default {
  data() {
    return {

    };
  },
  methods: {

  },
  components: {
    HeaderBox,
  },
};
</script>

<style scoped lang="less">
.service-center {
  .notice {
    height: 418px;
    background: rgba(248, 248, 248, 1);
    border-radius: 15px;
    margin: 45px 32px 77px;
    padding: 55px 0 0 38px;

    h3 {
      font-size: 34px;
      color: rgba(0, 0, 0, 1);
      line-height: 78px;
      margin-bottom: 51px;
    }

    p {
      font-size: 29px;
      color: rgba(0, 0, 0, 1);
      padding-bottom: 26px;

      &:last-child {
        font-size: 29px;
        /* margin-top: 46px; */

        span {
          margin: 0 38px;
        }
      }
    }
  }

  .common {
    font-size: 29px;
    color: rgba(139, 137, 137, 1);
    margin-left: 51px;
    font-weight: 400;
    padding-bottom: 32px;
    border-bottom: 1px solid rgba(197, 197, 197, 1);
  }

  .problem {
    width: 623px;
    margin: 73px auto 0;

    h3 {
      font-size: 32px;
      font-weight: 800;
      color: rgba(0, 0, 0, 1);
      margin-bottom: 35px;
    }

    p {
      font-size: 29px;
      color: rgba(0, 0, 0, 1);
      line-height: 52px;
      margin-bottom: 68px;
    }
  }
}
</style>
