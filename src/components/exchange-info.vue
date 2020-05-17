<template>
  <div class="grid grid-cols-2">
    <div>
      <div>{{this.exchange.name}}</div>
      <div>{{this.exchange.exchange_ticker}}</div>
      <div>{{this.exchange.country}}</div>
      <div>{{this.exchange.address}}</div>
      <div>{{this.stockQuantity(this.exchange)}}</div>
      <div>{{this.buyVolume(this.exchange)}}</div>
      <div>{{this.sellVolume(this.exchange)}}</div>
      <div>{{this.buyVolume(this.exchange) + this.sellVolume(this.exchange)}}</div>
      <div>{{this.share(this.exchange)}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
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