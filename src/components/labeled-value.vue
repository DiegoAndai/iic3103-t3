<template>
  <div class="flex flex-col pt-2">
    <div class="text-sm text-gray-600">{{this.label}}</div>
    <div class="font-medium">
      {{this.value}}
      <span v-if="!!this.sufix" class="font-thin text-sm text-gray-600">{{this.sufix}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    sufix: {
      type: String,
      default: '',
    }
  },
}
</script>