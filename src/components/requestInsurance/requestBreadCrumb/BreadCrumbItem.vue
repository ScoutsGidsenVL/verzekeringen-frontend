<template>
  <div class="flex mr-20">
    <div :class="['h-10 w-10 text-center p-2 rounded-full border-2 border-lightGray', visibleOnState === holderState ? 'bg-lightGreen' : '']">{{ index }}</div>
    <div class="pt-2 pl-3">{{ text }}</div>
  </div>
</template>
<script lang="ts">
import { HolderStates } from '@/enums/holderStates'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'BreadCrumbItem',
  props: {
    index: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    visibleOnState: {
      type: String,
      required: true,
    },
  },
  setup() {
    const store = useStore()
    const holderState = computed((): HolderStates => {
      return store.state.insurance.holderState
    })
    return {
      holderState,
    }
  },
})
</script>
