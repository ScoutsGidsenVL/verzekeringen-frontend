<template>
  <form>
    <strong>
      <label>{{ label }}</label>
    </strong>
    <div class="px-5">
      <textarea class="bg-lightGray" id="custom-text-area" v-model="comment" name="custom-text-area" rows="4" cols="50" :disabled="disabled" />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CustomTextArea',
  props: {
    label: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const comment = ref<string>(props.text)
    return { comment }
  },
})
</script>
