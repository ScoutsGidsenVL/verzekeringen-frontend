<template>
  <div class="container mt-8 mb-4 pt-2">
    <page-title />
  </div>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageTitle from '../PageTitle.vue'

export default defineComponent({
  name: 'BasePage',
  components: {
    'page-title': pageTitle,
  },
})
</script>

<style lang="scss">
html {
  scroll-behavior: auto !important;
}

@media (min-width: 0px) and (max-width: 640px) {
  .container {
    max-width: 100% !important;
  }
}
</style>
