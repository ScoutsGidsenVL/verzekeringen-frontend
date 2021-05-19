<template>
  <form>
    <label for="favcolor">{{ text }}</label>
    <input :type="type" id="favcolor" name="favcolor" />
  </form>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { InputTypes } from '@/enums/inputTypes'
export default defineComponent({
  name: 'CustomInput',
  props: {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: Object as PropType<InputTypes>,
      required: true,
    },
  },
})
</script>
