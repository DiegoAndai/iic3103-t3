import { keyBy, reduce } from 'lodash';

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
      ...state.stocks,
      ...keyedByName
    };

    const name2Ticker = reduce(
      payload,
      (result, stock) => ({ ...result, [stock.company_name]: stock.ticker }),
      {}
    )
    state.name2TickerMap = {
      ...state.name2TickerMap,
      ...name2Ticker,
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

export default {
  state: { ...initialState },
  mutations,
  actions,
};