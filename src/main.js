import Vue from 'vue';
import Vuex from 'vuex';
import App from './app.vue';
import router from './router';
import store from './store';
import VueSocketIO from 'vue-socket.io'
import SocketIO from "socket.io-client"

import formatPercent from './filters/formatPercent';
import formatVariation from './filters/formatVariation';

import './assets/styles/index.css';

Vue.config.productionTip = false;

Vue.use(Vuex);

Vue.use(new VueSocketIO({
  connection: 'wss://le-18262636.bitzonte.com/',
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
  options: { path: "​/stocks" }
}))

Vue.filter('formatPercent', formatPercent);
Vue.filter('formatVariation', formatVariation);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
