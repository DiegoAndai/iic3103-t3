import { sum, values } from 'lodash';

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

export const getters = {
  getExchange: (state) => (ticker) => {
    return state.exchanges[ticker];
  },
  getExchangeCompanyTickers: (_, getters, rootState) => (ticker) => {
    const { listed_companies: listedCompanies } = getters.getExchange(ticker);
    return listedCompanies.map((companyName) => (
      rootState.stocks.name2TickerMap[companyName]
    ));
  },
  getExchangeBuyVolume: (_, getters) => (ticker) => {
    const companyTickers = getters.getExchangeCompanyTickers(ticker);
    return sum(companyTickers.map((companyTicker) => 
      (getters.getStockBuyVolume(companyTicker))
    ))
  },
  getExchangeSellVolume: (_, getters) => (ticker) => {
    const companyTickers = getters.getExchangeCompanyTickers(ticker);
    return sum(companyTickers.map((companyTicker) => 
      (getters.getStockSellVolume(companyTicker))
    ))
  },
  getExchangeTotalVolume: (_, getters) => (ticker) => {
    return getters.getExchangeBuyVolume(ticker) + getters.getExchangeSellVolume(ticker);
  },
  getExchangeShare: (state, getters) => (ticker) => {
    const totalVolume = sum(values(state.exchanges).map(({ exchange_ticker }) => (
      getters.getExchangeTotalVolume(exchange_ticker)
    )))
    return getters.getExchangeTotalVolume(ticker) / totalVolume;
  }
}

export default {
  state: { ...initialState },
  mutations,
  actions,
  getters,
};