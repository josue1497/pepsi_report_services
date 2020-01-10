<template>
  <v-progress-circular
    :color="color"
    :indeterminate="loading"
    :size="size"
    class="ma-0"
    height="4"
    :width="width"
    >
  </v-progress-circular>
</template>

<style>
</style>

<script>
export default {
  props: {
    loading: Boolean,
    color: String,
    size: {type: String, default: '30'},
    width: {type: String, default: '5px'}
  },
};
</script>