<template>
  <div class="px-5">
    <form action="">
      <div v-for="(insuranceType, index) in insuranceTypes" :key="insuranceType.id" class="py-1">
        <input :id="index" v-model="selection" @change="setInsuranceTypeState(insuranceType.value)" type="radio" :name="index" :value="insuranceType.value" class="cursor-pointer" />
        <label :for="index" class="ml-2">{{ insuranceType.name }}</label>
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
  setup() {
    const store = useStore()
    const selection = ref<any>(0)
    const insuranceTypes = ref<Object[]>([
      { name: 'Eenmalige activiteit', value: InsuranceTypes.EENMALIGE_ACTIVITEIT },
      { name: 'Tijdelijke verzekering niet-leden', value: InsuranceTypes.TIJDELIJKE_VERZEKERING_NIET_LEDEN },
      { name: 'Reisbijstand', value: InsuranceTypes.REIS_BIJSTAND },
      { name: 'Tijdelijke autoverzekering', value: InsuranceTypes.TIJDELIJKE_AUTO_VERZEKERING },
      { name: 'Evenementen verzekering', value: InsuranceTypes.EVENEMENTEN_VERZEKERING },
      { name: 'Materiaal verzekering', value: InsuranceTypes.MATERIAAL_VERZEKERING },
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
