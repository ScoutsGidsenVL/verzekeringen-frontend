<template>
  <div class="flex pt-5">
    <bread-crumb-item :visibleOnState="HolderStates.GENERAL" :index="'1'" :text="'Algemeen'" />
    <bread-crumb-item :visibleOnState="HolderStates.TYPE" :index="'2'" :text="displayCorrectTypeLabel(insuranceTypeState)" />
    <bread-crumb-item :visibleOnState="HolderStates.DETAIL" :index="'3'" :text="'Overzicht'" />
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
  props: {
    insuranceType: {
      type: String,
      required: true,
    },
  },
  setup() {
    const store = useStore()

    const insuranceTypeState = computed((): InsuranceTypes => {
      return store.state.insurance.insuranceTypeState
    })
    return {
      displayCorrectTypeLabel,
      insuranceTypeState,
      HolderStates,
    }
  },
})
</script>
