<template>
  <div class="flex smo:flex-col py-3">
    <div>
      <strong class="text-sm"><i>Feedback</i></strong>
      <div class="bg-lightRed border-lightRed border-2 text-black px-2 py-1 rounded relative" role="alert">
        <span class="block sm:inline">{{ message }}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3"> </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ImportantMessage',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
})
</script>
