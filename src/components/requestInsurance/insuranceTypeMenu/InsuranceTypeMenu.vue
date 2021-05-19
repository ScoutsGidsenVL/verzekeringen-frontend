<template>
  <form action="">
    <div v-for="(insuranceType, index) in insuranceTypes" :key="insuranceType.id" class="py-1">
      <input v-model="selection" type="radio" :id="index" :name="index" :value="index" class="cursor-pointer" />
      <label :for="index" class="ml-2">{{ insuranceType }}</label>
    </div>
  </form>
  selection: {{ selection }}
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import InsuranceTypeMenuItem from './InsuranceTypeMenuItem.vue'

export default defineComponent({
  name: 'InsuranceTypeMenu',
  components: {
    'insurance-type-menu-item': InsuranceTypeMenuItem,
  },
  setup() {
    const selection = ref<string>()
    const insuranceTypes = ref<string[]>(['Eenmalige activiteit', 'Tijdelijk verzekering niet-leden', 'Reisbijstand', 'Tijdelijke autoverzekering', 'Evenementen verzekering', 'Materiaal verzekering'])
    return {
      selection,
      insuranceTypes,
    }
  },
})
</script>
