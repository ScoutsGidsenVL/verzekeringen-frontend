<template>
  <button class="bg-black text-white h-10 px-16 font-extrabold">{{ text }}</button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomButton',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
})
</script>
