<template>
  <div>
    <strong>{{ label }}</strong>
    <div class="w-96">
      <p class="mt-2 w-96">{{ text }}</p>
    </div>
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
      type: [String, Number],
      required: true,
    },
  },
})
</script>
