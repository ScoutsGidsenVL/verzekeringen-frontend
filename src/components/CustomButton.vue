<template>
  <button :disabled="disabled" class="btn-simple-dark" type="submit">
    <a class="btn-simple-dark mt-0">{{ text }}</a>
  </button>
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
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
})
</script>
