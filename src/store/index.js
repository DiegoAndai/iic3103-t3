import Vue from 'vue';
import Vuex from 'vuex';

import exchanges from './exchanges';
import stocks from './stocks';

const initialState = {
  exchanges: exchanges.state,
  stocks: stocks.state,
};

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    connected: true,
  },
  modules: {
    exchanges,
    stocks,
  },
  mutations: {
    RESET_STATE(state) {
      Object.keys(state).forEach((key) => {
        Object.assign(state[key], initialState[key]);
      });
    },
    SOCKET_CONNECT(state) {
      state.connected = true
    },
    SOCKET_DISCONNECT(state) {
      state.connected = false
    },
    SOCKET_UPDATE(state, message) {
      state.update = message
    },
  },
  actions: {
    connectSocket({ commit }) {
      this._vm.$socket.connect();
      commit('SOCKET_CONNECT');
    },
    disconnectSocket({ commit }) {
      this._vm.$socket.disconnect();
      commit('SOCKET_DISCONNECT');
    }
  }
});
