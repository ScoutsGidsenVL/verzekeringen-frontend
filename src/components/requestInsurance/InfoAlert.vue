<template>
  <div class="bg-lighterGreen p-3 inline-block">
    <div>
      <slot />
    </div>
    <div class="mt-3">
      <strong> Meer info</strong>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InfoAlert',
  props: {},
  setup() {},
})
</script>
