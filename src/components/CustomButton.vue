<template>
  <a class="btn-simple-dark">{{ text }}</a>
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
