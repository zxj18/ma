<template>
  <div class="message-details">
    <header-box></header-box>
    <div class="detail">
      <h3 class="title">{{title}}</h3>
      <p class="content">{{content}}</p>
    </div>
  </div>
</template>
<script>
import HeaderBox from '@/components/common/header.vue';

export default {
  data() {
    return {
      params: {
        id: this.$route.query.id,
      },
      title: '',
      content: '',
    };
  },
  created() {
    this.getMessageDetail();
  },
  methods: {
    getMessageDetail() {
      this.$api.message.getMessageDetail(this.params).then((res) => {
        if (res.code === 200) {
          this.title = res.data.title;
          this.content = res.data.content;
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
.message-details {
  .detail {
    padding: 28px 52px 0 37px;
    .title {
      font-size: 43px;
      color: rgba(0, 0, 0, 1);
      margin-bottom: 35px;
    }
    .content {
      font-size: 27px;
      color: rgba(51, 51, 51, 1);
      line-height: 54px;
    }
  }
}
</style>
