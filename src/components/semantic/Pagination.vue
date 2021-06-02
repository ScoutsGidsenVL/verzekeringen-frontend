<template>
  <div class="inline-block">
    <div class="flex gap-5">
      <div class="cursor-pointer hover:text-lightGreen" @click="previousPage()"><p>Previous</p></div>
      <div class="cursor-pointer hover:text-lightGreen" @click="nextPage()"><p>Next</p></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Pagination',
  props: {},
  setup() {
    return {}
  },
})
</script>
