<template>
  <custom-headline-2 text="Activiteit" />
  <div class="px-5">
    <custom-input :value="nature" :type="InputTypes.TEXT_AREA" rules="required" name="nature" label="Aard van de activiteit" @onChange="natureChanged($event)" />
    <div>
      <multi-select id="location" track-by="value" :repository="BelgianCitySearchRepository" :options="[]" :searchable="true" label="Location" rules="required" placeholder="Zoek op naam/postcode" />
      <multi-select id="extra" track-by="value" :options="fetchAditionalPersonsToBeInsured" label="Aantal extra te verzekeren personen" rules="required" placeholder="Aantal" />
    </div>
    {{ oneTimeActivityState }}
  </div>
</template>
<script lang="ts">
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import { computed, defineComponent, ref } from 'vue'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'OneTimeActivity',
  components: {
    'custom-headline-2': CustomHeadline2,
    'multi-select': MultiSelect,
    'custom-input': CustomInput,
  },
  setup() {
    const nature = ref<string>('')
    const store = useStore()

    const fetchAditionalPersonsToBeInsured = ref<any[]>([{ value: '1-50' }, { value: '51 - 100' }])

    const setHolderState = () => {
      store.dispatch('setHolderState', HolderStates.DETAIL)
    }

    const oneTimeActivityState = computed((): HolderStates => {
      return store.state.insurance.oneTimeActivityState
    })

    const natureChanged = (event: any) => {
      nature.value = event
    }

    return {
      fetchAditionalPersonsToBeInsured,
      BelgianCitySearchRepository,
      setHolderState,
      InputTypes,
      oneTimeActivityState,
      natureChanged,
      nature,
    }
  },
})
</script>
