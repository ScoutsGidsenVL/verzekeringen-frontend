<template>
  <form action="">
    <div v-for="(insuranceType, index) in insuranceTypes" :key="insuranceType.id" class="py-1">
      <input :id="index" v-model="selection" type="radio" :name="index" :value="index" class="cursor-pointer" />
      <label :for="index" class="ml-2">{{ insuranceType }}</label>
    </div>
  </form>
  selection: {{ selection }}
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'InsuranceTypeMenu',
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
