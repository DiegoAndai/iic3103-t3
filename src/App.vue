<template>
  <div id="app" class="flex flex-col min-h-screen items-center p-4 font-thin bg-gray-100 text-gray-800">
    <img src="./assets/stonks.jpg" class="mt-2 rounded w-2/5 cursor-pointer"/>
    <button
      @click="this.toggleConnection"
      :class="[this.$store.state.connected ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600']"
      class="text-white my-2 py-2 px-4 rounded shadow focus:outline-none"
    >
      {{this.$store.state.connected ? 'disconnect' : 'connect'}}
    </button>
    <div class="flex items-baseline">
      <div class="text-4xl font-bold text-gray-900">Stocks</div>
      <button
        class="ml-2 font-thin text-blue-600 focus:outline-none"
        @click="this.toggleStocks"
      >
        {{this.showStocks ? 'hide' : 'show'}}
      </button>
    </div>
    <div class="grid grid-cols-2" v-show="this.showStocks">
      <stock-info v-for="stock in stocks" :stock="stock" :key="stock.ticker"/>
    </div>
    <div class="flex items-baseline">
      <div class="text-4xl font-bold text-gray-900">Exchanges</div>
      <button
        class="ml-2 font-thin text-blue-600 focus:outline-none"
        @click="this.toggleExchanges"
      >
        {{this.showExchanges ? 'hide' : 'show'}}
      </button>
    </div>
    <div class="grid grid-cols-2" v-show="this.showExchanges">
      <exchange-info v-for="exchange in exchanges" :exchange="exchange" :key="exchange.exchange_ticker"/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import moment from 'moment';
import values from 'lodash/values';

import StockInfo from './components/stock-info';
import ExchangeInfo from './components/exchange-info';

export default {
  data() {
    return {
      showStocks: false,
      showExchanges: false,
    }
  },
  components: {
    StockInfo,
    ExchangeInfo,
  },
  created() {
    this.$store.dispatch('triggerExchanges');
    this.$store.dispatch('triggerStocks');
  },
  computed: {
    stocks() {
      return values(this.$store.state.stocks.stocks);
    },
    exchanges() {
      return values(this.$store.state.exchanges.exchanges);
    }
  },
  methods: {
    toggleStocks() {
      this.showStocks = !this.showStocks;
    },
    toggleExchanges() {
      this.showExchanges = !this.showExchanges;
    },
    toggleConnection() {
      if (this.$store.state.connected) {
        this.$store.dispatch('disconnectSocket');
      } else {
        this.$store.dispatch('connectSocket');
      }
    }
  }
}
</script>