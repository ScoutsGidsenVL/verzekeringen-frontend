<template>
  <vee-form @submit="setHolderState()">
    <custom-headline-2 text="Activiteit" />
    <div class="px-5">
      <div class="flex gap-4">
        <custom-input :type="InputTypes.DATE" rules="required" name="start" label="Start datum" />
        <custom-input :type="InputTypes.DATE" rules="required" name="end" label="Eind datum" />
      </div>
      <div>
        <multi-select id="location" track-by="name" :options="fetchLocations" label="Location" rules="required" placeholder="Zoek op naam/postcode" />
        <!-- <multi-select id="extra" track-by="range" :options="fetchAditionalPersonsToBeInsured()" label="Aantal extra te verzekeren personen" rules="required" placeholder="Aantal" /> -->
      </div>
    </div>
    <div class="px-5 mt-5">
      <custom-button text="Volgende" />
    </div>
  </vee-form>
</template>

<script lang="ts">
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import CustomButton from '@/components/CustomButton.vue'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { defineComponent, ref } from 'vue'
import { Form } from 'vee-validate'
import { useStore } from 'vuex'
export interface location {
  value: string
  name: string
}
export default defineComponent({
  name: 'RequestInsuranceType',
  components: {
    'custom-headline-2': CustomHeadline2,
    'custom-button': CustomButton,
    'custom-input': CustomInput,
    'multi-select': MultiSelect,
    'vee-form': Form,
  },
  setup() {
    const store = useStore()
    const setHolderState = () => {
      store.dispatch('setHolderState', HolderStates.DETAIL)
    }
    const fetchLocations = ref<location[]>([
      { value: 'Antwerpen 2000', name: 'Antwerpen 2000' },
      { value: 'Brussel 2100', name: 'Brussel 2100' },
    ])

    const fetchAditionalPersonsToBeInsured = () => {
      return [{ range: '1-50' }, { range: '51 - 100' }, { range: '101 - 150' }, { range: '151 - 200' }, { range: '201 - 250' }]
    }
    return {
      fetchAditionalPersonsToBeInsured,
      fetchLocations,
      setHolderState,
      InputTypes,
    }
  },
})
</script>
