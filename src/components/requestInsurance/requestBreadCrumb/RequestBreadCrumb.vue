<template>
  <div class="flex pt-5 pb-4">
    <bread-crumb-item :is-change-state-possible="holderState === HolderStates.TYPE || holderState === HolderStates.DETAIL" :visible-on-state="HolderStates.GENERAL" :index="'1'" :text="'Algemeen'" />
    <bread-crumb-item :is-change-state-possible="holderState === HolderStates.DETAIL" :visible-on-state="HolderStates.TYPE" :index="'2'" :text="displayCorrectTypeLabel(insuranceTypeState)" />
    <bread-crumb-item :is-change-state-possible="false" :visible-on-state="HolderStates.DETAIL" :index="'3'" :text="'Overzicht'" />
    <bread-crumb-item :is-change-state-possible="false" :visible-on-state="HolderStates.COMPLETED" :index="'4'" :text="'Voltooid'" />
  </div>
</template>

<script lang="ts">
import { InsuranceTypes } from '@/enums/insuranceTypes'
import { HolderStates } from '@/enums/holderStates'
import BreadCrumbItem from './BreadCrumbItem.vue'
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { displayCorrectTypeLabel } from '@/helpers/insuranceTypeHelper'
export default defineComponent({
  name: 'RequestBreadCrumb',
  components: {
    'bread-crumb-item': BreadCrumbItem,
  },
  setup() {
    const store = useStore()

    const insuranceTypeState = computed((): InsuranceTypes => {
      return store.state.insurance.insuranceTypeState
    })

    const holderState = computed((): HolderStates => {
      return store.state.insurance.holderState
    })
    return {
      displayCorrectTypeLabel,
      insuranceTypeState,
      HolderStates,
      holderState,
    }
  },
})
</script>
