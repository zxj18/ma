<template>
  <div class="record">
    <header-box
      :title="'明细'"
    ></header-box>
    <div class="tabs">
      <span
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{active: index === tabI}"
        @click="tapTab(index)">{{tab}}</span>
    </div>
    <div class="stored">
      <div class="head" v-for="(item, index) in headList" :key="index" v-show="index == tabI">
        <span v-for="(head, index) in item" :key="index">
          {{head}}
        </span>
      </div>
      <div v-for="(item, index) in storeLists" :key="index" v-show="index == tabI">
        <div class="grid" v-for="(grid, i) in item" :key="i">
          <span v-for="(val, i1) in grid" :key="i1">
            {{val}}
          </span>
        </div>
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
      tabs: ['储值记录', '使用记录'],
      tabI: 0,
      headList: [
        ['储值方式', '储值状态', '储值金额', '领取点券', '储值日期'],
        ['作品名称', '消耗点券', '使用日期'],
      ],
      storeLists: [
        [],
        [],
      ],
    };
  },
  methods: {
    tapTab(i) {
      this.tabI = i;
    },
    getCostList() {
      this.$api.user.getCostList().then((res) => {
        if (res.code === 200) {
          console.log(res.data);
          const list = res.data;
          for (let i = 0; i < list.length; i += 1) {
            const subject = list[i].subject;
            const cost = list[i].cost+'点券';
            const createTime = list[i].createTime;
            const obj = [subject,cost,createTime];
            this.storeLists[1].push(obj);
          }
        }
      });
    },
    getRechargeList() {
      this.$api.user.getRechargeList().then((res) => {
        if (res.code === 200) {
          const list = res.data;
          for (let i = 0; i < list.length; i += 1) {
            let rechargeT;
            const buyType = list[i].rechargeType;
            // if (buyType === 0) {
            //   rechargeT = 'VISA';
            // } else if (buyType === 1) {
            //   rechargeT = 'PAYPAL';
            // } else if (buyType === 2) {
            //   rechargeT = 'UNIONPAY';
            // } else if (buyType === 3) {
            //   rechargeT = 'APPLEPAY';
            // }
            if (buyType === 2) {
              rechargeT = 'AliPAY';
            } else if (buyType === 3) {
              rechargeT = 'WxPay';
            }
            const status = list[i].status;
            const rechargeMoney = list[i].rechargeMoney+'点券';
            const rmb = list[i].rmb+'RMB';
            const createTime = list[i].createTime;
            const obj = [rechargeT, status === 0 ? '正常' : '失败', rmb, rechargeMoney, createTime];
            this.storeLists[0].push(obj);
          }
        }
      });
    },
  },
  created() {
    this.getCostList();
    this.getRechargeList();
  },
  components: {
    HeaderBox,
  },
};
</script>

<style scoped lang="less">
.record {
  .tabs {
    display: flex;
    height: 29px;
    font-size: 30px;
    font-weight: bold;
    padding: 24px 0;

    .active {
      color: rgba(255, 198, 85, 1);
    }

    > span {
      flex: 1;
      text-align: center;
    }
  }

  .head {
    display: flex;
    font-size: 24px;
    background: rgba(248, 248, 248, 1);

    > span {
      flex: 1;
      text-align: center;
      padding: 37px 0;
      color: #7D7C7C;
    }
  }

  .grid {
    display: flex;
    text-align: center;
    font-size: 24px;
    height: 109px;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-bottom: 1px solid #E9E9E9;

    span {
      flex: 1;
    }
  }
}
</style>
