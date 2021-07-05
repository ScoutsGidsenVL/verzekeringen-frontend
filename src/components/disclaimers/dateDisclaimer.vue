<template>
  <div>
    <p class="text-xs">
      <i>{{ disclaimerText }}</i>
    </p>
  </div>
</template>

<script lang="ts">
import { InsuranceTypeDateDisclaimer, InsuranceTypes } from '@/enums/insuranceTypes'
import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'DateDisclaimer',
  setup() {
    const store = useStore()

    const insuranceTypeState = computed((): InsuranceTypes => {
      return store.state.insurance.insuranceTypeState
    })

    const disclaimerText = ref<string>(InsuranceTypeDateDisclaimer[insuranceTypeState.value])

    watch(
      () => insuranceTypeState.value,
      () => {
        disclaimerText.value = InsuranceTypeDateDisclaimer[insuranceTypeState.value]
      }
    )

    return {
      insuranceTypeState,
      disclaimerText,
    }
  },
})
</script>
