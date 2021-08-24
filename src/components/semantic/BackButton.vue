<template>
  <a class="link-inline cursor-pointer mr-3" @click="back()">Vorige</a>
</template>

<script lang="ts">
import { HolderStates } from '@/enums/holderStates'
import { defineComponent, PropType } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'BackButton',
  props: {
    stateName: {
      type: String,
      required: true,
    },
    backToState: {
      type: Object as PropType<HolderStates>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore()

    const back = () => {
      store.dispatch(props.stateName, props.backToState)
    }
    return {
      back,
    }
  },
})
</script>
