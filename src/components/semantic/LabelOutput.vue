<template>
  <div>
    <strong>{{ label }}</strong>
    <div :class="textWidth">
      <p v-if="!bold" class="mb-0">{{ text }}</p>
      <strong v-if="bold">{{ text }}</strong>
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
    bold: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
})
</script>
