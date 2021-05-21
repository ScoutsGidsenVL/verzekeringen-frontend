<template>
  <div>TYPE SCREEN</div>
  <custom-button text="Volgende" @click="setHolderState()" />
</template>

<script lang="ts">
import CustomButton from '@/components/CustomButton.vue'
import { HolderStates } from '@/enums/holderStates'
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'RequestInsuranceType',
  components: {
    'custom-button': CustomButton,
  },
  setup() {
    const store = useStore()
    const setHolderState = () => {
      store.dispatch('setHolderState', HolderStates.DETAIL)
    }
    return {
      setHolderState,
    }
  },
})
</script>
