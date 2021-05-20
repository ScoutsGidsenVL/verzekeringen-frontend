<template>
  <div class="py-5">
    <strong>{{ label }}</strong>
    <p class="mt-2">{{ text }}</p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LabelOutput',
  props: {
    label: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
})
</script>
