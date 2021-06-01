<template>
  <Form @submit="setHolderState()">
    <custom-headline-2 text="Activiteit" />
    <div class="px-5">
      <custom-input :value="nature" :type="InputTypes.TEXT_AREA" rules="required" name="nature" label="Aard van de activiteit" @onChange="natureChanged($event)" />
      <div class="w-96">
        <multi-select
          id="location"
          track-by="location"
          value-prop="value"
          :repository="BelgianCitySearchRepository"
          :options="[]"
          :searchable="true"
          label="Location"
          rules="required"
          placeholder="Zoek op naam/postcode"
          @onChange="locationChanged($event)"
        />
      </div>
      <div class="mt-5 w-96">
        <custom-input :value="groupAmount" :type="InputTypes.TEXT" rules="required" name="groupAmount" label="Aantal extra te verzekeren personen" @onChange="groupAmountChanged($event)" />
      </div>
    </div>
    <div class="px-5 mt-5">
      <custom-button text="Volgende" />
    </div>
  </Form>
</template>
<script lang="ts">
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import { OneTimeActivity } from '@/serializer/insurances/OneTimeActivity'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import CustomButton from '@/components/CustomButton.vue'
import { computed, defineComponent, ref } from 'vue'
import { HolderStates } from '@/enums/holderStates'
import { Location } from '@/serializer/Location'
import { InputTypes } from '@/enums/inputTypes'
import { Form } from 'vee-validate'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'OneTimeActivity',
  components: {
    'custom-headline-2': CustomHeadline2,
    'custom-button': CustomButton,
    'multi-select': MultiSelect,
    'custom-input': CustomInput,
    Form,
  },
  setup() {
    const nature = ref<string>('')
    const groupAmount = ref<number>()
    const location = ref<Location>()
    const store = useStore()

    const generalInsuranceState = computed(() => {
      return store.state.insurance.generalInsuranceState
    })

    const fetchAditionalPersonsToBeInsured = ref<any[]>([{ value: '1-50' }, { value: '51 - 100' }])

    const setHolderState = () => {
      const oneTimeActivity = ref<OneTimeActivity>({ ...generalInsuranceState.value, ...{ nature: nature.value, location: location.value, groupAmount: groupAmount.value } })
      store.dispatch('setOneTimeActivityState', oneTimeActivity)
      store.dispatch('setHolderState', HolderStates.DETAIL)
    }

    const natureChanged = (event: any) => {
      nature.value = event
    }

    const locationChanged = (event: any) => {
      location.value = event
    }

    const groupAmountChanged = (event: any) => {
      groupAmount.value = event
    }

    return {
      fetchAditionalPersonsToBeInsured,
      BelgianCitySearchRepository,
      groupAmountChanged,
      locationChanged,
      setHolderState,
      natureChanged,
      groupAmount,
      InputTypes,
      nature,
    }
  },
})
</script>
