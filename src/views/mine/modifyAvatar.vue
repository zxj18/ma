<template>
<div class="modify-avatar">
  <div class="content">
    <img :src="imageUrl" id="img">
  </div>
  <div class="footer">
    <input class="camera" ref="fileCamera" type="file" accept="image/*" capture="camera" @change="getCamera" />
    <input class="photo" ref="filePhoto" type="file" accept="image/*" @change="getPhoto" />
    <p>更换头像</p>

    <button @click="clickCamera">拍照</button>
    <button @click="clickPhoto">从手机相册选择</button>
    <button @click="cancel">取消</button>
  </div>
</div>
</template>

<script>
import DefaultAvatar from '@/assets/images/default_avatar.png';
/*eslint-disable*/
export default {
  data() {
    return {
      imageUrl: DefaultAvatar,
    };
  },
  methods: {
    cancel() {
      this.$router.back();
    },
    clickCamera() {
      this.$refs.fileCamera.dispatchEvent(new MouseEvent('click'))
    },
    clickPhoto() {
      this.$refs.filePhoto.dispatchEvent(new MouseEvent('click'))
    },
    getCamera() {
      // getBase64(this.$refs.fileCamera.files[0], imageUrl => {
      //   this.imageUrl = imageUrl;
      // });
      let image = document.getElementById('img'); //预览对象
      this.clip(event, {
        resultObj: image,
        aspectRatio: 1
      })
    },
    getPhoto() {
      // getBase64(this.$refs.filePhoto.files[0], imageUrl => {
      //   this.imageUrl = imageUrl;
      // });
      let image = document.getElementById('img'); //预览对象
      this.clip(event, {
        resultObj: image,
        aspectRatio: 1
      })
    },
  },
};

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
</script>
<style scoped lang="less">
.modify-avatar {
    input {
        position: absolute;
        left: 0;
        width: 0;
        height: 0;
        opacity: 100;
        z-index: 1;
    }
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #000;
    .content {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 900px;
        overflow: hidden;
        img {
            width: 100%;
            max-height: 750px;
            overflow: hidden;
        }
    }
    .footer {
        position: absolute;
        left: 0;
        bottom: 0;
        padding: 30px 94px 42px;
        font-size: 28px;
        color: #AFADAD;
        width: 100%;
        box-sizing: border-box;
        p {
            margin-bottom: 51px;
            text-align: center;
        }
        button {
            display: block;
            border: 1PX solid #fff;
            height: 80px;
            line-height: 80px;
            width: 100%;
            background-color: #000;
            color: #fff;
            margin-bottom: 26px;
        }
    }
}
</style>
