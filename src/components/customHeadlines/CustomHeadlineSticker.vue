<template>
  <h1 v-if="text" class="group-search__title my-5 inline-block relative text-xl" style="font-size: 2rem; position: initial; transition: none !important">
    <span class="animate-none">{{ text }}</span>
  </h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomHeadlineSticker',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.group-search__title:before {
  animation: backgroundReveal 0s 0s both !important;
}

.group-search__title:after {
  animation: backgroundReveal 0s 0s both !important;
}

.group-search__title span {
  animation: fadeIn 0s 0s both !important;
}
</style>
