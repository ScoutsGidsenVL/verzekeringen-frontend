<template>
  <form @submit="onSubmit">
    <div v-if="values">
      <div>
        <custom-headline-2 text="Bestemming" />
        <div class="px-5 w-96">
          <multi-select
            rules="required"
            insuranceTypeId="3"
            id="country"
            :object="true"
            track-by="name"
            value-prop="name"
            :repository="CountryRepository"
            :resolve-on-load="true"
            :options="values.country ? [values.country] : []"
            :searchable="true"
            label="Land"
            placeholder="Zoek op naam"
          />
        </div>
      </div>

      <div class="mt-3">
        <custom-headline-2 text="Deelnemers" />
        <div class="px-5">
          <select-participants id="participants" rules="required" />
        </div>
      </div>

      <div class="mt-3">
        <custom-headline-2 text="Voertuig" />
        <div class="px-5">
          <select-vehicle id="vehicle" />
        </div>
      </div>

      <div class="px-5 mt-5">
        <custom-button text="Volgende" />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { TravelAssistanceInsurance } from '@/serializer/insurances/TravelAssistanceInsurance'
import SelectParticipants from '@/components/insurances/travelAssistance/selectParticipants.vue'
import SelectVehicle from '@/components/insurances/travelAssistance/selectVehicle.vue'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import { CountryRepository } from '@/repositories/countriesRepository'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import CustomButton from '@/components/CustomButton.vue'
import { computed, defineComponent, ref } from 'vue'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useStore } from 'vuex'
import { BaseInsurance } from '@/serializer/insurances/BaseInsurance'

export default defineComponent({
  name: 'TravelAssistance',
  components: {
    'custom-headline-2': CustomHeadline2,
    'select-participants': SelectParticipants,
    'select-vehicle': SelectVehicle,
    'custom-button': CustomButton,
    'multi-select': MultiSelect,
  },
  setup() {
    const store = useStore()

    const data: TravelAssistanceInsurance = store.getters.getCurrentInsuranceState
    const { handleSubmit, values } = useForm<TravelAssistanceInsurance>({
      initialValues: {
        country: data.country ? data.country : undefined,
        participants: data.participants ? data.participants : undefined,
      },
    })
    const selected = ref<string>('option-2')

    const generalInsuranceState = computed((): BaseInsurance => {
      return store.state.insurance.generalInsuranceState
    })

    const onSubmit = handleSubmit(async (values: any) => {
      const travelAssistance = ref<TravelAssistanceInsurance>({
        ...generalInsuranceState.value,
        ...{
          country: values.country ? values.country : undefined,
          participants: values.participants ? values.participants : [],
          vehicle: values.vehicle ? values.vehicle : undefined,
          responsiblePhoneNumber:
            generalInsuranceState.value.responsibleMember && generalInsuranceState.value.responsibleMember.phoneNumber ? generalInsuranceState.value.responsibleMember.phoneNumber : '/',
          comment: data.comment,
        },
      })

      store.dispatch('setTravelAssistanceState', travelAssistance)
      store.dispatch('setHolderState', HolderStates.DETAIL)
    })

    return {
      CountryRepository,
      InputTypes,
      selected,
      onSubmit,
      values,
    }
  },
})
</script>
