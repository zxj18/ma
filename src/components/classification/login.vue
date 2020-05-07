<template>
<div class="login">
  <img src="../../assets/images/login_bg.png">
  <span></span>
  <p>登入以後才能看到收藏的作品哦~</p>
</div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.login {
    text-align: center;
    img {
        width: 506px;
        height: 290px;
        margin: 236px 0 70px;
    }
    span {
        display: inline-block;
        background: url("../../assets/images/login_btn.png")no-repeat;
        background-size: 100% 100%;
        width: 253px;
        height: 66px;
        margin-bottom: 50px;
    }
    p {
        font-size: 32px;
        color: #cecece;
    }
}
</style>
