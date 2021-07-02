<template>
  <button
    :disabled="disabled || loadingSubmit || isSubmitting"
    class="btn-simple-dark"
    :type="type"
    :class="{
      ' animate-pulse2 loading': isSubmitting || loadingSubmit,
    }"
  >
    <a class="btn-simple-dark mt-0 relative">
      <span :class="{ 'opacity-0': loadingSubmit || isSubmitting }">{{ text }}</span>
      <div v-show="loadingSubmit || isSubmitting" class="absolute flex justify-center items-center w-full left-0 top-0 h-full">
        <loader :isLoading="loadingSubmit || isSubmitting" />
      </div>
    </a>
  </button>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import Loader from '@/components/semantic/Loader.vue'

export default defineComponent({
  name: 'CustomButton',
  components: {
    loader: Loader,
  },
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
  setup() {
    const store = useStore()

    const isSubmitting = computed((): boolean => {
      return store.state.insurance.isSubmittingState
    })

    return {
      isSubmitting,
    }
  },
})
</script>
<style scoped>
.loading a {
  background-color: #7b8f1c;
}
</style>
