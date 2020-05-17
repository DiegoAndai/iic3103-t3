import Vue from 'vue';
import Vuex from 'vuex';

const initialState = {
};

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
  },
  mutations: {
    resetState(state) {
      Object.keys(state).forEach((key) => {
        Object.assign(state[key], initialState[key]);
      });
    },
  },
});
