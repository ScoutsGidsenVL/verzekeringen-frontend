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
      <div class="mt-2 w-96">
        <multi-select
          id="location"
          track-by="label"
          value-prop="value"
          :options="groupSizes"
          :searchable="false"
          label="Aantal extra te verzekeren personen"
          rules="required"
          placeholder="Aantal"
          @onChange="groupSizeChanged($event)"
        />
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
import RepositoryFactory from '@/repositories/repositoryFactory'
import { InsuranceGroupSizesRepository } from '@/repositories/insuranceGroupSizes'

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
    const groupSize = ref<number>()
    const location = ref<Location>()
    const store = useStore()
    const groupSizes = ref<any[]>([])

    const generalInsuranceState = computed(() => {
      return store.state.insurance.generalInsuranceState
    })

    const fetchGroupSizes = () => {
      RepositoryFactory.get(InsuranceGroupSizesRepository)
        .getArray()
        .then((result: any) => {
          groupSizes.value = result
        })
    }

    fetchGroupSizes()

    const setHolderState = () => {
      const oneTimeActivity = ref<OneTimeActivity>({ ...generalInsuranceState.value, ...{ nature: nature.value, location: location.value, groupSize: groupSize.value } })
      store.dispatch('setOneTimeActivityState', oneTimeActivity)
      store.dispatch('setHolderState', HolderStates.DETAIL)
    }

    const natureChanged = (event: any) => {
      nature.value = event
    }

    const locationChanged = (event: any) => {
      location.value = event
    }

    const groupSizeChanged = (event: any) => {
      groupSize.value = event
    }

    return {
      groupSizes,
      BelgianCitySearchRepository,
      groupSizeChanged,
      locationChanged,
      setHolderState,
      natureChanged,
      groupSize,
      InputTypes,
      nature,
    }
  },
})
</script>

function InsuranceGroupSizesRepository(InsuranceGroupSizesRepository: any) { throw new Error('Function not implemented.') }
