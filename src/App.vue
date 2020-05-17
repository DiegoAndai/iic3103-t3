<template>
  <div id="app" class="flex flex-col min-h-screen items-center font-thin bg-gray-100 text-gray-900">
    <img src="./assets/stonks.jpg" class="mt-2 rounded w-2/5 cursor-pointer"/>
    stonks
    <router-view/>
  </div>
</template>

<script>
export default {
  created: function() {
    this.$store.dispatch('triggerStocks');
  }
}
</script>