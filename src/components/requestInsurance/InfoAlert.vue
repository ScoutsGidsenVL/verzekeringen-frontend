<template>
  <div class="bg-lighterGreen p-3 inline-block">
    <div>
      <slot />
    </div>
    <div v-if="isMoreInfo" class="mt-3">
      <strong> Meer info</strong>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { boolean } from 'yup'

export default defineComponent({
  name: 'InfoAlert',
  props: {
    isMoreInfo: boolean,
  },
  setup() {},
})
</script>
