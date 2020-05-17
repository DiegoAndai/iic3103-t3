import {
  keyBy,
  reduce,
  max,
  min,
  sum
} from 'lodash';

const initialState = {
  stocks: {},
  name2TickerMap: {},
};

export const mutations = {
  SOCKET_STOCKS(state, payload) {
    const withArrays = payload.map((stock) => ({
      ...stock,
      values: [],
      buys: [],
      sells: [],
    }))
    const keyedByName = keyBy(withArrays, (stock) => stock.ticker)
    state.stocks = {
      ...keyedByName,
      ...state.stocks,
    };

    const name2Ticker = reduce(
      payload,
      (result, stock) => ({ ...result, [stock.company_name]: stock.ticker }),
      {}
    )
    state.name2TickerMap = {
      ...name2Ticker,
      ...state.name2TickerMap,
    }
  },
  SOCKET_UPDATE(state, payload) {
    const { ticker, value, time } = payload;
    let stock = state.stocks[ticker]
    if (!!stock) {
      stock = { ...stock, values: [ ...stock.values, {value, time} ] }
      state.stocks = {
        ...state.stocks,
        [ticker]: stock,
      } 
    }
  },
  SOCKET_BUY(state, payload) {
    const { ticker, volume, time } = payload;
    let stock = state.stocks[ticker]
    if (!!stock) {
      stock = { ...stock, buys: [ ...stock.buys, {volume, time} ] }
      state.stocks = {
        ...state.stocks,
        [ticker]: stock,
      } 
    }
  },
  SOCKET_SELL(state, payload) {
    const { ticker, volume, time } = payload;
    let stock = state.stocks[ticker]
    if (!!stock) {
      stock = { ...stock, sells: [ ...stock.sells, {volume, time} ] }
      state.stocks = {
        ...state.stocks,
        [ticker]: stock,
      } 
    }
  },
};

export const actions = {
  triggerStocks() {
    this._vm.$socket.emit('STOCKS');
  },
};

export const getters = {
  getStock: (state) => (ticker) => {
    return state.stocks[ticker];
  },
  getStockHighest: (_, getters) => (ticker) => {
    return max(getters.getStock(ticker).values.map((value) => value.value));
  },
  getStockLowest: (_, getters) => (ticker) => {
    return min(getters.getStock(ticker).values.map((value) => value.value));
  },
  getStockBuyVolume: (_, getters) => (ticker) => {
    return sum(getters.getStock(ticker).buys.map((buy) => buy.volume));;
  },
  getStockSellVolume: (_, getters) => (ticker) => {
    return sum(getters.getStock(ticker).sells.map((sell) => sell.volume));;
  },
  getStockTotalVolume: (_, getters) => (ticker) => {
    return getters.getStockBuyVolume(ticker) + getters.getStockSellVolume(ticker);
  },
}

export default {
  state: { ...initialState },
  mutations,
  actions,
  getters,
};