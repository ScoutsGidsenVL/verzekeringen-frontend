<template>
  <div>DETAIL SCREEN</div>
  <router-link to="/home">
    <custom-button text="Bevestig" @click="setHolderState()" />
  </router-link>
</template>

<script lang="ts">
import CustomButton from '@/components/CustomButton.vue'
import { HolderStates } from '@/enums/holderStates'
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'RequestInsuranceDetail',
  components: {
    'custom-button': CustomButton,
  },
  setup() {
    const store = useStore()
    const setHolderState = () => {
      store.dispatch('setHolderState', HolderStates.GENERAL)
    }
    return {
      setHolderState,
    }
  },
})
</script>
