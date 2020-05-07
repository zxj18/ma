<template>
  <div class="message">
    <header-box :title="'消息'">
      <p class="read" @click="allRead">全部已读</p>
    </header-box>
    <ul class="messageList">
      <li v-for="(item, index) in lists" :key="index" @click="goMessageDetail(item)">
        <div class="title">
          <span>
            <img class="notice" src="../../assets/images/message_notice.png">
            <span class="text">{{item.title}}</span>
            <img class="new" src="../../assets/images/message_new.png" v-if="!item.read">
          </span>
          <span class="date">{{item.createTime}}</span>
        </div>
        <div class="subtitle">
          {{item.viaTitle}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import HeaderBox from '@/components/common/header.vue';

export default {
  data() {
    return {
      lists: [],
      isAllRead: false,
    };
  },
  created() {
    this.getMessageList();
  },
  methods: {
    allRead() {
      this.$api.message.readAll().then((res) => {
        if (res.code === 200) {
          this.getMessageList();
        }
      });
    },
    goMessageDetail(item) {
      this.$router.push({ name: 'messageDetails', query: { id: item.id } });
    },
    getMessageList() {
      this.$api.message.getMessageList().then((res) => {
        if (res.code === 200) {
          this.lists = res.data;
        }
      });
    },
  },
  components: {
    HeaderBox,
  },
};
</script>

<style scoped lang="less">
.message {
  background: rgba(248, 248, 248, 1);
  height:100%;
  .read {
    font-size: 32px;
    font-weight: 500;
  }
  li {
    background: #fff;
    padding: 39px 31px 41px;
    margin-top: 16px;

    .title {
      .text {
        font-size: 32px;
        color: rgba(0, 0, 0, 1);
        vertical-align: middle;
      }

      .date {
        float: right;
        font-size: 22px;
        color: rgba(136, 136, 136, 1);
        margin-top: 11px;
      }

      .notice {
        width: 35px;
        height: 35px;
        vertical-align: middle;
        margin-right: 13px;
      }

      .new {
        width: 51px;
        height: 27px;
        vertical-align: middle;
        margin-left: 25px;
      }
    }

    .subtitle {
      width: 433px;
      font-size: 27px;
      color: rgba(51, 51, 51, 1);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 28px;
    }
  }
}
</style>
