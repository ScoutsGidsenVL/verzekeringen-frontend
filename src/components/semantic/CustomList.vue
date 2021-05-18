<template>
  <h2>{{ title }}</h2>
  <div>...</div>
  <p class="text-lightGreen cursor-pointer">bekijk alle</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomList',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
})
</script>
