<template>
  <div class="attention" v-if="show" @click="$emit('close')">
      <div class="content" @click.stop>
        <h3>
          <img src="../../assets/images/icon_ban.png">分级内容声明
        </h3>
        <p>本站點的內容可能包含色情裸露、暴力傾向等受限制的內容，按照相關分級內容的法律要求：</p>
        <p class="red-mark">您如未滿十八周歲，請自行退出本網站。</p>
        <p>如果你點擊繼續，視同您已滿十八週歲並同意我方上述的聲明注意事項。</p>
        <p>謝謝。</p>
        <div class="button-list">
            <button class="no-btn" @click="$emit('close')">退出</button>
            <button class="yes-btn" @click="$emit('yes')">继续</button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['show'],
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style scoped lang="less">
  .attention {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
      width: 568px;
      height: 790px;
      background-color: #fff;
      position: relative;
      border-radius: 36px;
      box-sizing: border-box;
      padding-top: 55px;
      h3 {
        font-size: 43px;
        text-align: center;
        margin-bottom: 42px;
        img {
          display: inline-block;
          width: 66px;
          height: 66px;
          vertical-align: middle;
          margin: -10px 20px 0 0;
        }
      }
      p {
        font-size: 28px;
        color: #808080;
        line-height: 48px;
        word-wrap:break-word;
        padding: 0 70px 0 68px;
        font-weight:bold;
      }
      .red-mark {
        font-size: 32px;
        color: #D83E28;
        margin: 20px 0 6px;
        font-weight:bold;
      }
      .button-list {
        display: flex;
        justify-content: space-between;
        padding: 0 50px 0 41px;
        button {
          width: 226px;
          height: 75px;
          border-radius: 40px;
          font-size: 27px;
          margin-top: 56px;
        }
        .no-btn {
          background: #B5B4B4;
          color: #fff;
        }
        .yes-btn {
          background: #FFD000;
          color: #000;
        }
      }
    }
  }
</style>
