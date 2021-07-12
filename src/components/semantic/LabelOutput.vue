<template>
  <div>
    <strong>{{ label }}</strong>
    <div :class="textWidth">
      <p class="mt-2">{{ text }}</p>
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
    textWidth: {
      type: String,
      default: 'w-96',
      required: false,
    },
  },
})
</script>
