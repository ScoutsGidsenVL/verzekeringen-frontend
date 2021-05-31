<template>
  <div>
    <div v-if="true">
      <one-time-activity-detail />
    </div>
  </div>
</template>

<script lang="ts">
import OneTimeActivityDetail from '@/components/insurances/oneTimeActivity/oneTimeActivityDetail.vue'
import { HolderStates } from '@/enums/holderStates'
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'RequestInsuranceDetail',
  components: {
    'one-time-activity-detail': OneTimeActivityDetail,
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
