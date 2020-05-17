const initialState = {
  exchanges: {},
};

export const mutations = {
  SOCKET_EXCHANGES(state, payload) {
    state.exchanges = payload;
  },
};

export const actions = {
  triggerExchanges() {
    this._vm.$socket.emit('EXCHANGES');
  },
};

export default {
  state: { ...initialState },
  mutations,
  actions,
};