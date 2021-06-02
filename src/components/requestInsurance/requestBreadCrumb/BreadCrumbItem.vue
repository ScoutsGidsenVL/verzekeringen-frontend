<template>
  <div class="flex" style="margin-right: 2em">
    <div :class="['h-10 w-10 text-center p-2 rounded-full border-2 border-lightGray', visibleOnState === holderState ? 'bg-lightGreen' : '']">{{ index }}</div>
    <div v-if="isChangeStatePossible" class="pt-2 pl-3 cursor-pointer" @click="changeState()">{{ text }}</div>
    <div v-else class="pt-2 pl-3">{{ text }}</div>
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
    isChangeStatePossible: {
      type: Boolean,
      Required: true,
    },
  },
  setup(props) {
    const store = useStore()
    const holderState = computed((): HolderStates => {
      return store.state.insurance.holderState
    })
    const changeState = () => {
      store.dispatch('setHolderState', props.visibleOnState)
    }
    return {
      changeState,
      holderState,
    }
  },
})
</script>
