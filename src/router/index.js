import Vue from 'vue';
import VueRouter from 'vue-router';
import Base from '../views/base.vue';
import Home from '../views/base/home.vue';
import Classification from '../views/base/classification.vue';
import Bookcase from '../views/base/bookcase.vue';
import Mine from '../views/base/mine.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Base,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
          title: '首页',
        },
      },
      {
        path: '/classification',
        name: 'classification',
        component: Classification,
        meta: {
          title: '分类',
        },
      },
      {
        path: '/bookcase',
        name: 'bookcase',
        component: Bookcase,
        meta: {
          title: '书柜',
        },
      },
      {
        path: '/mine',
        name: 'mine',
        component: Mine,
        meta: {
          title: '我的',
        },
      },
    ],
  },
  {
    path: '/resetPasswords',
    name: 'resetPasswords',
    component: () => import(/* webpackChunkName: "resetPasswords" */ '../views/mine/resetPasswords.vue'),
    meta: {
      title: '重设密码',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/mine/login.vue'),
    meta: {
      title: '登入',
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/mine/register.vue'),
    meta: {
      title: '注册',
    },
  },
  {
    path: '/mailVerify',
    name: 'mailVerify',
    component: () => import(/* webpackChunkName: "mailVerify" */ '../views/mine/mailVerify.vue'),
    meta: {
      title: '邮箱验证',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/mine/about.vue'),
    meta: {
      title: '关于我们',
    },
  },
  {
    path: '/vouchers',
    name: 'vouchers',
    component: () => import(/* webpackChunkName: "vouchers" */ '../views/mine/vouchers.vue'),
    meta: {
      title: '免费观看券',
    },
  },
  {
    path: '/record',
    name: 'record',
    component: () => import(/* webpackChunkName: "record" */ '../views/mine/record.vue'),
    meta: {
      title: '明细',
    },
  },
  {
    path: '/wallet',
    name: 'wallet',
    component: () => import(/* webpackChunkName: "wallet" */ '../views/mine/wallet.vue'),
    meta: {
      title: '钱包',
    },
  },
  {
    path: '/exchange',
    name: 'exchange',
    component: () => import(/* webpackChunkName: "exchange" */ '../views/mine/exchange.vue'),
    meta: {
      title: '兑换优惠券',
    },
  },
  {
    path: '/message',
    name: 'message',
    component: () => import(/* webpackChunkName: "message" */ '../views/mine/message.vue'),
    meta: {
      title: '消息',
    },
  },
  {
    path: '/messageDetails',
    name: 'messageDetails',
    component: () => import(/* webpackChunkName: "messageDetails" */ '../views/mine/messageDetails.vue'),
    meta: {
      title: '',
    },
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import(/* webpackChunkName: "userInfo" */ '../views/mine/userInfo.vue'),
    meta: {
      title: '个人资料',
    },
  },
  {
    path: '/modifyId',
    name: 'modifyId',
    component: () => import(/* webpackChunkName: "modifyId" */ '../views/mine/modifyId.vue'),
    meta: {
      title: '',
    },
  },
  {
    path: '/modifyAvatar',
    name: 'modifyAvatar',
    component: () => import(/* webpackChunkName: "modifyAvatar" */ '../views/mine/modifyAvatar.vue'),
    meta: {
      title: '',
    },
  },
  {
    path: '/serviceCenter',
    name: 'serviceCenter',
    component: () => import(/* webpackChunkName: "serviceCenter" */ '../views/mine/serviceCenter.vue'),
    meta: {
      title: '客服中心',
    },
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '../views/search.vue'),
    meta: {
      title: '搜索',
    },
  },
  {
    path: '/details',
    name: 'details',
    component: () => import(/* webpackChunkName: "details" */ '../views/details.vue'),
    meta: {
      title: '漫画详情',
    },
  },
  {
    path: '/content',
    name: 'content',
    component: () => import(/* webpackChunkName: "content" */ '../views/content.vue'),
    meta: {
      title: '漫画内容',
    },
  },
  {
    path: '/activity',
    name: 'activity',
    component: () => import(/* webpackChunkName: "activity" */ '../views/activity.vue'),
    meta: {
      title: '',
    },
  },
  {
    path: '/score',
    name: 'score',
    component: () => import(/* webpackChunkName: "score" */ '../views/score.vue'),
    meta: {
      title: '评分',
    },
  },
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 0);
    });
  },
});

export default router;
