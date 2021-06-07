<template>
  <form @submit="onSubmit">
    <div>
      <custom-headline-2 text="Bestemming" />
      <div class="px-5 w-96">
        <multi-select
          rules="required"
          insuranceTypeId="2"
          id="country"
          track-by="name"
          value-prop="data"
          :repository="CountryRepository"
          :options="[]"
          :searchable="true"
          label="Land"
          placeholder="Zoek op naam"
        />
      </div>
    </div>

    <div class="mt-3">
      <custom-headline-2 text="Deelnemers" />
      <div class="px-5">
        <select-members id="members" rules="required" />
      </div>
    </div>

    <div class="mt-3">
      <custom-headline-2 text="Voertuig" />
      <div class="px-5">
        <select-vehicle id="vehicle" />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { TravelAssistanceInsurance } from '@/serializer/insurances/TravelAssistanceInsurance'
import SelectMembers from '@/components/insurances/travelAssistance/selectMembers.vue'
import SelectVehicle from '@/components/insurances/travelAssistance/selectVehicle.vue'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import { CountryRepository } from '@/repositories/countriesRepository'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import { computed, defineComponent, ref } from 'vue'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'TravelAssistance',
  components: {
    'custom-headline-2': CustomHeadline2,
    'select-members': SelectMembers,
    'select-vehicle': SelectVehicle,

    'multi-select': MultiSelect,
  },
  setup() {
    const store = useStore()
    const { handleSubmit } = useForm()
    const selected = ref<string>('option-2')

    const generalInsuranceState = computed(() => {
      return store.state.insurance.generalInsuranceState
    })

    const onSubmit = handleSubmit(async (values: any) => {
      const nonMember = ref<TravelAssistanceInsurance>({
        ...generalInsuranceState.value,
        ...{
          nature: values.nature,
          postCodeCity: values.postCodeCity ? values.postCodeCity : undefined,
          country: values.country ? values.country : undefined,
          participants: values.Members ? values.Members : [],
        },
      })

      store.dispatch('setNonMemberState', nonMember)
      store.dispatch('setHolderState', HolderStates.DETAIL)
    })

    return {
      CountryRepository,
      InputTypes,
      selected,
      onSubmit,
    }
  },
})
</script>
