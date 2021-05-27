<template>
  <custom-headline-2 text="Activiteit" />
  <div class="px-5">
    <div>
      <multi-select id="location" track-by="name" :options="fetchLocations" label="Location" rules="required" placeholder="Zoek op naam/postcode" />
      <multi-select id="extra" track-by="value" :options="fetchAditionalPersonsToBeInsured" label="Aantal extra te verzekeren personen" rules="required" placeholder="Aantal" />
    </div>
  </div>
</template>
<script lang="ts">
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'OneTimeActivity',
  components: {
    'custom-headline-2': CustomHeadline2,
    'multi-select': MultiSelect,
  },
  setup() {
    const store = useStore()
    const setHolderState = () => {
      store.dispatch('setHolderState', HolderStates.DETAIL)
    }
    const fetchLocations = ref<any[]>([
      { value: 'Antwerpen 2000', name: 'Antwerpen 2000' },
      { value: 'Brussel 2100', name: 'Brussel 2100' },
    ])

    const fetchAditionalPersonsToBeInsured = ref<any[]>([{ value: '1-50' }, { value: '51 - 100' }])

    return {
      fetchAditionalPersonsToBeInsured,
      fetchLocations,
      setHolderState,
      InputTypes,
    }
  },
})
</script>
