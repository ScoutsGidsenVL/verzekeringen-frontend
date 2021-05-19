<template>
  <div class="flex mr-20">
    <div class="h-10 w-10 text-center p-2 rounded-full border-2 border-lightGray">{{ index }}</div>
    <div class="pt-2 pl-3">{{ text }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BreadCrumbItem',
  props: {
    index: {
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
