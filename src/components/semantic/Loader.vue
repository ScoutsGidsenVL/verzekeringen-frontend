<template>
  <svg v-show="isLoading" class="animate-spin h-5 w-5 inline-block" viewBox="0 0 24 24">
    <path class="opacity-20" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BackButton',
  props: {
    isLoading: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
})
</script>
