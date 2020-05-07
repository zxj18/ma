<template>
  <div class="modify-id">
    <header-box>
      <p class="complete" @click="updateProfile">完成</p>
    </header-box>
    <input type="text" class="modify" placeholder="最多输入6个字符..." v-model="params.nickName">
  </div>
</template>

<script>
import HeaderBox from '@/components/common/header.vue';

export default {
  data() {
    return {
      params: {
        nickName: '',
      },
    };
  },
  methods: {
    updateProfile() {
      this.$api.user.updateProfile(this.params).then((res) => {
        if (res.code === 200) {
          localStorage.setItem('nickName', this.params.nickName);
          // console.log('修改成功');
          // this.$router.push({ path: '/userInfo' });
          this.$router.back();
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
.modify-id {
  .complete {
    font-size: 32px;
    font-weight: 500;
  }
  .modify {
    font-size: 28px;
    margin: 33px 0 0 46px;
    width: 650px;
    height: 78px;
    line-height: 78px;
    background: rgba(248,248,248,1);
    border-radius: 40PX;
  }
  ::-moz-placeholder {
    color: #CACACA;
    text-indent: 69px;
  }
  :-ms-input-placeholder {
    color: #CACACA;
    text-indent: 69px;
  }
  ::-webkit-input-placeholder {
    color: #CACACA;
    text-indent: 69px;
  }
}
</style>
