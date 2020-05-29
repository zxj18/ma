<template>
<div class="score">
  <header-box :title="'评分'">
    <div class="right" @click="send">
      发布
    </div>
  </header-box>
  <div class="content">
    <img class="icon-score" src="../assets/images/icon_score.png">
    <p class="title">轻触评分</p>
    <div class="star-box">
      <span v-for="(item) in starList" :key="item.score"
      @click="scoreClick(item.score)" v-bind:class="{ selected: item.select }"></span>
    </div>
    <div class="message-box">
      <textarea placeholder="您有什么想说的吗？"></textarea>
    </div>
  </div>
</div>
</template>

<script>
/*eslint-disable*/
import HeaderBox from '@/components/common/header.vue';
export default {
  data() {
    return {
      starList: [{
        score: 1,
        select: false,
      }, {
        score: 2,
        select: false,
      }, {
        score: 3,
        select: false,
      }, {
        score: 4,
        select: false,
      }, {
        score: 5,
        select: false,
      }]
    }
  },
  components: {
    HeaderBox,
  },
  methods: {
    scoreClick(score) {
      const starList = this.starList;
      for (var i = 0; i < starList.length; i++) {
        if (starList[i].score <= score) {
          starList[i].select = true;
        } else {
          starList[i].select = false;
        }
      }
    },
    send() {
      this.$router.go(-1);
     }
  },
}
</script>

<style scoped lang="less">
.score {
    .right {
        font-size: 28px;
    }
    .content {
        padding-top: 87px;
        text-align: center;
        .icon-score {
            width: 143px;
            height: 132px;
            margin-bottom: 35px;
        }
        .title {
            font-size: 29px;
            font-weight: 400;
            color: rgba(198,198,198,1);
        }
        .star-box {
            margin: 65px 0 82px;
            display: flex;
            padding: 0 194px 0 174px;
            justify-content: space-around;
            span {
                display: block;
                width: 62px;
                height: 58px;
                background: url('../assets/images/star_select.png') no-repeat;
                background-size: 100% 100%;
            }
            .selected {
                background: url('../assets/images/star_selected.png') no-repeat;
                background-size: 100% 100%;
            }
        }
        .message-box {
            padding: 0 34px 0 42px;
            textarea {
                width: 90%;
                height: 359px;
                font-size: 28px;
                background: rgba(248,248,248,1);
                border: none;
                padding: 33px;
            }
            textarea:-webkit-input-placeholder {
                color: #CACACA;
            }
        }
    }
}
</style>
