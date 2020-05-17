<template>
  <div id="app" class="flex flex-col min-h-screen items-center font-thin text-gray-900">
    <img src="./assets/stonks.jpg" class="mt-2 rounded w-2/5 cursor-pointer"/>
    <button
      @click="this.toggleConnection"
      :class="[this.$store.state.connected ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600']"
      class="text-white py-2 px-4 rounded shadow focus:outline-none"
    >
      {{this.$store.state.connected ? 'disconnect' : 'connect'}}
    </button>
    <div v-for="stock in stocks" :key="stock.ticker">
      <stock-info :stock="stock" />
    </div>
    <router-view/>
  </div>
</template>

<script>
import moment from 'moment';
import values from 'lodash/values';

import StockInfo from './components/stock-info';

export default {
  components: {
    StockInfo,
  },
  created() {
    this.$store.dispatch('triggerExchanges');
    this.$store.dispatch('triggerStocks');
  },
  computed: {
    stocks() {
      return values(this.$store.state.stocks.stocks);
    }
  },
  methods: {
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