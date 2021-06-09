<template>
  <form @submit="onSubmit">
    <div v-if="values">
      <div class="mt-3">
        <custom-headline-2 text="Bestuurders" />
        <div class="px-5">
          <select-drivers id="drivers" rules="required" />
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
import SelectDrivers from '@/components/insurances/tempCarInsurance/selectDrivers.vue'
import SelectVehicle from '@/components/insurances/travelAssistance/selectVehicle.vue'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import { CountryRepository } from '@/repositories/countriesRepository'
import CustomButton from '@/components/CustomButton.vue'
import { computed, defineComponent, ref } from 'vue'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { useForm } from 'vee-validate'
import { useStore } from 'vuex'
import { BaseInsurance } from '@/serializer/insurances/BaseInsurance'
import { TemporaryVehicleInsurance } from '@/serializer/insurances/TemporaryVehicleInsurance'

export default defineComponent({
  name: 'TemporaryVehicle',
  components: {
    'custom-headline-2': CustomHeadline2,
    'select-drivers': SelectDrivers,
    'select-vehicle': SelectVehicle,
    'custom-button': CustomButton,
  },
  setup() {
    const store = useStore()

    const data: TemporaryVehicleInsurance = store.getters.getCurrentInsuranceState
    const { handleSubmit, values } = useForm<TemporaryVehicleInsurance>({
      initialValues: {
        drivers: data.drivers ? data.drivers : undefined,
        vehicle: data.vehicle ? data.vehicle : undefined,
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
