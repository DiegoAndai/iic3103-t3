<template>
  <div class="grid bg-white m-2 p-4 rounded shadow">
    <div class="text-xl text-gray-900">{{this.exchange.name}}</div>
    <div class="text-sm text-gray-600">{{this.exchange.exchange_ticker}} - {{this.exchange.country}}</div>
    <div class="text-sm text-gray-600">{{this.exchange.address}}</div>
    <labeled-value
      class="pt-4"
      label="Stock quantity"
      :value="this.stockQuantity(this.exchange)"
    />
    <div class="grid grid-cols-2 pt-4">
      <labeled-value
        label="Buy volume"
        :value="this.buyVolume(this.exchange)"
      />
      <labeled-value
        label="Sell volume"
        :value="this.sellVolume(this.exchange)"
      />
      <labeled-value
        label="Total volume"
        :value="this.buyVolume(this.exchange) + this.sellVolume(this.exchange)"
      />
      <labeled-value
        label="Market share"
        :value="this.share(this.exchange) | formatPercent"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import LabeledValue from './labeled-value';

export default {
  components: {
    LabeledValue,
  },
  props: {
    exchange: {
      type: Object,
      required: true,
    }
  },
  computed: {
    ...mapGetters([
      'getExchangeCompanyTickers',
      'getExchangeBuyVolume',
      'getExchangeSellVolume',
      'getExchangeShare',
    ])
  },
  methods: {
    buyVolume(exchange) {
      return this.getExchangeBuyVolume(exchange.exchange_ticker);
    },
    sellVolume(exchange) {
      return this.getExchangeSellVolume(exchange.exchange_ticker);
    },
    stockQuantity(exchange) {
      return this.getExchangeCompanyTickers(exchange.exchange_ticker).length;
    },
    share(exchange) {
      return this.getExchangeShare(exchange.exchange_ticker);
    }
  }
}
</script>