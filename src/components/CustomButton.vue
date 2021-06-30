<template>
  <button
    :disabled="disabled || loadingSubmit"
    class="btn-simple-dark"
    :type="type"
    :class="{
      ' animate-pulse2 loading': loadingSubmit,
    }"
  >
    <a class="btn-simple-dark mt-0 relative">
      <span :class="{ 'opacity-0': loadingSubmit }">{{ text }}</span>
      <div v-show="loadingSubmit" class="absolute flex justify-center items-center w-full left-0 top-0 h-full">
        <svg v-show="loadingSubmit" class="animate-spin h-5 w-5 inline-block" viewBox="0 0 24 24">
          <path class="opacity-20" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </a>
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
    type: {
      type: String,
      default: 'submit',
      required: false,
    },
    loadingSubmit: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
})
</script>
<style scoped>
.loading a {
  background-color: #7b8f1c;
}
</style>
