<template>
  <div>
    <page-title />
    <slot />
  </div>
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
