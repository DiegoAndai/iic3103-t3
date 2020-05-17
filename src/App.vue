<template>
  <div id="app" class="flex flex-col min-h-screen items-center font-thin text-gray-900">
    <img src="./assets/stonks.jpg" class="mt-2 rounded w-2/5 cursor-pointer"/>
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
}
</script>