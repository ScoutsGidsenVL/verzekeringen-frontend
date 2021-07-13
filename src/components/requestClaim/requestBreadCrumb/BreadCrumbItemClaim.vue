<template>
  <div class="flex" style="margin-right: 1em">
    <div
      v-if="isChangeStatePossible"
      :class="['h-10 w-10 text-center p-2 rounded-full border-2 border-lightGray cursor-pointer', visibleOnState === claimHolderState ? 'bg-lightGreen' : '']"
      @click="changeState()"
    >
      {{ index }}
    </div>
    <div v-else :class="['h-10 w-10 text-center p-2 rounded-full border-2 border-lightGray', visibleOnState === claimHolderState ? 'bg-lightGreen' : '']">
      {{ index }}
    </div>
    <div v-if="isChangeStatePossible" class="pt-2 pl-3 cursor-pointer" @click="changeState()">{{ text }}</div>
    <div v-else class="pt-2 pl-3">{{ text }}</div>
  </div>
</template>
<script lang="ts">
import { ClaimHolderStates } from '@/enums/ClaimholderStates'
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
    const claimHolderState = computed((): ClaimHolderStates => {
      return store.state.claim.claimHolderState
    })

    const changeState = () => {
      if (props.isChangeStatePossible) {
        store.dispatch('setClaimHolderState', props.visibleOnState)
      }
    }
    return {
      changeState,
      claimHolderState,
    }
  },
})
</script>
