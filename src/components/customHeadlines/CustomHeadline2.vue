<template>
  <h2 class="font-semibold text-xl leading-9 pt-3 pb-3">{{ text }}</h2>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomHeadline2',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
})
</script>
