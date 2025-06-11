<template>
  <div v-if="date">
    <p>{{ new Date(date).toLocaleDateString() }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DateLocale',
  props: {
    date: {
      type: String,
      default: '',
    },
  },
})
</script>
