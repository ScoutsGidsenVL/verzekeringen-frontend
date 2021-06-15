<template>
  <div class="bg-lighterGreen p-3 inline-block">
    <div>
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InfoAlert',
  setup() {},
})
</script>
