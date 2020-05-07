<template>
  <div :class="{ bookcase: true, pb: isEdit }">
    <roof-tab
      :data="roofTabDat"
      :acitveIndex="tabI"
      @tapTab='tapRoofTab'>
      <div class="edit">
        <img
          v-if="!isEdit"
          @click="tapEdit"
          class="icon-edit"
          src="../../assets/images/bookcase_edit.png">
        <p v-else class="complete" @click="tapEdit">完成</p>
      </div>
    </roof-tab>
    <book-shelf
      :list="bookList1"
      :isEdit="isEdit"
      v-show="tabI === 0"
      @select="selectBookList">
    </book-shelf>
    <history
      v-show="tabI === 1"
      :list="historyList1"
      :isEdit="isEdit"
      @select="selectHistoryList">
    </history>
    <div v-if="isEdit" class="edit-box">
      <div @click="allSelect" class="all">{{editType ? '全选' : '取消全选'}}</div>
      <div @click="deleteSelect" class="del">删除</div>
    </div>
    <confirm
      v-if="isShowConfirm"
      :content="'确认删除该记录？'"
      :buttons="['取消', { title: '确定', active: true }]"
      @select="confirmSelect">
    </confirm>
  </div>
</template>

<script>
import RoofTab from '@/components/common/roof-tab.vue';
import BookShelf from '@/components/bookcase/bookshelf.vue';
import History from '@/components/bookcase/history.vue';
import Confirm from '@/components/common/confirm.vue';

export default {
  data() {
    return {
      roofTabDat: ['书柜', '历史'],
      tabI: 0,
      isEdit: false,
      bookList1: [],
      historyList1: [],
      editType: 1,
      isShowConfirm: false,
      param: {
        pageNum: 1,
        pageSize: 100,
      },
      favIds: [],
      historyIds: [],
      delHistoryParam: {
        cartoonIds: '',
      },
      delFavParam: {
        cartoonIds: '',
      },
    };
  },
  created() {
    const { type } = this.$route.query;
    if (type) {
      this.tabI = type;
    }
    this.getFavList();
    this.getHistoryList();
  },

  methods: {
    getHistoryList() {
      this.$api.history.getHistoryList(this.param).then((res) => {
        if (res.code === 200) {
          const list = res.data.content;
          let i;
          for (i = 0; i < list.length; i += 1) {
            this.historyList1.push({ ...list[i], checked: false });
          }
        }
      });
    },
    delCartoonFromHistory() {
      let ids = '';
      for (let i = 0; i < this.historyIds.length; i += 1) {
        if (ids.length === 0) {
          ids = this.historyIds[i];
        } else {
          ids = `${ids},${this.historyIds[i]}`;
        }
      }
      this.delHistoryParam.cartoonIds = ids;
      if (this.historyIds.length > 0) {
        this.$api.history.delCartoonFromHistory(this.delHistoryParam).then((res) => {
          if (res.code === 200) {
            console.log(res.data);
          }
        });
      }
    },
    getFavList() {
      this.$api.fav.getFavList(this.param).then((res) => {
        if (res.code === 200) {
          const list = res.data.content;
          let i;
          for (i = 0; i < list.length; i += 1) {
            this.bookList1.push({ ...list[i], checked: false });
          }
        }
      });
    },
    delCartoonFromFav() {
      let ids = '';
      for (let i = 0; i < this.favIds.length; i += 1) {
        if (ids.length === 0) {
          ids = this.favIds[i];
        } else {
          ids = `${ids},${this.favIds[i]}`;
        }
      }
      this.delFavParam.cartoonIds = ids;
      if (this.favIds.length > 0) {
        this.$api.fav.delCartoonFromFav(this.delFavParam).then((res) => {
          if (res.code === 200) {
            console.log(res.data);
          }
        });
      }
    },
    tapRoofTab(i) {
      this.tabI = i;
      this.isEdit = false;
    },

    tapEdit() {
      this.isEdit = !this.isEdit;
      this.editType = 1;
    },

    selectBookList(i) {
      console.log(i);
      this.bookList1[i].checked = !this.bookList1[i].checked;
    },

    confirmSelect(index) {
      if (index) {
        if (this.tabI) {
          this.historyList1 = this.historyList1.filter((item) => {
            if (!item.checked) return item;
            this.historyIds.push(item.id);
            return false;
          });
          this.delCartoonFromHistory();
        } else {
          this.bookList1 = this.bookList1.filter((item) => {
            if (!item.checked) return item;
            this.favIds.push(item.id);
            return false;
          });
          this.delCartoonFromFav();
        }
      }
      this.isShowConfirm = false;
    },

    selectHistoryList(i) {
      this.historyList1[i].checked = !this.historyList1[i].checked;
    },

    allSelect() {
      this.editType = this.editType === 0 ? 1 : 0;
      if (this.tabI) {
        this.historyList1.forEach((val) => {
          val.checked = !this.editType;
        });
      } else {
        this.bookList1.forEach((val) => {
          val.checked = !this.editType;
        });
      }
    },

    deleteSelect() {
      this.isShowConfirm = true;
    },
  },
  components: {
    RoofTab,
    BookShelf,
    History,
    Confirm,
  },
};
</script>

<style scoped lang="less">
  .pb {
    padding-bottom: 98px;
  }
  .bookcase {
    position: relative;
    .edit-box {
      width: 100%;
      position: fixed;
      bottom: 98px;
      left: 0;
      padding: 24px 0;
      display: flex;
      background-color: #F8F8F8;
      font-size: 33px;
      font-weight: 400;
      >div {
        flex: 1;
        text-align: center;
      }
      .all {
        border-right: 1PX solid #DADADA;
      }
    }
    .edit {
      height:39px;
      .icon-edit {
        width: 39px;
      }
      .complete {
        height:39px;
        line-height: 39px;
        font-size:32px;
        font-weight: 500;
      }
    }
  }
</style>
