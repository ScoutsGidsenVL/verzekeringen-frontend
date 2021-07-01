<template>
  <a class="link-inline cursor-pointer text-lg mr-3" @click="back()">Vorige</a>
</template>

<script lang="ts">
import { HolderStates } from '@/enums/holderStates'
import { defineComponent, PropType } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'BackButton',
  props: {
    backToState: {
      type: Object as PropType<HolderStates>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore()

    const back = () => {
      store.dispatch('setHolderState', props.backToState)
    }
    return {
      back,
    }
  },
})
</script>
