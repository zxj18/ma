<!--
  用法：

  html:
    <confirm
      :content="'订阅后才能查看更多课程笔记'"
      :buttons="['取消', { title: '付费订阅', active: true }]"
      @select="select">
    </confirm>

  js:
    methods: {
      select(button, index) {
        // do something
      }
    }
-->
<template lang="html">
  <transition name="modal" @click="$emit('close')">
    <div class="modal-mask" :style="{height: pageHeight}">
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>
          <div class="alert">
            <main>
              <slot>
                <p class="title">{{ content }}</p>
              </slot>
            </main>
            <footer>
              <div class="wrapper">
                <button
                  v-for="(button, index) in buttons"
                  :key="index"
                  :class="{ active: isActive(button), disabled: isDisabled(button) }"
                  @click="select(button, index)">
                  {{ buttonTitle(button) }}
                </button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  // eslint-disable-next-line comma-spacing
  props: ['show' , 'content', 'buttons'],
  computed: {
    pageHeight() {
      return `${document.body.offsetHeight}px`;
    },
  },
  methods: {
    isActive(button) {
      if (!typeof button === 'string') return false;
      return !!button.active;
    },

    isDisabled(button) {
      if (!typeof button === 'string') return false;
      return !!button.disabled;
    },

    buttonTitle(button) {
      if (typeof button === 'string') {
        return button;
      }
      return button.title;
    },

    select(button, index) {
      if (this.isDisabled(button)) return;
      this.$emit('select', index);
    },
  },
};
</script>

<style lang="less" scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  .modal-container {
    transition: all .3s ease;
  }


  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  .alert {
    background-color: #fff;
    width: 568px;
    margin: 0 auto;
    border-radius: 24px;
    z-index: 999;
    overflow: hidden;
    padding-bottom: 52px;

    main {
      text-align: center;
      font-size: 34px;
      line-height: 1.5;
      // padding: 75px 24px 61px;
      padding: 30px 24px 61px;
      position: relative;
    }

    footer {
      font-size: 27px;
      padding: 0 44px;
      height: 75px;
      button {
        width:225px;
        height:75px;
        background-color: #B5B4B4;
        color: #fff;
        border-radius: 40px;
        &:first-child {
          margin-right: 30px;
        }
      }
      .active {
        background-color: #FFD000;
        color: #000;
      }
    }
  }
</style>
