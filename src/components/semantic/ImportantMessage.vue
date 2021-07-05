<template>
  <div>
    <p class="font-semibold">Vvks commentaar</p>
    <div class="px-5">
      <div class="bg-lightRed border border-red text-red px-4 py-3 rounded relative" role="alert">
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
