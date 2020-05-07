import Vue from 'vue';
import Toast from 'vue2-toast';
import infiniteScroll from 'vue-infinite-scroll';
import App from './App.vue';
import router from './router';
import 'lib-flexible';
import 'vue2-toast/lib/toast.css';
import api from './http';
import clipper from './assets/clipper/clipper';


Vue.use(infiniteScroll);
Vue.use(api);
Vue.use(clipper);
Vue.use(Toast, {
  type: 'center',
  duration: 1500,
  wordWrap: true,
});
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
