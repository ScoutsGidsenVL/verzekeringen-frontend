<template>
  <div class="ml-5">
    <form action="">
      <div v-for="(insuranceType, index) in insuranceTypes" :key="insuranceType.id" class="py-1">
        <input
          :disabled="disabled"
          :id="index"
          v-model="selection"
          class="cursor-pointer"
          type="radio"
          :name="index"
          :value="insuranceType.value"
          @change="setInsuranceTypeState(insuranceType.value)"
        />
        <label :for="index" class="ml-2 cursor-pointer">{{ insuranceType.name }}</label>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { InsuranceTypes } from '@/enums/insuranceTypes'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'InsuranceTypeMenu',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore()
    const selection = ref<string>(store.getters.insuranceTypeState)
    const insuranceTypes = ref<Object[]>([
      { name: 'Tijdelijke verzekering niet-leden', value: InsuranceTypes.TIJDELIJKE_VERZEKERING_NIET_LEDEN },
      { name: 'Tijdelijke autoverzekering', value: InsuranceTypes.TIJDELIJKE_AUTO_VERZEKERING },
      { name: 'Materiaal verzekering', value: InsuranceTypes.MATERIAAL_VERZEKERING },
      { name: 'Evenementen verzekering', value: InsuranceTypes.EVENEMENTEN_VERZEKERING },
      { name: 'Eenmalige activiteit', value: InsuranceTypes.EENMALIGE_ACTIVITEIT },
      { name: 'Reisbijstand', value: InsuranceTypes.REIS_BIJSTAND },
    ])
    const setInsuranceTypeState = (value: string) => {
      store.dispatch('setInsuranceTypeState', value)
    }

    return {
      setInsuranceTypeState,
      insuranceTypes,
      selection,
    }
  },
})
</script>
