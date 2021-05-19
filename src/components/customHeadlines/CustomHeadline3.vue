<template>
  <h3 class="text-lg font-extrabold leading-5 py-5">{{ text }}</h3>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomHeadline3',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
})
</script>
