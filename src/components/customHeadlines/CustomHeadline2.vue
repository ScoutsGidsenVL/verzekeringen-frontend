<template>
  <h2 class="font-semibold text-3xl leading-9 py-5">{{ text }}</h2>
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
