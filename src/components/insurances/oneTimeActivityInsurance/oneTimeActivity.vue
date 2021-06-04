<template>
  <form @submit="onSubmit">
    <custom-headline-2 text="Activiteit" />
    <div class="px-5">
      <custom-input :type="InputTypes.TEXT_AREA" rules="required" name="nature" label="Aard van de activiteit" />
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
        />
      </div>
      <div class="mt-2 w-96">
        <multi-select id="groupSize" track-by="label" value-prop="data" :options="groupSizes" :searchable="false" label="Aantal extra te verzekeren personen" rules="required" placeholder="Aantal" />
      </div>
    </div>
    <div class="px-5 mt-5">
      <custom-button text="Volgende" />
    </div>
  </form>
</template>

<script lang="ts">
import { BelgianCitySearchRepository } from '@/repositories/belgianCitySearchRepository'
import { InsuranceGroupSizesRepository } from '@/repositories/insuranceGroupSizes'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import { OneTimeActivity } from '@/serializer/insurances/OneTimeActivity'
import RepositoryFactory from '@/repositories/repositoryFactory'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import CustomInput from '@/components/inputs/CustomInput.vue'
import CustomButton from '@/components/CustomButton.vue'
import { computed, defineComponent, ref } from 'vue'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useStore } from 'vuex'

type oneTimeActivityFormType = {
  nature: string
  location: Location
  groupSize: number
}

export default defineComponent({
  name: 'OneTimeActivity',
  components: {
    'custom-headline-2': CustomHeadline2,
    'custom-button': CustomButton,
    'multi-select': MultiSelect,
    'custom-input': CustomInput,
  },
  setup() {
    const store = useStore()
    const { handleSubmit } = useForm<oneTimeActivityFormType>()
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

    const onSubmit = handleSubmit(async (values: oneTimeActivityFormType) => {
      const oneTimeActivity = ref<OneTimeActivity>({
        ...generalInsuranceState.value,
        ...{
          nature: values.nature,
          location: values.location,
          groupSize: values.groupSize,
        },
      })
      store.dispatch('setOneTimeActivityState', oneTimeActivity)
      store.dispatch('setHolderState', HolderStates.DETAIL)
    })

    return {
      groupSizes,
      BelgianCitySearchRepository,
      InputTypes,
      onSubmit,
    }
  },
})
</script>
