<template>
  <div class="grid grid-cols-2 bg-white m-2 p-4 rounded shadow">
    <div>
      <div class="text-xl text-gray-900">{{this.stock.company_name}}</div>
      <div class="text-sm text-gray-600">{{this.stock.ticker}} - {{this.stock.country}}</div>
      <labeled-value
        class="pt-8"
        label="transaction volume"
        :value="this.transactionVolume(this.stock)"
      />
      <div class="grid grid-cols-2 pt-8">
        <labeled-value
          label="highest"
          :value="this.highest(this.stock)"
        />
        <labeled-value
          label="lowest"
          :value="this.lowest(this.stock)"
        />
        <labeled-value
          label="last"
          :value="this.last(this.stock)"
        />
        <labeled-value
          label="variation"
          :value="this.variation(this.stock) | formatVariation"
        />
      </div>
    </div>
    <stock-chart :chart-data="datacollection" />
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

import StockChart from './stock-chart';
import LabeledValue from './labeled-value';

export default {
  components: {
    StockChart,
    LabeledValue,
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
        return (last - previous) / previous;
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