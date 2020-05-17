<template>
  <div class="grid grid-cols-2">
    <stock-chart :chart-data="datacollection" />
    <div>
      <div>{{this.stock.company_name}}</div>
      <div>{{this.stock.ticker}}</div>
      <div>{{this.stock.country}}</div>
      <div>highest: {{this.highest(this.stock)}}</div>
      <div>lowest: {{this.lowest(this.stock)}}</div>
      <div>last: {{this.last(this.stock)}}</div>
      <div>variation: {{this.variation(this.stock)}}%</div>
      <div>transaction volume: {{this.transactionVolume(this.stock)}}</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

import StockChart from './stock-chart';

export default {
  components: {
    StockChart,
  },
  data() {
    return {
      datacollection: {}
    }
  },
  props: {
    stock: {
      type: Object,
      required: true,
    }
  },
  computed: {
    ...mapGetters([
      'getStockHighest',
      'getStockLowest',
      'getStockTotalVolume',
    ])
  },
  methods: {
    highest(stock) {
      return this.getStockHighest(stock.ticker);
    },
    lowest(stock) {
      return this.getStockLowest(stock.ticker);
    },
    last(stock) {
      const length = stock.values.length
      if (length >= 1) {
        return stock.values[length - 1].value;
      }
    },
    variation(stock) {
      const length = stock.values.length
      if (length >= 2) {
        const { value: previous} = stock.values[length - 2]
        const { value: last} = stock.values[length - 1]
        return (last - previous) * 100 / previous;
      }
    },
    transactionVolume(stock) {
      return this.getStockTotalVolume(stock.ticker);
    }
  },
  watch: {
    stock(newStock) {
      this.datacollection = {
          labels: newStock.values.map((value) => moment(value.time).format('HH:mm:ss DD/MM/YYYY')),
          datasets: [
            {
              label: `${this.stock.ticker}`,
              borderColor: '#f87979',
              showLine: true,
              fill: false,
              data: newStock.values.map((value) => ({ x: moment(value.time), y: value.value }))
            }
          ]
      }
    }
  },
}
</script>